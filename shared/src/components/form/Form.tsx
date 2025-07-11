import React from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
  DefaultValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodTypeAny } from 'zod';
import { cn } from '../../utils/cn';

export interface FormProps<T extends FieldValues> {
  schema?: ZodTypeAny;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
  resetOnSubmit?: boolean;
}

export function Form<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  mode = 'onBlur',
  resetOnSubmit = false,
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: schema ? zodResolver(schema as any) : undefined,
    defaultValues,
    mode,
  });

  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    try {
      await onSubmit(data);
      if (resetOnSubmit) {
        methods.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={cn('space-y-6', className)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
