import React from 'react';
import { Button, cn, PageStatus } from '@frontend/shared';

interface DesignerToolbarProps {
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onPublish: () => void;
  onPreview: () => void;
  onBack: () => void;
  saving: boolean;
  publishing: boolean;
  pageName: string;
  pageStatus: PageStatus;
  lastSavedAt?: Date | null;
  componentsCount: number;
}

export const DesignerToolbar: React.FC<DesignerToolbarProps> = ({
  hasUnsavedChanges,
  onSave,
  onPublish,
  onPreview,
  onBack,
  saving,
  publishing,
  pageName,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Back button and page info */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            icon={<i className="fas fa-arrow-left"></i>}
          >
            Back to Pages
          </Button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <i className="fas fa-paint-brush text-blue-600 dark:text-blue-400"></i>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {pageName}
              </span>
            </div>

            {hasUnsavedChanges && (
              <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">Unsaved changes</span>
              </div>
            )}
          </div>
        </div>

        {/* Center - Device preview options */}
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button className="px-3 py-1 text-sm rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm">
            <i className="fas fa-desktop mr-1"></i>
            Desktop
          </button>
          <button className="px-3 py-1 text-sm rounded text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <i className="fas fa-tablet-alt mr-1"></i>
            Tablet
          </button>
          <button className="px-3 py-1 text-sm rounded text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <i className="fas fa-mobile-alt mr-1"></i>
            Mobile
          </button>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            icon={<i className="fas fa-eye"></i>}
          >
            Preview
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            loading={saving}
            disabled={saving || !hasUnsavedChanges}
            icon={<i className="fas fa-save"></i>}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>

          <Button
            size="sm"
            onClick={onPublish}
            loading={publishing}
            disabled={publishing || hasUnsavedChanges}
            icon={<i className="fas fa-globe"></i>}
          >
            {publishing ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Status bar */}
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <i className="fas fa-clock"></i>
            <span>Last saved: Never</span>
          </div>
          <div className="flex items-center space-x-1">
            <i className="fas fa-history"></i>
            <span>Version: 1</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <i className="fas fa-cube"></i>
            <span>0 components</span>
          </div>
          <div className="flex items-center space-x-1">
            <i className="fas fa-th-large"></i>
            <span>Grid: 12 columns</span>
          </div>
        </div>
      </div>
    </div>
  );
};
