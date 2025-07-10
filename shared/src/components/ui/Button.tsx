import React from 'react';
import { cn } from '../../utils/cn';
import { LoadingSpinner } from './LoadingSpinner';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary:
    'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white shadow-sm',
  secondary:
    'bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
  danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white shadow-sm',
  outline:
    'border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 text-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-300',
  ghost:
    'hover:bg-gray-100 focus:ring-gray-500 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-md',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <LoadingSpinner size={size === 'sm' ? 'sm' : 'md'} className="mr-2" />
      )}
      {children}
    </button>
  );
}
