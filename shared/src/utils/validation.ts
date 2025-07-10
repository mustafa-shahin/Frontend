/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * Requirements: 8+ chars, 1 lowercase, 1 uppercase, 1 number
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates username format
 * Requirements: 3-50 chars, alphanumeric and underscores only
 */
export function validateUsername(username: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (username.length > 50) {
    errors.push('Username must be less than 50 characters');
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates required field
 */
export function validateRequired(
  value: string,
  fieldName: string
): string | null {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
}

/**
 * Validates name fields (first name, last name)
 */
export function validateName(name: string, fieldName: string): string | null {
  const requiredError = validateRequired(name, fieldName);
  if (requiredError) return requiredError;

  if (name.length > 100) {
    return `${fieldName} must be less than 100 characters`;
  }

  return null;
}
