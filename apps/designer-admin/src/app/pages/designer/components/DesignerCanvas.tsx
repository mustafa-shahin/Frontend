import React, { useState } from 'react';
import { cn } from '@frontend/shared';
import { DesignerComponent } from '../hooks/useDesignerState';
import { DesignerButton } from './designer-components/DesignerButton';

interface DesignerCanvasProps {
  components: DesignerComponent[];
  selectedComponent: string | null;
  onComponentSelect: (componentId: string | null) => void;
  onComponentAdd: (
    componentType: string,
    position: { row: number; column: number }
  ) => void;
  onComponentDelete: (componentId: string) => void;
  onComponentMove: (
    componentId: string,
    newPosition: { row: number; column: number; span: number }
  ) => void;
}

export const DesignerCanvas: React.FC<DesignerCanvasProps> = ({
  components,
  selectedComponent,
  onComponentSelect,
  onComponentAdd,
  onComponentDelete,
  onComponentMove,
}) => {
  const [dragOverRow, setDragOverRow] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);

  // Group components by rows
  const getComponentsByRow = () => {
    const rowMap = new Map<number, DesignerComponent[]>();

    components.forEach((component) => {
      const row = component.position.row;
      if (!rowMap.has(row)) {
        rowMap.set(row, []);
      }
      rowMap.get(row)!.push(component);
    });

    // Sort components within each row by column
    rowMap.forEach((rowComponents) => {
      rowComponents.sort((a, b) => a.position.column - b.position.column);
    });

    return rowMap;
  };

  const handleDrop = (e: React.DragEvent, row: number, column: number) => {
    e.preventDefault();

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));

      if (data.type === 'component') {
        onComponentAdd(data.componentType, { row, column });
      }
    } catch (error) {
      console.error('Failed to parse drop data:', error);
    }

    setDragOverRow(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, row: number, column: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverRow(row);
    setDragOverColumn(column);
  };

  const handleDragLeave = () => {
    setDragOverRow(null);
    setDragOverColumn(null);
  };

  const renderComponent = (component: DesignerComponent) => {
    const isSelected = selectedComponent === component.id;

    const componentProps = {
      ...component.props,
      isDesignerMode: true,
      isSelected,
      onSelect: () => onComponentSelect(component.id),
      onDelete: () => onComponentDelete(component.id),
    };

    switch (component.type) {
      case 'Button':
        return <DesignerButton key={component.id} {...componentProps} />;
      default:
        return (
          <div
            key={component.id}
            className={cn(
              'min-h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-center cursor-pointer transition-all',
              isSelected &&
                'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            )}
            onClick={() => onComponentSelect(component.id)}
          >
            <div className="text-center">
              <i className="fas fa-cube text-2xl text-gray-400 dark:text-gray-500 mb-2"></i>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {component.type} Component
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Click to configure
              </p>
            </div>
          </div>
        );
    }
  };

  const renderDropZone = (row: number, column: number, span = 1) => {
    const isDragOver = dragOverRow === row && dragOverColumn === column;

    return (
      <div
        className={cn(
          'min-h-24 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg transition-all flex items-center justify-center',
          `col-span-${span}`,
          isDragOver &&
            'border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
        )}
        onDrop={(e) => handleDrop(e, row, column)}
        onDragOver={(e) => handleDragOver(e, row, column)}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center text-gray-400 dark:text-gray-500">
          <i className="fas fa-plus text-xl mb-2"></i>
          <p className="text-sm">Drop component here</p>
        </div>
      </div>
    );
  };

  const renderRow = (rowNumber: number, rowComponents: DesignerComponent[]) => {
    const gridCols = [];
    let currentColumn = 0;

    // Add components and fill gaps with drop zones
    rowComponents.forEach((component, index) => {
      // Add drop zone before component if there's a gap
      if (component.position.column > currentColumn) {
        const gapSpan = component.position.column - currentColumn;
        gridCols.push(
          <div
            key={`gap-${rowNumber}-${currentColumn}`}
            className={`col-span-${gapSpan}`}
          >
            {renderDropZone(rowNumber, currentColumn, gapSpan)}
          </div>
        );
      }

      // Add the component
      gridCols.push(
        <div
          key={component.id}
          className={cn(
            `col-span-${component.position.span}`,
            'relative group'
          )}
        >
          {renderComponent(component)}

          {/* Component overlay with controls */}
          {selectedComponent === component.id && (
            <div className="absolute inset-0 border-2 border-blue-500 dark:border-blue-400 rounded-lg pointer-events-none">
              <div className="absolute -top-8 left-0 bg-blue-500 dark:bg-blue-400 text-white text-xs px-2 py-1 rounded">
                {component.name}
              </div>
              <div className="absolute -top-8 right-0 flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onComponentDelete(component.id);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs pointer-events-auto"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      );

      currentColumn = component.position.column + component.position.span;
    });

    // Add drop zone at the end if there's remaining space
    if (currentColumn < 12) {
      const remainingSpan = 12 - currentColumn;
      gridCols.push(
        <div
          key={`end-${rowNumber}-${currentColumn}`}
          className={`col-span-${remainingSpan}`}
        >
          {renderDropZone(rowNumber, currentColumn, remainingSpan)}
        </div>
      );
    }

    return gridCols;
  };

  const componentsByRow = getComponentsByRow();
  const maxRow = Math.max(-1, ...Array.from(componentsByRow.keys()));
  const allRows = Array.from({ length: maxRow + 2 }, (_, i) => i);

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 p-8 overflow-auto">
      {/* Canvas Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Page Canvas
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drag components from the sidebar to build your page
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <i className="fas fa-info-circle"></i>
            <span>Grid: 12 columns</span>
          </div>
        </div>
      </div>

      {/* Grid System */}
      <div className="space-y-4">
        {allRows.map((rowNumber) => {
          const rowComponents = componentsByRow.get(rowNumber) || [];

          return (
            <div key={rowNumber} className="relative">
              {/* Row Label */}
              <div className="absolute -left-8 top-0 w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded text-xs flex items-center justify-center text-gray-500 dark:text-gray-400">
                {rowNumber + 1}
              </div>

              {/* Row Content */}
              <div className="grid grid-cols-12 gap-4 min-h-24">
                {rowComponents.length > 0 ? (
                  renderRow(rowNumber, rowComponents)
                ) : (
                  <div className="col-span-12">
                    {renderDropZone(rowNumber, 0, 12)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {components.length === 0 && (
        <div className="mt-12 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 border-2 border-dashed border-gray-200 dark:border-gray-700">
            <i className="fas fa-palette text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Start Building Your Page
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Drag components from the sidebar to begin designing your page
              layout.
            </p>
            <div className="text-sm text-gray-400 dark:text-gray-500">
              <p>• Use the 12-column grid system</p>
              <p>• Click components to configure their properties</p>
              <p>• Preview your changes at any time</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
