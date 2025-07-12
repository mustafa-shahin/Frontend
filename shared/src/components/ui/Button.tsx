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
    'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white shadow-sm border border-transparent',
  secondary:
    'bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 text-gray-900 shadow-sm border border-gray-200 hover:border-gray-300',
  danger:
    'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white shadow-sm border border-transparent',
  outline:
    'bg-white hover:bg-gray-50 focus:ring-blue-500 text-gray-700 shadow-sm border border-gray-300 hover:border-gray-400',
  ghost:
    'bg-transparent hover:bg-gray-100 focus:ring-gray-500 text-gray-700 border border-transparent',
};

const buttonSizes = {
  sm: 'px-3 py-2 text-sm font-medium rounded-lg',
  md: 'px-4 py-2.5 text-sm font-semibold rounded-lg',
  lg: 'px-6 py-3 text-base font-semibold rounded-xl',
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
        'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'font-medium relative overflow-hidden',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <LoadingSpinner
          size={size === 'sm' ? 'sm' : 'md'}
          className="mr-2"
          color={
            variant === 'primary' || variant === 'danger' ? 'white' : 'primary'
          }
        />
      )}
      {children}
    </button>
  );
}
