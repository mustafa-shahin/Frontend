import React from 'react';
import { cn } from '@frontend/shared';

interface UserImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: boolean;
  className?: string;
  style?: React.CSSProperties;

  // Additional props that might come from the designer
  [key: string]: any;
}

export const UserImage: React.FC<UserImageProps> = ({
  src = 'https://via.placeholder.com/400x300?text=Image',
  alt = 'Image',
  width = '100%',
  height = 'auto',
  objectFit = true,
  className,
  style,
  ...otherProps
}) => {
  const imageClasses = cn('max-w-full h-auto', {
    'object-cover': objectFit,
    'object-contain': !objectFit,
  });

  const imageStyle = {
    width,
    height,
    ...style,
  };

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        className={imageClasses}
        style={imageStyle}
        loading="lazy"
        {...otherProps}
      />
    </div>
  );
};
