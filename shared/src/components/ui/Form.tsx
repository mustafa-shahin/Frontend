import React from 'react';
import { cn } from '../../utils/cn';
import { Alert } from './Alert';
import { Button } from './Button';
import { Card } from './Card';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  subtitle?: string;
  error?: string | null;
  success?: string | null;
  loading?: boolean;
  submitText?: string;
  onSubmit: (e: React.FormEvent) => void;
  onClearError?: () => void;
  onClearSuccess?: () => void;
  showCard?: boolean;
  cardVariant?: 'default' | 'elevated' | 'outlined';
  layout?: 'default' | 'centered' | 'split';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const formSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

const formLayouts = {
  default: '',
  centered: 'min-h-screen flex items-center justify-center p-4',
  split: 'min-h-screen grid grid-cols-1 lg:grid-cols-2',
};

export function Form({
  title,
  subtitle,
  error,
  success,
  loading = false,
  submitText = 'Submit',
  onSubmit,
  onClearError,
  onClearSuccess,
  showCard = true,
  cardVariant = 'elevated',
  layout = 'default',
  size = 'md',
  footer,
  actions,
  className,
  children,
  ...props
}: FormProps) {
  const formContent = (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="text-center space-y-2">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {error && <Alert type="error" message={error} onClose={onClearError} />}

      {success && (
        <Alert type="success" message={success} onClose={onClearSuccess} />
      )}

      <form
        onSubmit={onSubmit}
        className={cn('space-y-4', className)}
        noValidate
        {...props}
      >
        {children}

        <div className="space-y-4">
          {actions || (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              {submitText}
            </Button>
          )}
        </div>
      </form>

      {footer && (
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {footer}
        </div>
      )}
    </div>
  );

  const containerClasses = cn(
    formLayouts[layout],
    layout === 'centered' && 'bg-gray-50 dark:bg-gray-900'
  );

  const innerClasses = cn(
    formSizes[size],
    'w-full',
    layout === 'centered' && 'mx-auto'
  );

  if (layout === 'centered') {
    return (
      <div className={containerClasses}>
        <div className={innerClasses}>
          {showCard ? (
            <Card variant={cardVariant} className="shadow-xl">
              {formContent}
            </Card>
          ) : (
            formContent
          )}
        </div>
      </div>
    );
  }

  if (layout === 'split') {
    return (
      <div className={containerClasses}>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-8">
          <div className="text-white text-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome</h1>
            <p className="text-xl text-blue-100">
              Professional content management platform
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className={innerClasses}>
            {showCard ? (
              <Card variant={cardVariant}>{formContent}</Card>
            ) : (
              formContent
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(innerClasses, className)}>
      {showCard ? (
        <Card variant={cardVariant}>{formContent}</Card>
      ) : (
        formContent
      )}
    </div>
  );
}

// Form field wrapper component
export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  helperText,
  required = false,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {(error || helperText) && (
        <div className="text-xs">
          {error ? (
            <p className="text-red-600 dark:text-red-400 flex items-center">
              <i className="fa fa-exclamation-triangle mr-1" />
              {error}
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
}
