import { useCallback, useState } from 'react';

import type { ChartDataRow, ColumnDefinition } from '../types';

export function useDataGridState() {
  // State for columns and data - Thống kê tiêu thụ năng lượng gia đình theo từng khu vực
  const [columns, setColumns] = useState<ColumnDefinition[]>([
    {
      id: '1',
      field: 'year',
      headerName: 'Năm',
      type: 'number',
      editable: true,
      width: 80,
    },
    {
      id: '2',
      field: 'electricity',
      headerName: 'Điện (kWh)',
      type: 'number',
      editable: true,
      width: 110,
    },
    {
      id: '3',
      field: 'gas',
      headerName: 'Gas (m³)',
      type: 'number',
      editable: true,
      width: 100,
    },
    {
      id: '4',
      field: 'water',
      headerName: 'Nước (m³)',
      type: 'number',
      editable: true,
      width: 100,
    },
    {
      id: '5',
      field: 'heating',
      headerName: 'Sưởi ấm (kWh)',
      type: 'number',
      editable: true,
      width: 120,
    },
    {
      id: '6',
      field: 'cooling',
      headerName: 'Làm mát (kWh)',
      type: 'number',
      editable: true,
      width: 120,
    },
    {
      id: '7',
      field: 'lighting',
      headerName: 'Chiếu sáng (kWh)',
      type: 'number',
      editable: true,
      width: 130,
    },
    {
      id: '8',
      field: 'appliances',
      headerName: 'Thiết bị (kWh)',
      type: 'number',
      editable: true,
      width: 120,
    },
    {
      id: '9',
      field: 'renewable',
      headerName: 'Tái tạo (%)',
      type: 'number',
      editable: true,
      width: 110,
    },
    {
      id: '10',
      field: 'cost',
      headerName: 'Chi phí (USD)',
      type: 'number',
      editable: true,
      width: 120,
    },
  ]);

  const [rows, setRows] = useState<ChartDataRow[]>([
    {
      id: '1',
      year: 2016,
      electricity: 12500,
      gas: 850,
      water: 145,
      heating: 4200,
      cooling: 2800,
      lighting: 800,
      appliances: 3500,
      renewable: 15,
      cost: 2850,
      spacer: '',
    },
    {
      id: '2',
      year: 2017,
      electricity: 12800,
      gas: 820,
      water: 152,
      heating: 4350,
      cooling: 2950,
      lighting: 750,
      appliances: 3650,
      renewable: 18,
      cost: 2920,
      spacer: '',
    },
    {
      id: '3',
      year: 2018,
      electricity: 13200,
      gas: 780,
      water: 148,
      heating: 4100,
      cooling: 3200,
      lighting: 720,
      appliances: 3800,
      renewable: 22,
      cost: 3050,
      spacer: '',
    },
    {
      id: '4',
      year: 2019,
      electricity: 13800,
      gas: 750,
      water: 155,
      heating: 3950,
      cooling: 3450,
      lighting: 680,
      appliances: 4000,
      renewable: 26,
      cost: 3180,
      spacer: '',
    },
    {
      id: '5',
      year: 2020,
      electricity: 14500,
      gas: 720,
      water: 162,
      heating: 3800,
      cooling: 3700,
      lighting: 650,
      appliances: 4250,
      renewable: 31,
      cost: 3320,
      spacer: '',
    },
    {
      id: '6',
      year: 2021,
      electricity: 15100,
      gas: 690,
      water: 158,
      heating: 3650,
      cooling: 3950,
      lighting: 620,
      appliances: 4500,
      renewable: 35,
      cost: 3480,
      spacer: '',
    },
    {
      id: '7',
      year: 2022,
      electricity: 15800,
      gas: 650,
      water: 165,
      heating: 3500,
      cooling: 4200,
      lighting: 580,
      appliances: 4750,
      renewable: 40,
      cost: 3650,
      spacer: '',
    },
    {
      id: '8',
      year: 2023,
      electricity: 16200,
      gas: 620,
      water: 170,
      heating: 3350,
      cooling: 4400,
      lighting: 550,
      appliances: 4950,
      renewable: 45,
      cost: 3820,
      spacer: '',
    },
    {
      id: '9',
      year: 2024,
      electricity: 16800,
      gas: 580,
      water: 175,
      heating: 3200,
      cooling: 4650,
      lighting: 520,
      appliances: 5200,
      renewable: 50,
      cost: 4000,
      spacer: '',
    },
  ]);

  // Handle cell edit
  const handleProcessRowUpdate = useCallback((newRow: ChartDataRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? newRow : row))
    );
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
    const defaultValue =
      newColumnType === 'number' ? 0 : newColumnType === 'boolean' ? false : '';
    setRows(
      rows.map((row) => ({
        ...row,
        [newField]: defaultValue,
        spacer: row.spacer || '',
      }))
    );

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [columnToDelete.field]: _, ...rest } = row;
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

    // Add spacer field for layout
    newRow.spacer = '';

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

  // Delete multiple rows
  const handleDeleteRows = (rowIds: string[]) => {
    // Check if deleting all selected rows would leave no rows
    if (rowIds.length >= rows.length) {
      alert('Không thể xóa tất cả các hàng! Phải giữ lại ít nhất một hàng.');
      return false;
    }

    // Delete all selected rows at once
    setRows(rows.filter((row) => !rowIds.includes(row.id)));
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
    handleDeleteRows,
  };
}
