import { useCallback, useState } from 'react';

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error: Error) => {
    setError(error);
    throw error; // This will be caught by the nearest ErrorBoundary
  }, []);

  return {
    error,
    resetError,
    captureError,
  };
}
