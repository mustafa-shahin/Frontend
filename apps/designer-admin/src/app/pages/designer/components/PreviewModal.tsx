import React, { useState, useEffect } from 'react';
import { Modal, Button, LoadingSpinner, cn } from '@frontend/shared';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: number;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  pageId,
}) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>(
    'desktop'
  );

  useEffect(() => {
    if (isOpen && pageId) {
      generatePreview();
    }
  }, [isOpen, pageId]);

  const generatePreview = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call the API to generate a preview
      // For now, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPreviewUrl(`/preview/${pageId}?token=preview_token`);
    } catch (error) {
      console.error('Failed to generate preview:', error);
    } finally {
      setLoading(false);
    }
  };

  const deviceSizes = {
    desktop: 'w-full h-full',
    tablet: 'w-[768px] h-[1024px] mx-auto',
    mobile: 'w-[375px] h-[667px] mx-auto',
  };

  const deviceIcons = {
    desktop: 'fas fa-desktop',
    tablet: 'fas fa-tablet-alt',
    mobile: 'fas fa-mobile-alt',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Page Preview"
      size="full"
      closeOnOverlayClick={false}
    >
      <div className="flex flex-col h-[90vh]">
        {/* Preview Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Preview Mode
            </h3>
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['desktop', 'tablet', 'mobile'] as const).map((device) => (
                <button
                  key={device}
                  onClick={() => setDeviceMode(device)}
                  className={cn(
                    'px-3 py-1 text-sm rounded flex items-center space-x-1 transition-colors',
                    deviceMode === device
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  )}
                >
                  <i className={deviceIcons[device]}></i>
                  <span className="capitalize">{device}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={generatePreview}
              loading={loading}
              icon={<i className="fas fa-refresh"></i>}
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(previewUrl, '_blank')}
              disabled={!previewUrl}
              icon={<i className="fas fa-external-link-alt"></i>}
            >
              Open in New Tab
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-4 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Generating preview...
                </p>
              </div>
            </div>
          ) : previewUrl ? (
            <div
              className={cn(
                'transition-all duration-300 bg-white rounded-lg shadow-lg overflow-hidden',
                deviceSizes[deviceMode],
                deviceMode !== 'desktop' &&
                  'border border-gray-300 dark:border-gray-600'
              )}
            >
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Page Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <i className="fas fa-exclamation-circle text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Preview Not Available
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Unable to generate preview for this page.
                </p>
                <Button
                  onClick={generatePreview}
                  icon={<i className="fas fa-retry"></i>}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <span>Preview updates automatically as you make changes</span>
                <span>•</span>
                <span>
                  This preview may differ slightly from the final published page
                </span>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
