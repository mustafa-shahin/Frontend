import React, { useState, useEffect } from 'react';
import { Button, Input, cn } from '@frontend/shared';
import { DesignerComponent } from '../hooks/useDesignerState';

interface ComponentPropertiesProps {
  component?: DesignerComponent;
  onUpdate: (props: any) => void;
  onClose: () => void;
}

export const ComponentProperties: React.FC<ComponentPropertiesProps> = ({
  component,
  onUpdate,
  onClose,
}) => {
  const [properties, setProperties] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<
    'properties' | 'styles' | 'advanced'
  >('properties');

  useEffect(() => {
    if (component) {
      setProperties({ ...component.props });
    }
  }, [component]);

  if (!component) {
    return null;
  }

  const handlePropertyChange = (key: string, value: any) => {
    setProperties((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(properties);
  };

  const renderButtonProperties = () => (
    <div className="space-y-4">
      <Input
        label="Button Text"
        value={properties.text || ''}
        onChange={(e) => handlePropertyChange('text', e.target.value)}
        placeholder="Enter button text"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Variant
        </label>
        <select
          value={properties.variant || 'primary'}
          onChange={(e) => handlePropertyChange('variant', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="danger">Danger</option>
          <option value="outline">Outline</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Size
        </label>
        <select
          value={properties.size || 'md'}
          onChange={(e) => handlePropertyChange('size', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>

      <Input
        label="Icon (FontAwesome class)"
        value={properties.icon || ''}
        onChange={(e) => handlePropertyChange('icon', e.target.value)}
        placeholder="e.g., fas fa-home"
        helper="Enter FontAwesome icon class name"
      />

      <Input
        label="Link URL"
        value={properties.href || ''}
        onChange={(e) => handlePropertyChange('href', e.target.value)}
        placeholder="https://example.com"
        helper="URL to navigate to when clicked"
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="fullWidth"
          checked={properties.fullWidth || false}
          onChange={(e) => handlePropertyChange('fullWidth', e.target.checked)}
          className="rounded border-gray-300 dark:border-gray-600"
        />
        <label
          htmlFor="fullWidth"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Full Width
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="disabled"
          checked={properties.disabled || false}
          onChange={(e) => handlePropertyChange('disabled', e.target.checked)}
          className="rounded border-gray-300 dark:border-gray-600"
        />
        <label
          htmlFor="disabled"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Disabled
        </label>
      </div>
    </div>
  );

  const renderStyleProperties = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Margin Top"
          value={properties.marginTop || ''}
          onChange={(e) => handlePropertyChange('marginTop', e.target.value)}
          placeholder="0px"
        />
        <Input
          label="Margin Bottom"
          value={properties.marginBottom || ''}
          onChange={(e) => handlePropertyChange('marginBottom', e.target.value)}
          placeholder="0px"
        />
        <Input
          label="Margin Left"
          value={properties.marginLeft || ''}
          onChange={(e) => handlePropertyChange('marginLeft', e.target.value)}
          placeholder="0px"
        />
        <Input
          label="Margin Right"
          value={properties.marginRight || ''}
          onChange={(e) => handlePropertyChange('marginRight', e.target.value)}
          placeholder="0px"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Padding Top"
          value={properties.paddingTop || ''}
          onChange={(e) => handlePropertyChange('paddingTop', e.target.value)}
          placeholder="0px"
        />
        <Input
          label="Padding Bottom"
          value={properties.paddingBottom || ''}
          onChange={(e) =>
            handlePropertyChange('paddingBottom', e.target.value)
          }
          placeholder="0px"
        />
        <Input
          label="Padding Left"
          value={properties.paddingLeft || ''}
          onChange={(e) => handlePropertyChange('paddingLeft', e.target.value)}
          placeholder="0px"
        />
        <Input
          label="Padding Right"
          value={properties.paddingRight || ''}
          onChange={(e) => handlePropertyChange('paddingRight', e.target.value)}
          placeholder="0px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Text Alignment
        </label>
        <select
          value={properties.textAlign || 'center'}
          onChange={(e) => handlePropertyChange('textAlign', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <Input
        label="Custom CSS Classes"
        value={properties.customClasses || ''}
        onChange={(e) => handlePropertyChange('customClasses', e.target.value)}
        placeholder="additional-class another-class"
        helper="Space-separated CSS class names"
      />
    </div>
  );

  const renderAdvancedProperties = () => (
    <div className="space-y-4">
      <Input
        label="Component ID"
        value={properties.id || ''}
        onChange={(e) => handlePropertyChange('id', e.target.value)}
        placeholder="unique-id"
        helper="Unique identifier for this component"
      />

      <Input
        label="Data Attributes"
        value={properties.dataAttributes || ''}
        onChange={(e) => handlePropertyChange('dataAttributes', e.target.value)}
        placeholder="key=value,key2=value2"
        helper="Comma-separated key=value pairs"
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="hidden"
          checked={properties.hidden || false}
          onChange={(e) => handlePropertyChange('hidden', e.target.checked)}
          className="rounded border-gray-300 dark:border-gray-600"
        />
        <label
          htmlFor="hidden"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Hidden on Mobile
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="hiddenTablet"
          checked={properties.hiddenTablet || false}
          onChange={(e) =>
            handlePropertyChange('hiddenTablet', e.target.checked)
          }
          className="rounded border-gray-300 dark:border-gray-600"
        />
        <label
          htmlFor="hiddenTablet"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Hidden on Tablet
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="hiddenDesktop"
          checked={properties.hiddenDesktop || false}
          onChange={(e) =>
            handlePropertyChange('hiddenDesktop', e.target.checked)
          }
          className="rounded border-gray-300 dark:border-gray-600"
        />
        <label
          htmlFor="hiddenDesktop"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Hidden on Desktop
        </label>
      </div>
    </div>
  );

  const tabs = [
    { id: 'properties', label: 'Properties', icon: 'fas fa-cog' },
    { id: 'styles', label: 'Styles', icon: 'fas fa-paint-brush' },
    { id: 'advanced', label: 'Advanced', icon: 'fas fa-code' },
  ];

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Component Properties
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {component.type} - {component.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              )}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'properties' &&
          component.type === 'Button' &&
          renderButtonProperties()}
        {activeTab === 'styles' && renderStyleProperties()}
        {activeTab === 'advanced' && renderAdvancedProperties()}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
