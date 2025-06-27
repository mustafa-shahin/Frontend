import React, { JSX } from 'react';
import { cn } from '@frontend/shared';

interface UserTextProps {
  content?: string;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  alignment?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  style?: React.CSSProperties;

  // Additional props that might come from the designer
  [key: string]: any;
}

export const UserText: React.FC<UserTextProps> = ({
  content = 'Your text here',
  tag = 'p',
  alignment = 'left',
  className,
  style,
  ...otherProps
}) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  const textClasses = cn(
    'prose dark:prose-invert max-w-none',
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
    },
    className
  );

  return (
    <div className={className} style={style}>
      <Tag className={textClasses} {...otherProps}>
        {content}
      </Tag>
    </div>
  );
};
