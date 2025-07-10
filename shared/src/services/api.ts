// shared/src/services/api.ts
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type {
  LoginDto,
  RegisterDto,
  LoginResponseDto,
  UserDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ApiErrorResponse,
} from '../types/auth';

interface OriginalRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://localhost:7206';
const API_VERSION = 'v1';

interface ErrorData {
  message?: string;
  Message?: string;
  errors?: Record<string, string[]>;
  Errors?: Record<string, string[]>;
}

class ApiService {
  private axiosInstance: AxiosInstance;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getStoredAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as OriginalRequest;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.handleTokenRefresh();
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  private async handleTokenRefresh(): Promise<string | null> {
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    const refreshToken = this.getStoredRefreshToken();
    if (!refreshToken) {
      return null;
    }

    this.refreshTokenPromise = this.refreshTokenInternal(refreshToken);

    try {
      const newToken = await this.refreshTokenPromise;
      return newToken;
    } finally {
      this.refreshTokenPromise = null;
    }
  }

  private async refreshTokenInternal(refreshToken: string): Promise<string> {
    const response = await axios.post(
      `${API_BASE_URL}/api/${API_VERSION}/auth/refresh`,
      { refreshToken },
      { timeout: 10000 }
    );

    const data: LoginResponseDto = response.data;
    this.storeTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  }

  private handleApiError(error: AxiosError): ApiErrorResponse {
    if (error.response?.data) {
      const errorData = error.response.data as ErrorData;
      return {
        message: errorData.message || errorData.Message || 'An error occurred',
        errors: errorData.errors || errorData.Errors,
        statusCode: error.response.status,
      };
    }

    if (error.code === 'ECONNABORTED') {
      return {
        message: 'Request timeout. Please check your connection and try again.',
        statusCode: 408,
      };
    }

    if (error.code === 'ERR_NETWORK') {
      return {
        message: 'Network error. Please check your connection and try again.',
        statusCode: 0,
      };
    }

    return {
      message: error.message || 'An unexpected error occurred',
      statusCode: 500,
    };
  }

  private getStoredAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getStoredRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  // Public API methods
  async login(credentials: LoginDto): Promise<LoginResponseDto> {
    const response: AxiosResponse<LoginResponseDto> =
      await this.axiosInstance.post('/auth/login', credentials);
    const data = response.data;

    // Store tokens and user data
    this.storeTokens(data.accessToken, data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  }

  async register(
    userData: RegisterDto
  ): Promise<{ success: boolean; message: string; userId: number }> {
    const response = await this.axiosInstance.post('/auth/register', userData);
    return response.data;
  }

  async logout(): Promise<void> {
    const refreshToken = this.getStoredRefreshToken();

    try {
      if (refreshToken) {
        await this.axiosInstance.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      // Continue with local logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearTokens();
    }
  }

  async refreshToken(): Promise<LoginResponseDto> {
    const refreshToken = this.getStoredRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response: AxiosResponse<LoginResponseDto> =
      await this.axiosInstance.post('/auth/refresh', {
        refreshToken,
      });

    const data = response.data;
    this.storeTokens(data.accessToken, data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  }

  async getCurrentUser(): Promise<UserDto> {
    const response: AxiosResponse<UserDto> = await this.axiosInstance.get(
      '/auth/me'
    );
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<{ message: string }> {
    const response = await this.axiosInstance.post(
      '/auth/forgot-password',
      data
    );
    return response.data;
  }

  async resetPassword(data: ResetPasswordDto): Promise<{ message: string }> {
    const response = await this.axiosInstance.post(
      '/auth/reset-password',
      data
    );
    return response.data;
  }

  async revokeAllSessions(): Promise<{ message: string }> {
    const response = await this.axiosInstance.post('/auth/revoke-all-sessions');
    return response.data;
  }

  // Utility methods
  isAuthenticated(): boolean {
    const token = this.getStoredAccessToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  getStoredUser(): UserDto | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  clearAuth(): void {
    this.clearTokens();
  }

  // Generic API method for other endpoints
  async get<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      endpoint,
      data
    );
    return response.data;
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      endpoint,
      data
    );
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      endpoint
    );
    return response.data;
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export class for testing
export { ApiService };
