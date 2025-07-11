import { forwardRef } from 'react';
import { Input, InputProps } from '../ui/Input';

export interface FormInputProps extends Omit<InputProps, 'error'> {
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, ...props }, ref) => {
    return <Input {...props} ref={ref} error={error} />;
  }
);

FormInput.displayName = 'FormInput';
