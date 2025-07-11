import { z } from 'zod';
export enum UserRole {
  Customer = 0,
  Admin = 1,
  Dev = 2,
}
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'form:validation.required')
    .email('form:validation.email'),
  password: z.string().min(1, 'form:validation.required'),
  rememberMe: z.boolean().optional().default(false),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'form:validation.required')
    .email('form:validation.email'),
  username: z
    .string()
    .min(3, 'form:validation.minLength')
    .max(50, 'form:validation.maxLength')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
  password: z
    .string()
    .min(8, 'form:validation.minLength')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'form:validation.invalidPassword'
    ),
  firstName: z
    .string()
    .min(1, 'form:validation.required')
    .max(100, 'form:validation.maxLength'),
  lastName: z
    .string()
    .min(1, 'form:validation.required')
    .max(100, 'form:validation.maxLength'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'form:validation.required')
    .email('form:validation.email'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'form:validation.required'),
  newPassword: z
    .string()
    .min(8, 'form:validation.minLength')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'form:validation.invalidPassword'
    ),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'form:validation.required'),
    newPassword: z
      .string()
      .min(8, 'form:validation.minLength')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'form:validation.invalidPassword'
      ),
    confirmPassword: z.string().min(1, 'form:validation.required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'form:validation.passwordMismatch',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
