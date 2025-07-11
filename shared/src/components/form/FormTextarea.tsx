import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <textarea
          ref={ref}
          className={cn(
            'block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset',
            'placeholder:text-gray-400 focus:ring-2 focus:ring-inset',
            'transition-all duration-200 resize-vertical',
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
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
            <i className="fas fa-exclamation-triangle mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
