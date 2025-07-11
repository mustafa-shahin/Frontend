import React from 'react';
import { cn } from '../../utils/cn';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'white' | 'gray';
}

const spinnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const spinnerColors = {
  primary: 'text-blue-600',
  white: 'text-white',
  gray: 'text-gray-600',
};

export function LoadingSpinner({
  size = 'md',
  className,
  color = 'primary',
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin inline-block border-2 border-current border-t-transparent rounded-full',
        spinnerSizes[size],
        spinnerColors[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
