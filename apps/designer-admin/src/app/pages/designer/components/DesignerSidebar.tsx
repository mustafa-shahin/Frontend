import React, { useState } from 'react';
import { cn, COMPONENT_LIBRARY } from '@frontend/shared';

interface DesignerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignerSidebar: React.FC<DesignerSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    ...new Set(COMPONENT_LIBRARY.map((comp) => comp.category)),
  ];

  const filteredComponents = COMPONENT_LIBRARY.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        type: 'component',
        componentType,
      })
    );
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-30 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Components
        </h2>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="flex flex-col h-full">
        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-full transition-colors',
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Components List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredComponents.map((component) => (
              <div
                key={component.type}
                draggable
                onDragStart={(e) => handleDragStart(e, component.type)}
                className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-move hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all bg-white dark:bg-gray-750"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <i
                        className={`${component.icon} text-blue-600 dark:text-blue-400`}
                      ></i>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {component.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {component.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <i className="fas fa-grip-vertical text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 dark:text-gray-500 mb-2">
                <i className="fas fa-search text-2xl"></i>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No components found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0">
              <i className="fas fa-info-circle text-blue-500 text-sm mt-0.5"></i>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-1">How to use:</p>
              <p>
                Drag components from here onto the canvas to add them to your
                page. Click on components to configure their properties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
