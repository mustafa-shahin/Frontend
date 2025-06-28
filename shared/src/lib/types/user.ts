import { z } from 'zod';

// User Enums
export enum UserRole {
  Customer = 0,
  Admin = 1,
  Developer = 2,
}

// User DTOs
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
  role: UserRole;
  roleName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  pictureFileId?: number;
  role: UserRole;
}

export interface UpdateUserDto {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  pictureFileId?: number;
  role: UserRole;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginDto {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDto;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

// Type exports for forms
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// Utility types
export type User = UserDto;
