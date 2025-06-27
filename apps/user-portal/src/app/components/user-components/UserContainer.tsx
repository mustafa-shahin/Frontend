import React from 'react';
import { cn } from '@frontend/shared';

interface UserContainerProps {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'white' | 'gray' | 'blue' | 'green' | 'red';
  border?: boolean;
  shadow?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;

  // Additional props that might come from the designer
  [key: string]: any;
}

export const UserContainer: React.FC<UserContainerProps> = ({
  padding = 'md',
  background = 'transparent',
  border = false,
  shadow = false,
  children,
  className,
  style,
  ...otherProps
}) => {
  const containerClasses = cn(
    'rounded-lg transition-all duration-200',
    {
      // Padding classes
      'p-0': padding === 'none',
      'p-2': padding === 'sm',
      'p-4': padding === 'md',
      'p-6': padding === 'lg',
      'p-8': padding === 'xl',
    },
    {
      // Background classes
      'bg-transparent': background === 'transparent',
      'bg-white dark:bg-gray-900': background === 'white',
      'bg-gray-100 dark:bg-gray-800': background === 'gray',
      'bg-blue-100 dark:bg-blue-900/30': background === 'blue',
      'bg-green-100 dark:bg-green-900/30': background === 'green',
      'bg-red-100 dark:bg-red-900/30': background === 'red',
    },
    {
      // Border classes
      'border border-gray-200 dark:border-gray-700': border,
    },
    {
      // Shadow classes
      'shadow-md': shadow,
    },
    className
  );

  return (
    <div className={containerClasses} style={style} {...otherProps}>
      {children || (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-cube text-gray-400"></i>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Container Content
          </p>
        </div>
      )}
    </div>
  );
};
