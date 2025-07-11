import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '../../utils/cn';

export interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: React.ReactElement<any>;
}

export function FormField({
  name,
  label,
  description,
  required = false,
  className,
  children,
}: FormFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const fieldId = `field-${name}`;

  const getErrorMessage = (error: any): string | undefined => {
    if (!error) return undefined;
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) {
      return error.message;
    }
    return undefined;
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const childProps = children.props || {};
          return React.cloneElement(children, {
            ...field,
            ...childProps,
            id: fieldId,
            error: fieldState.error?.message,
            className: cn(
              childProps.className,
              fieldState.error &&
                'border-red-300 focus:border-red-500 focus:ring-red-500'
            ),
          });
        }}
      />

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
          <i className="fas fa-exclamation-triangle mr-1" />
          {getErrorMessage(error)}
        </p>
      )}
    </div>
  );
}
