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
  | 'link'
  | 'filter'
  | 'ellipsis-h'
  | 'archive'
  | 'shield-alt'
  | 'lightbulb'
  | 'book'
  | 'video'
  | 'question-circle'
  | 'magic'
  | 'mouse-pointer'
  | 'mobile-alt'
  | 'bolt'
  | 'sync-alt'
  | 'refresh'
  | 'users'
  | 'bell'
  | 'bell-slash'
  | 'star'
  | 'star-half-alt'
  | 'heart'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'comment'
  | 'share'
  | 'download'
  | 'upload'
  | 'print'
  | 'expand'
  | 'compress'
  | 'maximize'
  | 'minimize'
  | 'window-restore'
  | 'fullscreen'
  | 'play'
  | 'pause'
  | 'stop'
  | 'forward'
  | 'backward'
  | 'step-forward'
  | 'step-backward'
  | 'volume-up'
  | 'volume-down'
  | 'volume-mute'
  | 'wifi'
  | 'bluetooth'
  | 'battery-full'
  | 'battery-half'
  | 'battery-quarter'
  | 'battery-empty'
  | 'signal'
  | 'rss'
  | 'microphone'
  | 'microphone-slash'
  | 'camera'
  | 'video-camera'
  | 'phone'
  | 'map-marker'
  | 'map'
  | 'compass'
  | 'location-arrow'
  | 'flag'
  | 'tag'
  | 'tags'
  | 'bookmark'
  | 'paperclip'
  | 'fire'
  | 'flash'
  | 'key'
  | 'unlock'
  | 'fingerprint'
  | 'qrcode'
  | 'barcode'
  | 'cart-plus'
  | 'shopping-cart'
  | 'credit-card'
  | 'money-bill'
  | 'coins'
  | 'chart-line'
  | 'chart-bar'
  | 'chart-pie'
  | 'table'
  | 'list'
  | 'list-ul'
  | 'list-ol'
  | 'indent'
  | 'outdent'
  | 'align-left'
  | 'align-center'
  | 'align-right'
  | 'align-justify'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'font'
  | 'text-height'
  | 'text-width'
  | 'paragraph'
  | 'heading'
  | 'quote-left'
  | 'quote-right'
  | 'code'
  | 'terminal'
  | 'desktop'
  | 'laptop'
  | 'tablet'
  | 'mobile'
  | 'server'
  | 'database'
  | 'cloud'
  | 'cloud-upload'
  | 'cloud-download'
  | 'hdd'
  | 'memory'
  | 'microchip'
  | 'plug'
  | 'power-off'
  | 'sliders-h'
  | 'tools'
  | 'wrench'
  | 'hammer'
  | 'screwdriver'
  | 'bug'
  | 'shield'
  | 'lock-open'
  | 'user-shield'
  | 'user-secret'
  | 'user-tie'
  | 'user-plus'
  | 'user-minus'
  | 'user-check'
  | 'user-times'
  | 'user-edit'
  | 'user-friends'
  | 'user-cog'
  | 'graduation-cap'
  | 'university'
  | 'school'
  | 'chalkboard'
  | 'chalkboard-teacher'
  | 'apple-alt'
  | 'seedling'
  | 'tree'
  | 'leaf'
  | 'spa'
  | 'swimmer'
  | 'running'
  | 'walking'
  | 'dumbbell'
  | 'heartbeat'
  | 'first-aid'
  | 'pills'
  | 'syringe'
  | 'thermometer'
  | 'stethoscope'
  | 'ambulance'
  | 'hospital'
  | 'clinic-medical'
  | 'medical-bag'
  | 'band-aid'
  | 'tooth'
  | 'smile'
  | 'frown'
  | 'meh'
  | 'laugh'
  | 'grin'
  | 'angry'
  | 'sad-tear'
  | 'kiss'
  | 'wink'
  | 'dizzy'
  | 'flushed'
  | 'surprised'
  | 'neutral';
