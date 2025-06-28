import React from 'react';
import {
  useForm,
  FieldValues,
  DefaultValues,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, cn } from '@frontend/shared';

export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'number'
    | 'url';
  placeholder?: string;
  helper?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
  rows?: number;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface GenericFormProps<T extends FieldValues> {
  fields: FormField[];
  schema: z.ZodTypeAny;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  className?: string;
}

export function GenericForm<T extends FieldValues>({
  fields,
  schema,
  defaultValues,
  onSubmit,
  onCancel,
  submitText = 'Save',
  cancelText = 'Cancel',
  isLoading = false,
  className,
}: GenericFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const renderField = (field: FormField) => {
    const error = errors[field.name]?.message as string | undefined;
    const commonProps = {
      label: field.label,
      placeholder: field.placeholder,
      helper: field.helper,
      error,
      leftIcon: field.leftIcon,
      rightIcon: field.rightIcon,
      className: field.className,
      disabled: isLoading || isSubmitting,
    };

    switch (field.type) {
      case 'number':
        return (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            <input
              {...register(field.name as any, { valueAsNumber: true })} // This ensures numeric conversion
              type="number"
              placeholder={field.placeholder}
              className={cn(
                'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
                'ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-offset-gray-900',
                'dark:placeholder:text-gray-400 dark:focus:ring-blue-400',
                error &&
                  'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400',
                field.className
              )}
              disabled={isLoading || isSubmitting}
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {field.helper && !error && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {field.helper}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            <textarea
              {...register(field.name as any)}
              rows={field.rows || 3}
              placeholder={field.placeholder}
              className={cn(
                'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
                'ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-offset-gray-900',
                'dark:placeholder:text-gray-400 dark:focus:ring-blue-400',
                error &&
                  'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400',
                field.className
              )}
              disabled={isLoading || isSubmitting}
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {field.helper && !error && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {field.helper}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            <select
              {...register(field.name as any, {
                // Add value transformation for numeric options
                setValueAs: (value) => {
                  // Check if all options are numeric
                  const hasNumericOptions = field.options?.every(
                    (option) => typeof option.value === 'number'
                  );
                  return hasNumericOptions ? Number(value) : value;
                },
              })}
              className={cn(
                'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
                'ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-offset-gray-900',
                'dark:focus:ring-blue-400',
                error &&
                  'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400',
                field.className
              )}
              disabled={isLoading || isSubmitting}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {field.helper && !error && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {field.helper}
              </p>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register(field.name as any)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              disabled={isLoading || isSubmitting}
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
        );

      default:
        return (
          <Input
            key={field.name}
            type={field.type}
            {...register(field.name as any)}
            {...commonProps}
          />
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
    >
      <div className="space-y-4">{fields.map(renderField)}</div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading || isSubmitting}
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="submit"
          loading={isLoading || isSubmitting}
          disabled={isLoading || isSubmitting}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}
