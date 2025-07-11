import React from 'react';
import { cn } from '../../utils/cn';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant?: 'solid' | 'outline';
  spin?: boolean;
  fixedWidth?: boolean;
  pulse?: boolean;
}

const iconSizes = {
  xs: 'fa-xs',
  sm: 'fa-sm',
  md: '', // default size
  lg: 'fa-lg',
  xl: 'fa-xl',
  '2xl': 'fa-2x',
  '3xl': 'fa-3x',
};

export function Icon({
  name,
  size = 'md',
  variant = 'solid',
  spin = false,
  fixedWidth = false,
  pulse = false,
  className,
  ...props
}: IconProps) {
  const baseClass = variant === 'outline' ? 'far' : 'fas';

  return (
    <i
      className={cn(
        baseClass,
        `fa-${name}`,
        iconSizes[size],
        {
          'fa-spin': spin,
          'fa-pulse': pulse,
          'fa-fw': fixedWidth,
        },
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

// Common icon name type for better TypeScript support
export type IconName =
  | 'user'
  | 'envelope'
  | 'lock'
  | 'eye'
  | 'eye-slash'
  | 'arrow-left'
  | 'arrow-right'
  | 'check'
  | 'times'
  | 'plus'
  | 'edit'
  | 'trash'
  | 'save'
  | 'globe'
  | 'cog'
  | 'home'
  | 'file-alt'
  | 'image'
  | 'images'
  | 'search'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'bars'
  | 'sun'
  | 'moon'
  | 'paint-brush'
  | 'palette'
  | 'tachometer-alt'
  | 'sign-out-alt'
  | 'sign-in-alt'
  | 'info-circle'
  | 'exclamation-triangle'
  | 'spinner'
  | 'check-circle'
  | 'loading'
  | 'calendar'
  | 'clock'
  | 'external-link-alt'
  | 'copy'
  | 'folder'
  | 'link';
