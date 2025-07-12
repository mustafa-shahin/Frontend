import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface FormCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, description, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="checkbox"
              className={cn(
                'h-4 w-4 rounded border-gray-300 text-blue-600',
                'focus:ring-blue-600 focus:ring-2 focus:ring-offset-2',
                'dark:border-gray-600 dark:bg-gray-800',
                'transition-colors duration-200',
                error && 'border-red-300 focus:ring-red-600',
                className
              )}
              {...props}
            />
          </div>
          {label && (
            <div className="ml-3 text-sm">
              <label
                htmlFor={props.id}
                className="font-medium text-gray-700 dark:text-gray-300"
              >
                {label}
              </label>
              {description && (
                <p className="text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
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

FormCheckbox.displayName = 'FormCheckbox';
