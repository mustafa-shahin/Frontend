import React, { forwardRef, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { Icon, IconName } from './Icon';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode | IconName;
  rightIcon?: React.ReactNode | IconName;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  leftIconClassName?: string;
  rightIconClassName?: string;
  variant?: 'default' | 'filled' | 'outlined';
  inputSize?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const inputSizes = {
  sm: 'py-2 text-sm',
  md: 'py-2.5 text-sm',
  lg: 'py-3 text-base',
};

const inputVariants = {
  default: {
    base: 'border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 bg-white',
    error: 'ring-red-300 focus:ring-red-600',
    disabled: 'bg-gray-50 ring-gray-200',
  },
  filled: {
    base: 'border-0 bg-gray-100 hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-600',
    error: 'bg-red-50 focus:bg-white focus:ring-red-600',
    disabled: 'bg-gray-100',
  },
  outlined: {
    base: 'border-2 border-gray-300 focus:border-blue-600 bg-white',
    error: 'border-red-300 focus:border-red-600',
    disabled: 'bg-gray-50 border-gray-200',
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onLeftIconClick,
      onRightIconClick,
      leftIconClassName,
      rightIconClassName,
      variant = 'default',
      inputSize = 'md',
      loading = false,
      clearable = false,
      onClear,
      disabled,
      value,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;
    const isDisabled = disabled || loading;

    // Determine if we should show the clear button
    const showClearButton = clearable && value && !isDisabled && !loading;

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword(!showPassword);
    }, [showPassword]);

    const handleClear = useCallback(() => {
      onClear?.();
      // If no custom clear handler, create synthetic event
      if (!onClear && onChange) {
        const syntheticEvent = {
          target: { value: '' },
          currentTarget: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    }, [onClear, onChange]);

    const handleLeftIconClick = useCallback(() => {
      if (isDisabled) return;
      onLeftIconClick?.();
    }, [onLeftIconClick, isDisabled]);

    const handleRightIconClick = useCallback(() => {
      if (isDisabled) return;
      if (isPassword) {
        togglePasswordVisibility();
      } else if (showClearButton) {
        handleClear();
      } else {
        onRightIconClick?.();
      }
    }, [
      isPassword,
      showClearButton,
      togglePasswordVisibility,
      handleClear,
      onRightIconClick,
      isDisabled,
    ]);

    // Render icon helper
    const renderIcon = (
      iconProp: React.ReactNode | IconName | undefined,
      fallbackIcon?: React.ReactNode
    ): React.ReactNode => {
      if (iconProp === undefined) return fallbackIcon;
      if (typeof iconProp === 'string') {
        return <Icon name={iconProp as IconName} />;
      }
      return iconProp;
    };

    // Determine right icon
    const getRightIcon = (): React.ReactNode => {
      if (loading) {
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
        );
      }

      if (isPassword) {
        return renderIcon(
          rightIcon,
          <Icon name={showPassword ? 'eye-slash' : 'eye'} />
        );
      }

      if (showClearButton) {
        return <Icon name="times" />;
      }

      return renderIcon(rightIcon);
    };

    const leftIconElement = renderIcon(leftIcon);
    const rightIconElement = getRightIcon();

    // Calculate padding based on icons
    const getPadding = () => {
      let paddingLeft = leftIconElement ? 'pl-10' : 'pl-3';
      let paddingRight = rightIconElement ? 'pr-10' : 'pr-3';

      if (inputSize === 'sm') {
        paddingLeft = leftIconElement ? 'pl-9' : 'pl-3';
        paddingRight = rightIconElement ? 'pr-9' : 'pr-3';
      } else if (inputSize === 'lg') {
        paddingLeft = leftIconElement ? 'pl-12' : 'pl-4';
        paddingRight = rightIconElement ? 'pr-12' : 'pr-4';
      }

      return `${paddingLeft} ${paddingRight}`;
    };

    const variantStyles = inputVariants[variant];

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium',
              error
                ? 'text-red-700 dark:text-red-400'
                : 'text-gray-700 dark:text-gray-300',
              isDisabled && 'text-gray-400 dark:text-gray-600'
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Left Icon */}
          {leftIconElement && (
            <div
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center',
                inputSize === 'sm'
                  ? 'w-9 h-9'
                  : inputSize === 'lg'
                  ? 'w-12 h-12'
                  : 'w-10 h-10',
                onLeftIconClick && !isDisabled
                  ? 'cursor-pointer hover:text-gray-600 dark:hover:text-gray-300'
                  : '',
                isDisabled
                  ? 'text-gray-300 dark:text-gray-600'
                  : 'text-gray-400 dark:text-gray-500',
                leftIconClassName
              )}
              onClick={handleLeftIconClick}
            >
              {leftIconElement}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={actualType}
            id={inputId}
            disabled={isDisabled}
            value={value}
            onChange={onChange}
            className={cn(
              // Base styles
              'block w-full rounded-lg shadow-sm transition-all duration-200 font-medium',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'text-gray-900 dark:text-gray-100',
              'focus:outline-none',

              // Size styles
              inputSizes[inputSize],

              // Padding based on icons
              getPadding(),

              // Variant styles
              !error && !isDisabled && variantStyles.base,
              error && variantStyles.error,
              isDisabled && variantStyles.disabled,

              // Dark mode styles
              'dark:bg-gray-800 dark:ring-gray-600 dark:focus:ring-blue-500',
              error && 'dark:ring-red-600 dark:focus:ring-red-500',
              isDisabled && 'dark:bg-gray-900 dark:ring-gray-700',

              // Custom className
              className
            )}
            {...props}
          />

          {/* Right Icon */}
          {rightIconElement && (
            <div
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center',
                inputSize === 'sm'
                  ? 'w-9 h-9'
                  : inputSize === 'lg'
                  ? 'w-12 h-12'
                  : 'w-10 h-10',
                // Clickable states
                (isPassword || showClearButton || onRightIconClick) &&
                  !isDisabled
                  ? 'cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors'
                  : '',
                // Color states
                isDisabled
                  ? 'text-gray-300 dark:text-gray-600'
                  : 'text-gray-400 dark:text-gray-500',
                // Clear button specific styles
                showClearButton && 'hover:text-red-500 dark:hover:text-red-400',
                rightIconClassName
              )}
              onClick={handleRightIconClick}
              role={
                isPassword || showClearButton || onRightIconClick
                  ? 'button'
                  : undefined
              }
              tabIndex={
                (isPassword || showClearButton || onRightIconClick) &&
                !isDisabled
                  ? 0
                  : -1
              }
              aria-label={
                isPassword
                  ? showPassword
                    ? 'Hide password'
                    : 'Show password'
                  : showClearButton
                  ? 'Clear input'
                  : undefined
              }
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                  e.preventDefault();
                  handleRightIconClick();
                }
              }}
            >
              {rightIconElement}
            </div>
          )}
        </div>

        {/* Helper Text or Error */}
        {(error || helperText) && (
          <div className="text-sm">
            {error ? (
              <p className="text-red-600 dark:text-red-400 flex items-center">
                <Icon
                  name="exclamation-triangle"
                  className="mr-1.5 text-xs flex-shrink-0"
                />
                {error}
              </p>
            ) : helperText ? (
              <p className="text-gray-500 dark:text-gray-400">{helperText}</p>
            ) : null}
          </div>
        )}

        {/* Loading state indicator */}
        {loading && (
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <div className="animate-spin rounded-full h-3 w-3 border border-gray-400 border-t-transparent mr-2" />
            Processing...
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
