// shared/src/types/auth.ts
import { z } from 'zod';

// Enums
export enum UserRole {
  Customer = 0,
  Admin = 1,
  Dev = 2,
}

// Base schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name must be less than 100 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be less than 100 characters'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      ),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Type inference from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// DTOs (matching backend)
export interface LoginDto {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface AddressDto {
  id: number;
  street: string;
  houseNr?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  region?: string;
  district?: string;
  isDefault: boolean;
  addressType?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactDetailsDto {
  id: number;
  primaryPhone?: string;
  secondaryPhone?: string;
  mobile?: string;
  fax?: string;
  email?: string;
  secondaryEmail?: string;
  website?: string;
  linkedInProfile?: string;
  twitterProfile?: string;
  facebookProfile?: string;
  instagramProfile?: string;
  whatsAppNumber?: string;
  telegramHandle?: string;
  additionalContacts: Record<string, any>;
  isDefault: boolean;
  contactType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDto {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isLocked: boolean;
  lastLoginAt?: string;
  pictureFileId?: number;
  pictureUrl?: string;
  emailVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  roleName: string;
  addresses: AddressDto[];
  contactDetails: ContactDetailsDto[];
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDto;
}

// API Error Response
export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// Utility types
export interface AuthState {
  user: UserDto | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginDto) => Promise<void>;
  register: (userData: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordDto) => Promise<void>;
}

// Route protection types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallback?: React.ComponentType;
}

// Form component props
export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  footer?: React.ReactNode;
}

export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
}
