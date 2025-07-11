import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from './Icon';

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
      <Icon name="eye-slash" className="text-gray-400" />
    ) : (
      <Icon name="eye" className="text-gray-400" />
    );

    const rightIconElement = isPassword ? passwordIcon : rightIcon;

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
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
              'block w-full rounded-lg border-0 py-2.5 shadow-sm ring-1 ring-inset',
              'placeholder:text-gray-400 focus:ring-2 focus:ring-inset',
              'transition-all duration-200 font-medium',
              // Normal state
              'ring-gray-300 focus:ring-blue-600 bg-white text-gray-900',
              // Error state
              error && 'ring-red-300 focus:ring-red-600',
              // Disabled state
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
              // Icon padding
              leftIcon && 'pl-10',
              (rightIconElement || isPassword) && 'pr-10',
              !leftIcon && !rightIconElement && !isPassword && 'px-3',
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
                'transition-colors duration-200 focus:outline-none p-0.5 rounded',
                (isPassword || onRightIconClick) &&
                  'cursor-pointer hover:bg-gray-100',
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
          <div className="text-sm">
            {error ? (
              <p className="text-red-600 flex items-center">
                <Icon name="exclamation-triangle" className="mr-1.5 text-xs" />
                {error}
              </p>
            ) : (
              <p className="text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
