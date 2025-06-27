import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helper,
      leftIcon,
      rightIcon,
      fullWidth = false,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputStyles = [
      'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
      'ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-offset-gray-900',
      'dark:placeholder:text-gray-400 dark:focus:ring-blue-400',
      error &&
        'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400',
    ];

    const wrapperStyles = ['relative', fullWidth && 'w-full'];

    const iconStyles = 'absolute inset-y-0 flex items-center text-gray-400 ';

    return (
      <div className={cn(wrapperStyles, className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className={cn(iconStyles, 'left-3')}>{leftIcon}</div>
          )}

          <input
            ref={ref}
            type={type}
            id={inputId}
            className={cn(
              baseInputStyles,
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div className={cn(iconStyles, 'right-3')}>{rightIcon}</div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {helper && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
