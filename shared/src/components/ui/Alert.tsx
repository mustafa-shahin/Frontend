import React from 'react';
import { cn } from '../../utils/cn';

export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
  title?: string;
}

const alertVariants = {
  success: {
    container:
      'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    icon: 'text-green-400 fa fa-check-circle',
    title: 'text-green-800 dark:text-green-200',
    message: 'text-green-700 dark:text-green-300',
    closeButton:
      'text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300',
  },
  error: {
    container:
      'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    icon: 'text-red-400 fa fa-exclamation-triangle',
    title: 'text-red-800 dark:text-red-200',
    message: 'text-red-700 dark:text-red-300',
    closeButton:
      'text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300',
  },
  warning: {
    container:
      'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    icon: 'text-yellow-400 fa fa-exclamation-triangle',
    title: 'text-yellow-800 dark:text-yellow-200',
    message: 'text-yellow-700 dark:text-yellow-300',
    closeButton:
      'text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300',
  },
  info: {
    container:
      'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    icon: 'text-blue-400 fa fa-info-circle',
    title: 'text-blue-800 dark:text-blue-200',
    message: 'text-blue-700 dark:text-blue-300',
    closeButton:
      'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300',
  },
};

export function Alert({
  type,
  message,
  onClose,
  className,
  title,
}: AlertProps) {
  const variant = alertVariants[type];

  return (
    <div
      className={cn(
        'rounded-md border p-4 animate-fade-in',
        variant.container,
        className
      )}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <i className={cn('w-5 h-5', variant.icon)} aria-hidden="true" />
        </div>

        <div className="ml-3 flex-1">
          {title && (
            <h3 className={cn('text-sm font-medium mb-1', variant.title)}>
              {title}
            </h3>
          )}
          <p className={cn('text-sm', variant.message)}>{message}</p>
        </div>

        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  'transition-colors duration-200',
                  variant.closeButton
                )}
                aria-label="Close alert"
              >
                <i className="fa fa-times w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
