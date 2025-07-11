import React, { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';

interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onRetry?: () => void;
}

export function AsyncErrorBoundary({
  children,
  fallback,
  onRetry,
}: AsyncErrorBoundaryProps) {
  const handleError = (error: Error) => {
    // Handle async errors (like API failures)
    console.error('Async error caught:', error);
  };

  const defaultFallback = (
    <div className="flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="mx-auto h-12 w-12 text-red-500 mb-4">
          <i className="fas fa-exclamation-triangle text-2xl" />
        </div>

        <Alert
          type="error"
          message="Failed to load content. Please check your connection and try again."
          className="mb-4"
        />

        {onRetry && (
          <Button variant="primary" onClick={onRetry} className="mt-4">
            <i className="fas fa-redo mr-2" />
            Retry
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={fallback || defaultFallback} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
}
