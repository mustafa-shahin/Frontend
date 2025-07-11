import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

export interface FormSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: FormSelectOption[];
  placeholder?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ options, placeholder, error, onChange, className, ...props }, ref) => {
    const { t } = useTranslation('form');

    return (
      <select
        ref={ref}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset',
          'placeholder:text-gray-400 focus:ring-2 focus:ring-inset',
          'transition-all duration-200',
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
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

FormSelect.displayName = 'FormSelect';
