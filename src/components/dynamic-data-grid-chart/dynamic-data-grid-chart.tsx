'use client';

import { useEffect } from 'react';
import { DataGridSection } from './components';
import { jsxGraphStyles } from './constants';
import { useDataGridState } from './hooks';
import type { DynamicDataGridChartProps } from './types';

export function DynamicDataGridChart({
  id,
  width = 800,
  height = 500,
  title = 'Biểu đồ từ dữ liệu động',
}: DynamicDataGridChartProps) {
  // State management hooks
  const {
    columns,
    rows,
    handleProcessRowUpdate,
    handleAddColumn,
    handleDeleteColumn,
    handleAddRow,
    handleDeleteRow,
    handleDeleteRows,
  } = useDataGridState();

  // Initialize JSXGraph styles
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.textContent = jsxGraphStyles;
      document.head.appendChild(styleElement);

      return () => {
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement);
        }
      };
    }
  }, []);

  // Handle chart viewing - log data for future chart rendering
  const handleViewChart = () => {
    console.log('=== CHART DATA PREPARATION ===');
    console.log('Chart ID:', id);
    console.log('Chart Title:', title);
    console.log('Chart Dimensions:', { width, height });
    console.log('Columns:', columns);
    console.log('Rows Data:', rows);
    
    // Filter numeric columns for chart axes
    const numericColumns = columns.filter((col) => col.type === 'number');
    console.log('Numeric Columns (Available for Chart Axes):', numericColumns);
    
    // Prepare data structure for chart rendering
    const chartData = {
      id,
      title,
      dimensions: { width, height },
      columns,
      rows,
      numericColumns,
      totalRows: rows.length,
      totalColumns: columns.length,
    };
    
    console.log('Chart Data Structure:', chartData);
    console.log('=== END CHART DATA ===');
  };

  return (
    <>
      {/* Data Grid Section */}
      <DataGridSection
        columns={columns}
        rows={rows}
        onProcessRowUpdate={handleProcessRowUpdate}
        onDeleteRow={handleDeleteRow}
        onDeleteRows={handleDeleteRows}
        onAddRow={handleAddRow}
        onViewChart={handleViewChart}
        onAddColumn={handleAddColumn}
      />
    </>
  );
}
