import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  footer?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

const cardVariants = {
  default:
    'bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700',
  elevated:
    'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700',
  outlined:
    'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
};

export function Card({
  children,
  title,
  className,
  footer,
  variant = 'default',
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-200',
        cardVariants[variant],
        className
      )}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
      )}

      <div className="px-6 py-4">{children}</div>

      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
}
