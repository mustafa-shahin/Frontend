import React from 'react';
import { Button, cn } from '@frontend/shared';

interface DesignerButtonProps {
  text?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
  fullWidth?: boolean;
  isDesignerMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const DesignerButton: React.FC<DesignerButtonProps> = ({
  text = 'Click me',
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  loading = false,
  fullWidth = false,
  isDesignerMode = false,
  isSelected = false,
  onSelect,
  onDelete,
  className,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (isDesignerMode) {
      e.preventDefault();
      e.stopPropagation();
      onSelect?.();
    }
  };

  const buttonContent = (
    <>
      {icon && !loading && <i className={cn('mr-2', icon)}></i>}
      {text}
    </>
  );

  if (isDesignerMode) {
    return (
      <div className="relative group w-full">
        <div
          className={cn(
            'relative transition-all duration-200',
            isSelected &&
              'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900',
            'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 dark:hover:ring-offset-gray-900',
            className
          )}
          onClick={handleClick}
        >
          <Button
            variant={variant}
            size={size}
            disabled={disabled}
            loading={loading}
            fullWidth={fullWidth}
            className="cursor-pointer w-full"
          >
            {buttonContent}
          </Button>

          {/* Designer overlay */}
          <div className="absolute inset-0 bg-transparent" />
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -inset-1 border-2 border-blue-500 dark:border-blue-400 rounded-lg pointer-events-none">
            <div className="absolute -top-8 left-0 bg-blue-500 dark:bg-blue-400 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Button Component
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
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      loading={loading}
      fullWidth={fullWidth}
      className={className}
    >
      {buttonContent}
    </Button>
  );
};
