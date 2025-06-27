import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { UserDto, UserRole } from '../types/user';
import { apiClient } from '../api/client';
import { ENDPOINTS } from '../config/api';

interface AuthContextType {
  user: UserDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  canAccessDesigner: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!apiClient.getAccessToken();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      if (apiClient.getAccessToken()) {
        await refreshUser();
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      apiClient.clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post(ENDPOINTS.auth.login, {
        email,
        password,
        rememberMe,
      });

      const { accessToken, refreshToken, user: userData } = response;

      apiClient.setTokens(accessToken, refreshToken);
      setUser(userData);
    } catch (error) {
      apiClient.clearTokens();
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await apiClient.post(ENDPOINTS.auth.logout, { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiClient.clearTokens();
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await apiClient.get<UserDto>(ENDPOINTS.auth.me);
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      apiClient.clearTokens();
      setUser(null);
      throw error;
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return !!user && roles.includes(user.role);
  };

  const canAccessDesigner = (): boolean => {
    return hasAnyRole([UserRole.Admin, UserRole.Developer]);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
    hasRole,
    hasAnyRole,
    canAccessDesigner,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Custom hooks for specific auth checks
export const useRequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
};

export const useRequireRole = (requiredRoles: UserRole[]) => {
  const { hasAnyRole, isLoading, user } = useAuth();
  const hasAccess = hasAnyRole(requiredRoles);

  useEffect(() => {
    if (!isLoading && user && !hasAccess) {
      throw new Error('Insufficient permissions');
    }
  }, [hasAccess, isLoading, user]);

  return { hasAccess, isLoading };
};

export const useDesignerAccess = () => {
  const { canAccessDesigner, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && user && !canAccessDesigner()) {
      throw new Error('Designer access requires Admin or Developer role');
    }
  }, [canAccessDesigner, isLoading, user]);

  return { hasAccess: canAccessDesigner(), isLoading };
};
