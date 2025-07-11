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
    'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500/30 text-white shadow-lg hover:shadow-xl',
  secondary:
    'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-500/30 text-gray-900 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 dark:text-gray-100 shadow-md hover:shadow-lg',
  danger: 
    'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-red-500/30 text-white shadow-lg hover:shadow-xl',
  outline:
    'border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 focus:ring-blue-500/30 text-gray-700 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 dark:text-gray-300 shadow-sm hover:shadow-md backdrop-blur-sm',
  ghost:
    'hover:bg-gray-100/70 focus:ring-gray-500/30 text-gray-700 dark:hover:bg-gray-800/70 dark:text-gray-300 backdrop-blur-sm',
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm font-medium rounded-lg',
  md: 'px-6 py-3 text-sm font-semibold rounded-xl',
  lg: 'px-8 py-4 text-base font-semibold rounded-xl',
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
        'inline-flex items-center justify-center',
        'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'transform hover:scale-[1.02] active:scale-[0.98]',
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
