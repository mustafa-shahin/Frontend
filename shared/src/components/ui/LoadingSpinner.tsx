import { cn } from '../../utils/cn';

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'white' | 'gray' | 'success' | 'warning' | 'error';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bounce';
  text?: string;
  overlay?: boolean;
}

const spinnerSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const spinnerColors = {
  primary: 'text-blue-600 dark:text-blue-400',
  white: 'text-white',
  gray: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
};

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

export function LoadingSpinner({
  size = 'md',
  className,
  color = 'primary',
  variant = 'spinner',
  text,
  overlay = false,
}: LoadingSpinnerProps) {
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={cn('flex space-x-1', className)}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'rounded-full animate-pulse',
                  spinnerSizes[size],
                  'bg-current',
                  spinnerColors[color]
                )}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.9s',
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div
            className={cn(
              'rounded-full animate-pulse',
              spinnerSizes[size],
              'bg-current',
              spinnerColors[color],
              className
            )}
            style={{
              animationDuration: '1.5s',
            }}
          />
        );

      case 'bounce':
        return (
          <div className={cn('flex space-x-1', className)}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'rounded-full animate-bounce',
                  spinnerSizes[size],
                  'bg-current',
                  spinnerColors[color]
                )}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s',
                }}
              />
            ))}
          </div>
        );

      case 'spinner':
      default:
        return (
          <div
            className={cn(
              'animate-spin border-2 border-current border-t-transparent rounded-full',
              spinnerSizes[size],
              spinnerColors[color],
              className
            )}
            role="status"
            aria-label="Loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        );
    }
  };

  const content = (
    <div
      className={cn(
        'flex items-center',
        text ? 'space-x-3' : 'justify-center',
        overlay && 'flex-col space-y-3'
      )}
    >
      {renderSpinner()}
      {text && (
        <span
          className={cn(
            'font-medium',
            textSizes[size],
            spinnerColors[color],
            overlay && 'text-center'
          )}
        >
          {text}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

// Convenience components for common use cases
export function LoadingOverlay({
  text = 'Loading...',
  ...props
}: Omit<LoadingSpinnerProps, 'overlay'>) {
  return <LoadingSpinner {...props} text={text} overlay={true} />;
}

export function InlineSpinner({ size = 'sm', ...props }: LoadingSpinnerProps) {
  return <LoadingSpinner {...props} size={size} className="inline-block" />;
}

export function ButtonSpinner({
  size = 'sm',
  color = 'white',
  ...props
}: LoadingSpinnerProps) {
  return <LoadingSpinner {...props} size={size} color={color} />;
}
