import React from 'react';
import { Modal } from '@frontend/shared';

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  icon?: string;
  description?: string;
}

export const CrudModal: React.FC<CrudModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'lg',
  icon = 'fas fa-edit',
  description,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={false}
      closeOnEscapeKey={true}
      showCloseButton={true}
      className="overflow-hidden"
    >
      {/* Custom Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <i className={`${icon} text-white text-lg`}></i>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[calc(85vh-120px)] overflow-y-auto">
        <div className="p-6">{children}</div>
      </div>
    </Modal>
  );
};
