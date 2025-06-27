import React from 'react';
import { Button } from '@frontend/shared';

interface UserButtonProps {
  text?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
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
      >
        {buttonContent}
      </Button>
    </div>
  );
};
