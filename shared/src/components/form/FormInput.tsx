import { forwardRef } from 'react';
import { Input, InputProps } from '../ui/Input';

export type FormInputProps = InputProps;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    return <Input {...props} ref={ref} />;
  }
);

FormInput.displayName = 'FormInput';
