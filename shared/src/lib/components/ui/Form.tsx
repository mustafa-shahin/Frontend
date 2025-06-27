import { ReactNode } from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  Path,
  useFormContext,
  SubmitHandler,
  DefaultValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '../../utils/cn';
import { Input, InputProps } from './Input';
import { Button, ButtonProps } from './Button';

interface FormProps<T extends FieldValues> {
  schema: z.ZodTypeAny;
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  children: ReactNode;
  className?: string;
}

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className,
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

interface FormFieldProps<T extends FieldValues>
  extends Omit<InputProps, 'name'> {
  name: Path<T>;
}

export function FormField<T extends FieldValues>({
  name,
  ...props
}: FormFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return <Input {...register(name)} error={error} {...props} />;
}

interface FormSubmitProps extends ButtonProps {
  children?: ReactNode;
}

export function FormSubmit({ children = 'Submit', ...props }: FormSubmitProps) {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      loading={formState.isSubmitting}
      disabled={formState.isSubmitting}
      {...props}
    >
      {children}
    </Button>
  );
}

// Form Error Display
interface FormErrorProps {
  children: ReactNode;
}

export function FormError({ children }: FormErrorProps) {
  if (!children) return null;

  return (
    <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {children}
          </h3>
        </div>
      </div>
    </div>
  );
}

// Form Success Display
interface FormSuccessProps {
  children: ReactNode;
}

export function FormSuccess({ children }: FormSuccessProps) {
  if (!children) return null;

  return (
    <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-green-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
            {children}
          </h3>
        </div>
      </div>
    </div>
  );
}
