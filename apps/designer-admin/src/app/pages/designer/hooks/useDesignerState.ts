import { useState, useCallback } from 'react';
import { ComponentType, DEFAULT_COMPONENT_PROPS } from '@frontend/shared';

export interface DesignerComponent {
  id: string;
  type: ComponentType;
  name: string;
  props: Record<string, unknown>;
  styles: Record<string, unknown>;
  position: {
    row: number;
    column: number;
    span: number;
  };
  children?: DesignerComponent[];
}

export interface DesignerPage {
  id: number;
  name: string;
  title: string;
  slug: string;
  status: string;
  content: Record<string, unknown>;
  layout: Record<string, unknown>;
  settings: Record<string, unknown>;
  styles: Record<string, unknown>;
}

export const useDesignerState = () => {
  const [page, setPage] = useState<DesignerPage | null>(null);
  const [components, setComponents] = useState<DesignerComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [gridRows, setGridRows] = useState<number[]>([0]); // Track rows

  const generateId = () => {
    return `component_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const findAvailablePosition = (
    row: number
  ): { column: number; span: number } => {
    const rowComponents = components.filter((c) => c.position.row === row);

    if (rowComponents.length === 0) {
      return { column: 0, span: 12 };
    }

    // Sort by column position
    rowComponents.sort((a, b) => a.position.column - b.position.column);

    // Find available space
    let availableColumn = 0;
    for (const component of rowComponents) {
      if (component.position.column > availableColumn) {
        // There's space before this component
        const availableSpan = Math.min(
          12 - availableColumn,
          component.position.column - availableColumn
        );
        return { column: availableColumn, span: availableSpan };
      }
      availableColumn = component.position.column + component.position.span;
    }

    // Check if there's space after the last component
    if (availableColumn < 12) {
      return { column: availableColumn, span: 12 - availableColumn };
    }

    // No space in this row, use next row
    return { column: 0, span: 12 };
  };

  const addComponent = useCallback(
    (
      componentType: string,
      targetPosition?: { row: number; column: number }
    ): DesignerComponent => {
      const id = generateId();

      let position;
      if (targetPosition) {
        position = { ...targetPosition, span: 6 }; // Default span
      } else {
        // Find the best position
        const lastRow = Math.max(0, ...components.map((c) => c.position.row));
        const availablePos = findAvailablePosition(lastRow);

        if (
          availablePos.column === 0 &&
          components.some((c) => c.position.row === lastRow)
        ) {
          // Create new row
          position = { row: lastRow + 1, column: 0, span: 12 };
        } else {
          position = { row: lastRow, ...availablePos };
        }
      }

      const defaultProps =
        DEFAULT_COMPONENT_PROPS[
          componentType as keyof typeof DEFAULT_COMPONENT_PROPS
        ] || {};

      const newComponent: DesignerComponent = {
        id,
        type: componentType as ComponentType,
        name: `${componentType} ${components.length + 1}`,
        props: { ...defaultProps },
        styles: {},
        position,
      };

      setComponents((prev) => [...prev, newComponent]);
      return newComponent;
    },
    [components]
  );

  const updateComponent = useCallback(
    (id: string, updates: Partial<DesignerComponent>) => {
      setComponents((prev) =>
        prev.map((component) =>
          component.id === id ? { ...component, ...updates } : component
        )
      );
    },
    []
  );

  const deleteComponent = useCallback((id: string) => {
    setComponents((prev) => {
      const componentToDelete = prev.find((c) => c.id === id);
      if (!componentToDelete) return prev;

      const remainingComponents = prev.filter((c) => c.id !== id);

      // Rebalance the row
      const rowComponents = remainingComponents.filter(
        (c) => c.position.row === componentToDelete.position.row
      );

      if (rowComponents.length > 0) {
        // Redistribute space
        const totalSpan =
          rowComponents.reduce((sum, c) => sum + c.position.span, 0) +
          componentToDelete.position.span;
        const newSpan = Math.floor(totalSpan / rowComponents.length);

        rowComponents.forEach((component, index) => {
          component.position.column = index * newSpan;
          component.position.span = newSpan;
        });

        // Adjust last component to fill remaining space
        if (rowComponents.length > 0) {
          const lastComponent = rowComponents[rowComponents.length - 1];
          lastComponent.position.span = 12 - lastComponent.position.column;
        }
      }

      return remainingComponents;
    });
  }, []);

  const moveComponent = useCallback(
    (
      id: string,
      newPosition: { row: number; column: number; span: number }
    ) => {
      setComponents((prev) =>
        prev.map((component) =>
          component.id === id
            ? { ...component, position: newPosition }
            : component
        )
      );
    },
    []
  );

  const resizeComponent = useCallback((id: string, newSpan: number) => {
    setComponents((prev) => {
      const component = prev.find((c) => c.id === id);
      if (!component) return prev;

      const rowComponents = prev.filter(
        (c) => c.position.row === component.position.row && c.id !== id
      );

      // Check if resize is possible
      const maxColumn = component.position.column + newSpan;
      const hasConflict = rowComponents.some(
        (c) =>
          c.position.column < maxColumn &&
          c.position.column + c.position.span > component.position.column
      );

      if (hasConflict || maxColumn > 12) {
        return prev; // Can't resize
      }

      return prev.map((c) =>
        c.id === id ? { ...c, position: { ...c.position, span: newSpan } } : c
      );
    });
  }, []);

  const duplicateComponent = useCallback(
    (id: string) => {
      const component = components.find((c) => c.id === id);
      if (!component) return;

      const newComponent: DesignerComponent = {
        ...component,
        id: generateId(),
        name: `${component.name} Copy`,
        position: {
          ...component.position,
          row: component.position.row + 1,
          column: 0,
        },
      };

      setComponents((prev) => [...prev, newComponent]);
      return newComponent;
    },
    [components]
  );

  const getComponentsByRow = useCallback(() => {
    const rowMap = new Map<number, DesignerComponent[]>();

    components.forEach((component) => {
      const row = component.position.row;
      if (!rowMap.has(row)) {
        rowMap.set(row, []);
      }
      const rowComponents = rowMap.get(row);
      if (rowComponents) {
        rowComponents.push(component);
      }
    });

    // Sort components within each row by column
    rowMap.forEach((rowComponents) => {
      rowComponents.sort((a, b) => a.position.column - b.position.column);
    });

    return rowMap;
  }, [components]);

  const clearCanvas = useCallback(() => {
    setComponents([]);
    setSelectedComponent(null);
  }, []);

  return {
    page,
    setPage,
    components,
    setComponents,
    selectedComponent,
    setSelectedComponent,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    resizeComponent,
    duplicateComponent,
    getComponentsByRow,
    clearCanvas,
  };
};
