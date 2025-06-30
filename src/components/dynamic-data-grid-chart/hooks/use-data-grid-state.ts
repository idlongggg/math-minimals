import { useState, useCallback } from 'react';

import type { ChartDataRow, ColumnDefinition } from '../types';

export function useDataGridState() {
  // State for columns and data
  const [columns, setColumns] = useState<ColumnDefinition[]>([
    { id: '1', field: 'x', headerName: 'X', type: 'number', editable: true, width: 100 },
    { id: '2', field: 'y', headerName: 'Y', type: 'number', editable: true, width: 100 },
  ]);

  const [rows, setRows] = useState<ChartDataRow[]>([
    { id: '1', x: 1, y: 2 },
    { id: '2', x: 2, y: 4 },
    { id: '3', x: 3, y: 3 },
    { id: '4', x: 4, y: 5 },
    { id: '5', x: 5, y: 6 },
  ]);

  // Handle cell edit
  const handleProcessRowUpdate = useCallback((newRow: ChartDataRow) => {
    setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  }, []);

  // Add new column
  const handleAddColumn = (
    newColumnName: string,
    newColumnType: 'number' | 'string' | 'boolean'
  ) => {
    if (!newColumnName.trim()) return false;

    const newId = String(Date.now());
    const newField = newColumnName.toLowerCase().replace(/\s+/g, '_');

    // Check if field already exists
    if (columns.some((col) => col.field === newField)) {
      alert('Tên cột đã tồn tại!');
      return false;
    }

    const newColumn: ColumnDefinition = {
      id: newId,
      field: newField,
      headerName: newColumnName,
      type: newColumnType,
      editable: true,
      width: 120,
    };

    setColumns([...columns, newColumn]);

    // Add default values to existing rows
    const defaultValue = newColumnType === 'number' ? 0 : newColumnType === 'boolean' ? false : '';
    setRows(rows.map((row) => ({ ...row, [newField]: defaultValue })));

    return true;
  };

  // Delete column
  const handleDeleteColumn = (columnId: string) => {
    const columnToDelete = columns.find((col) => col.id === columnId);
    if (!columnToDelete) return false;

    // Don't allow deleting if it's the last column
    if (columns.length <= 1) {
      alert('Không thể xóa cột cuối cùng!');
      return false;
    }

    // Remove from columns
    setColumns(columns.filter((col) => col.id !== columnId));

    // Remove field from all rows
    setRows(
      rows.map((row) => {
        const { [columnToDelete.field]: removed, ...rest } = row;
        return rest as ChartDataRow;
      })
    );

    return { success: true, deletedField: columnToDelete.field };
  };

  // Add new row
  const handleAddRow = () => {
    const newId = String(Date.now());
    const newRow: ChartDataRow = { id: newId };

    // Add default values for each column
    columns.forEach((col) => {
      if (col.type === 'number') {
        newRow[col.field] = 0;
      } else if (col.type === 'boolean') {
        newRow[col.field] = false;
      } else {
        newRow[col.field] = '';
      }
    });

    setRows([...rows, newRow]);
  };

  // Delete row
  const handleDeleteRow = (rowId: string) => {
    if (rows.length <= 1) {
      alert('Không thể xóa hàng cuối cùng!');
      return false;
    }
    setRows(rows.filter((row) => row.id !== rowId));
    return true;
  };

  return {
    columns,
    rows,
    handleProcessRowUpdate,
    handleAddColumn,
    handleDeleteColumn,
    handleAddRow,
    handleDeleteRow,
  };
}
