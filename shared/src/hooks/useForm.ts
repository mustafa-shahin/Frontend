import { useState, useCallback, useEffect } from 'react';
import { ZodSchema, ZodError } from 'zod';

export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: ZodSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (name: keyof T, value: any) => void;
  handleBlur: (name: keyof T) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  setFieldValue: (name: keyof T, value: any) => void;
  setFieldError: (name: keyof T, error: string) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  resetForm: () => void;
  validateField: (name: keyof T) => string | null;
  validateForm: () => boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
  validateOnChange = false,
  validateOnBlur = true,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T): string | null => {
      if (!validationSchema) return null;

      try {
        validationSchema.parse(values);
        return null;
      } catch (error) {
        if (error instanceof ZodError) {
          const fieldError = error.errors.find((err) =>
            err.path.includes(name as string)
          );
          return fieldError?.message || null;
        }
        return null;
      }
    },
    [values, validationSchema]
  );

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    if (!validationSchema) return true;

    try {
      validationSchema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof T;
          if (field && !newErrors[field]) {
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
        return false;
      }
      return false;
    }
  }, [values, validationSchema]);

  // Handle field change
  const handleChange = useCallback(
    (name: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      if (validateOnChange) {
        // Clear error for this field first
        setErrors((prev) => ({ ...prev, [name]: undefined }));

        // Validate after state update
        setTimeout(() => {
          const error = validateField(name);
          if (error) {
            setErrors((prev) => ({ ...prev, [name]: error }));
          }
        }, 0);
      }
    },
    [validateOnChange, validateField]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));

      if (validateOnBlur) {
        const error = validateField(name);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validateOnBlur, validateField]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      // Mark all fields as touched
      const allTouched: Partial<Record<keyof T, boolean>> = {};
      Object.keys(values).forEach((key) => {
        allTouched[key as keyof T] = true;
      });
      setTouched(allTouched);

      // Validate form
      const isValid = validateForm();

      if (!isValid) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        // Handle submission errors
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm, onSubmit]
  );

  // Set field value
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Set field error
  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  // Set multiple errors
  const setFormErrors = useCallback(
    (newErrors: Partial<Record<keyof T, string>>) => {
      setErrors(newErrors);
    },
    []
  );

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    setErrors: setFormErrors,
    resetForm,
    validateField,
    validateForm,
  };
}
