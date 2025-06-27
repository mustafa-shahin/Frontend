import React from 'react';
import { Button } from '@frontend/shared';

interface UserButtonProps {
  text?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;

  // Additional props that might come from the designer
  [key: string]: any;
}

export const UserButton: React.FC<UserButtonProps> = ({
  text = 'Click me',
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  loading = false,
  fullWidth = false,
  href,
  target,
  onClick,
  className,
  style,
  ...otherProps
}) => {
  const handleClick = () => {
    if (href) {
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    } else if (onClick) {
      onClick();
    }
  };

  const buttonContent = (
    <>
      {icon && !loading && <i className={`${icon} mr-2`}></i>}
      {text}
    </>
  );

  return (
    <div className={className} style={style}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        fullWidth={fullWidth}
        onClick={handleClick}
        {...otherProps}
      >
        {buttonContent}
      </Button>
    </div>
  );
};
