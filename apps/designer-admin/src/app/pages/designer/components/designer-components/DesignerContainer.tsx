import React from 'react';
import { cn } from '@frontend/shared';

interface DesignerContainerProps {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'white' | 'gray' | 'blue' | 'green' | 'red';
  border?: boolean;
  shadow?: boolean;
  children?: React.ReactNode;
  isDesignerMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DesignerContainer: React.FC<DesignerContainerProps> = ({
  padding = 'md',
  background = 'transparent',
  border = false,
  shadow = false,
  children,
  isDesignerMode = false,
  isSelected = false,
  onSelect,
  onDelete,
  className,
  style,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (isDesignerMode) {
      e.preventDefault();
      e.stopPropagation();
      onSelect?.();
    }
  };

  const containerClasses = cn(
    'rounded-lg transition-all duration-200 min-h-16',
    {
      // Padding classes
      'p-0': padding === 'none',
      'p-2': padding === 'sm',
      'p-4': padding === 'md',
      'p-6': padding === 'lg',
      'p-8': padding === 'xl',
    },
    {
      // Background classes
      'bg-transparent': background === 'transparent',
      'bg-white dark:bg-gray-900': background === 'white',
      'bg-gray-100 dark:bg-gray-800': background === 'gray',
      'bg-blue-100 dark:bg-blue-900/30': background === 'blue',
      'bg-green-100 dark:bg-green-900/30': background === 'green',
      'bg-red-100 dark:bg-red-900/30': background === 'red',
    },
    {
      // Border classes
      'border border-gray-200 dark:border-gray-700': border,
    },
    {
      // Shadow classes
      'shadow-md': shadow,
    }
  );

  if (isDesignerMode) {
    return (
      <div className="relative group w-full">
        <div
          className={cn(
            'relative transition-all duration-200 cursor-pointer',
            containerClasses,
            isSelected &&
              'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900',
            'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 dark:hover:ring-offset-gray-900',
            className
          )}
          onClick={handleClick}
          style={style}
        >
          {children || (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-cube text-gray-400"></i>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Container Content
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Click to configure
              </p>
            </div>
          )}

          {/* Designer overlay */}
          <div className="absolute inset-0 bg-transparent" />
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -inset-1 border-2 border-blue-500 dark:border-blue-400 rounded-lg pointer-events-none">
            <div className="absolute -top-8 left-0 bg-blue-500 dark:bg-blue-400 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Container Component
            </div>
          </div>
        )}

        {/* Hover controls */}
        <div
          className={cn(
            'absolute -top-8 right-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity',
            isSelected && 'opacity-100'
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs"
            title="Configure"
          >
            <i className="fas fa-cog"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs"
            title="Delete"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    );
  }

  // Normal mode (user-portal)
  return (
    <div className={cn(containerClasses, className)} style={style}>
      {children || (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-cube text-gray-400"></i>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Container Content
          </p>
        </div>
      )}
    </div>
  );
};
