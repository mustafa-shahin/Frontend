import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center justify-center rounded-md font-medium',
      'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      fullWidth && 'w-full',
    ];

    const variants = {
      primary: [
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        'dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400',
      ],
      secondary: [
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-400',
      ],
      danger: [
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        'dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400',
      ],
      outline: [
        'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-400',
      ],
      ghost: [
        'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        'dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-400',
      ],
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!loading && icon && iconPosition === 'left' && icon}

        {children}

        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
