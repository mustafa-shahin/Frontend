import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { apiService } from '../services/api';
import type {
  AuthState,
  AuthContextType,
  UserDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  UserRole,
} from '../types/auth';

// Auth reducer actions
type AuthAction =
  | { type: 'AUTH_START' }
  | {
      type: 'AUTH_SUCCESS';
      payload: { user: UserDto; accessToken: string; refreshToken: string };
    }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: UserDto };

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check existing auth
  error: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

// Auth provider component
export function AuthProvider({ children, requiredRoles }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user has required roles
  const hasRequiredRole = useCallback(
    (userRole: UserRole): boolean => {
      if (!requiredRoles || requiredRoles.length === 0) return true;
      return requiredRoles.includes(userRole);
    },
    [requiredRoles]
  );

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: 'AUTH_START' });

        // Check if user is already authenticated
        if (apiService.isAuthenticated()) {
          const user = apiService.getStoredUser();

          if (user) {
            // Verify the token is still valid by fetching current user
            try {
              const currentUser = await apiService.getCurrentUser();

              // Check if user has required roles for this app
              if (!hasRequiredRole(currentUser.role)) {
                // User doesn't have required role, logout
                await apiService.logout();
                dispatch({
                  type: 'AUTH_FAILURE',
                  payload: 'Access denied. Insufficient permissions.',
                });
                return;
              }

              dispatch({
                type: 'AUTH_SUCCESS',
                payload: {
                  user: currentUser,
                  accessToken: apiService.getStoredAccessToken() || '',
                  refreshToken: apiService.getStoredRefreshToken() || '',
                },
              });
            } catch (error) {
              // Token is invalid, clear auth
              apiService.clearAuth();
              dispatch({ type: 'AUTH_FAILURE', payload: 'Session expired' });
            }
          } else {
            dispatch({ type: 'AUTH_FAILURE', payload: 'No user found' });
          }
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: 'Not authenticated' });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({
          type: 'AUTH_FAILURE',
          payload: 'Authentication initialization failed',
        });
      }
    };

    initializeAuth();
  }, [hasRequiredRole]);

  // Login function
  const login = useCallback(
    async (credentials: LoginDto): Promise<void> => {
      try {
        dispatch({ type: 'AUTH_START' });

        const response = await apiService.login(credentials);

        // Check if user has required roles for this app
        if (!hasRequiredRole(response.user.role)) {
          // Logout immediately if user doesn't have required role
          await apiService.logout();
          throw new Error(
            'Access denied. You do not have permission to access this application.'
          );
        }

        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          },
        });
      } catch (error: any) {
        const errorMessage = error?.message || 'Login failed';
        dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
        throw error;
      }
    },
    [hasRequiredRole]
  );

  // Register function
  const register = useCallback(
    async (userData: RegisterDto): Promise<void> => {
      try {
        dispatch({ type: 'AUTH_START' });

        await apiService.register(userData);

        // After successful registration, automatically log in
        await login({
          email: userData.email,
          password: userData.password,
          rememberMe: false,
        });
      } catch (error: any) {
        const errorMessage = error?.message || 'Registration failed';
        dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
        throw error;
      }
    },
    [login]
  );

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  }, []);

  // Refresh auth function
  const refreshAuth = useCallback(async (): Promise<void> => {
    try {
      const response = await apiService.refreshToken();

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
      });
    } catch (error: any) {
      const errorMessage = error?.message || 'Session refresh failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  }, []);

  // Clear error function
  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Forgot password function
  const forgotPassword = useCallback(async (email: string): Promise<void> => {
    try {
      await apiService.forgotPassword({ email });
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to send reset email';
      throw new Error(errorMessage);
    }
  }, []);

  // Reset password function
  const resetPassword = useCallback(
    async (data: ResetPasswordDto): Promise<void> => {
      try {
        await apiService.resetPassword(data);
      } catch (error: any) {
        const errorMessage = error?.message || 'Password reset failed';
        throw new Error(errorMessage);
      }
    },
    []
  );

  // Context value
  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshAuth,
    clearError,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
