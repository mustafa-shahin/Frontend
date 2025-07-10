import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconClick,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleRightIconClick = () => {
      if (isPassword) {
        togglePasswordVisibility();
      } else if (onRightIconClick) {
        onRightIconClick();
      }
    };

    // Default password toggle icon
    const passwordIcon = showPassword ? (
      <i className="fa fa-eye-slash" />
    ) : (
      <i className="fa fa-eye" />
    );

    const rightIconElement = isPassword ? passwordIcon : rightIcon;

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            type={actualType}
            id={inputId}
            ref={ref}
            className={cn(
              // Base styles
              'block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset',
              'placeholder:text-gray-400 focus:ring-2 focus:ring-inset',
              'transition-all duration-200',
              // Normal state
              'ring-gray-300 focus:ring-blue-600 dark:ring-gray-600 dark:focus:ring-blue-500',
              'bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-gray-100',
              // Error state
              error &&
                'ring-red-300 focus:ring-red-600 dark:ring-red-600 dark:focus:ring-red-500',
              // Disabled state
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
              'dark:disabled:bg-gray-900 dark:disabled:text-gray-600 dark:disabled:ring-gray-700',
              // Icon padding
              leftIcon && 'pl-10',
              (rightIconElement || isPassword) && 'pr-10',
              // Custom className
              className
            )}
            {...props}
          />

          {(rightIconElement || isPassword) && (
            <button
              type="button"
              onClick={handleRightIconClick}
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600',
                'transition-colors duration-200 focus:outline-none',
                (isPassword || onRightIconClick) && 'cursor-pointer',
                !isPassword &&
                  !onRightIconClick &&
                  'cursor-default pointer-events-none'
              )}
              tabIndex={isPassword || onRightIconClick ? 0 : -1}
              aria-label={
                isPassword
                  ? showPassword
                    ? 'Hide password'
                    : 'Show password'
                  : undefined
              }
            >
              {rightIconElement}
            </button>
          )}
        </div>

        {(error || helperText) && (
          <div className="text-xs">
            {error ? (
              <p className="text-red-600 dark:text-red-400 flex items-center">
                <i className="fa fa-exclamation-triangle mr-1" />
                {error}
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
