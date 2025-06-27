import React from 'react';
import { cn } from '@frontend/shared';

interface DesignerImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: boolean;
  isDesignerMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DesignerImage: React.FC<DesignerImageProps> = ({
  src = 'https://via.placeholder.com/400x300?text=Image',
  alt = 'Image',
  width = '100%',
  height = 'auto',
  objectFit = true,
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

  const imageClasses = cn('max-w-full h-auto transition-all duration-200', {
    'object-cover': objectFit,
    'object-contain': !objectFit,
  });

  const imageStyle = {
    width,
    height,
    ...style,
  };

  if (isDesignerMode) {
    return (
      <div className="relative group w-full">
        <div
          className={cn(
            'relative transition-all duration-200 cursor-pointer',
            isSelected &&
              'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900',
            'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 dark:hover:ring-offset-gray-900',
            className
          )}
          onClick={handleClick}
        >
          <img
            src={src}
            alt={alt}
            className={imageClasses}
            style={imageStyle}
            loading="lazy"
          />

          {/* Designer overlay */}
          <div className="absolute inset-0 bg-transparent" />
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -inset-1 border-2 border-blue-500 dark:border-blue-400 rounded-lg pointer-events-none">
            <div className="absolute -top-8 left-0 bg-blue-500 dark:bg-blue-400 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Image Component
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

        {/* Empty state overlay */}
        {!src && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded">
            <div className="text-center">
              <i className="fas fa-image text-2xl text-gray-400 mb-2"></i>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No image selected
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Normal mode (user-portal)
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        className={imageClasses}
        style={imageStyle}
        loading="lazy"
      />
    </div>
  );
};
