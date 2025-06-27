import React, { JSX } from 'react';
import { cn } from '@frontend/shared';

interface DesignerTextProps {
  content?: string;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  alignment?: 'left' | 'center' | 'right' | 'justify';
  isDesignerMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DesignerText: React.FC<DesignerTextProps> = ({
  content = 'Your text here',
  tag = 'p',
  alignment = 'left',
  isDesignerMode = false,
  isSelected = false,
  onSelect,
  onDelete,
  className,
  style,
}) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  const handleClick = (e: React.MouseEvent) => {
    if (isDesignerMode) {
      e.preventDefault();
      e.stopPropagation();
      onSelect?.();
    }
  };

  const textClasses = cn(
    'prose dark:prose-invert max-w-none cursor-pointer',
    {
      'text-left': alignment === 'left',
      'text-center': alignment === 'center',
      'text-right': alignment === 'right',
      'text-justify': alignment === 'justify',
    },
    {
      'text-sm': tag === 'span',
      'text-base': tag === 'p' || tag === 'div',
      'text-4xl font-bold': tag === 'h1',
      'text-3xl font-bold': tag === 'h2',
      'text-2xl font-bold': tag === 'h3',
      'text-xl font-bold': tag === 'h4',
      'text-lg font-bold': tag === 'h5',
      'text-base font-bold': tag === 'h6',
    }
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
          style={style}
        >
          <Tag className={textClasses}>{content || 'Click to edit text'}</Tag>

          {/* Designer overlay */}
          <div className="absolute inset-0 bg-transparent" />
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -inset-1 border-2 border-blue-500 dark:border-blue-400 rounded-lg pointer-events-none">
            <div className="absolute -top-8 left-0 bg-blue-500 dark:bg-blue-400 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Text Component ({tag.toUpperCase()})
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
    <div className={className} style={style}>
      <Tag className={textClasses}>{content}</Tag>
    </div>
  );
};
