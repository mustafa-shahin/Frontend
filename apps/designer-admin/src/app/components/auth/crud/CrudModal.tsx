import React from 'react';
import { Modal } from '@frontend/shared';

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const CrudModal: React.FC<CrudModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'lg',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      closeOnOverlayClick={false}
      closeOnEscapeKey={true}
      showCloseButton={true}
    >
      <div className="max-h-[80vh] overflow-y-auto">{children}</div>
    </Modal>
  );
};
