'use client';

import { useEffect, useState } from 'react';

import { AddColumnDialog, ChartDialog, DataGridSection } from './components';
import { jsxGraphStyles } from './constants';
import { useChartConfiguration, useDataGridState, useJSXGraph } from './hooks';

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
  } = useDataGridState();

  const {
    xAxisColumn,
    yAxisColumns,
    setXAxisColumn,
    toggleYAxisColumn,
    updateConfigurationAfterColumnDelete,
  } = useChartConfiguration();

  // JSXGraph hook
  const { containerRef } = useJSXGraph({
    id,
    title,
    rows,
    columns,
    xAxisColumn,
    yAxisColumns,
  });

  // Dialog states
  const [addColumnDialog, setAddColumnDialog] = useState(false);
  const [chartDialog, setChartDialog] = useState(false);

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

  // Handle column deletion with configuration update
  const handleDeleteColumnWithUpdate = (columnId: string) => {
    const result = handleDeleteColumn(columnId);
    if (result && typeof result === 'object' && result.success) {
      const numericColumns = columns.filter(
        (col) => col.id !== columnId && col.type === 'number'
      );
      updateConfigurationAfterColumnDelete(result.deletedField, numericColumns);
    }
  };

  const numericColumns = columns.filter((col) => col.type === 'number');

  return (
    <>
      {/* Data Grid Section */}
      <DataGridSection
        columns={columns}
        rows={rows}
        onProcessRowUpdate={handleProcessRowUpdate}
        onDeleteRow={handleDeleteRow}
        onAddRow={handleAddRow}
        onOpenChart={() => setChartDialog(true)}
        onOpenAddColumn={() => setAddColumnDialog(true)}
      />

      {/* Chart Dialog */}
      <ChartDialog
        open={chartDialog}
        onClose={() => setChartDialog(false)}
        title={title}
        chartId={id}
        containerRef={containerRef}
        columns={columns}
        numericColumns={numericColumns}
        xAxisColumn={xAxisColumn}
        yAxisColumns={yAxisColumns}
        onDeleteColumn={handleDeleteColumnWithUpdate}
        onSetXAxisColumn={setXAxisColumn}
        onToggleYAxisColumn={toggleYAxisColumn}
      />

      {/* Add Column Dialog */}
      <AddColumnDialog
        open={addColumnDialog}
        onClose={() => setAddColumnDialog(false)}
        onAddColumn={handleAddColumn}
      />
    </>
  );
}
