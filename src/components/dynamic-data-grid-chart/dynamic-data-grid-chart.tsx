'use client';

import { useState, useEffect } from 'react';

import { jsxGraphStyles } from './constants';
import { useJSXGraph, useDataGridState, useChartConfiguration } from './hooks';
import { ChartDialog, AddColumnDialog, ControlsPopover, DataGridSection } from './components';

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
  const [controlsPopover, setControlsPopover] = useState<HTMLElement | null>(null);
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
      const numericColumns = columns.filter((col) => col.id !== columnId && col.type === 'number');
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
        onOpenControls={(event) => setControlsPopover(event.currentTarget)}
        onOpenChart={() => setChartDialog(true)}
      />

      {/* Chart Dialog */}
      <ChartDialog
        open={chartDialog}
        onClose={() => setChartDialog(false)}
        title={title}
        chartId={id}
        containerRef={containerRef}
        yAxisColumns={yAxisColumns}
      />

      {/* Controls Popover */}
      <ControlsPopover
        open={!!controlsPopover}
        anchorEl={controlsPopover}
        onClose={() => setControlsPopover(null)}
        columns={columns}
        numericColumns={numericColumns}
        xAxisColumn={xAxisColumn}
        yAxisColumns={yAxisColumns}
        onDeleteColumn={handleDeleteColumnWithUpdate}
        onSetXAxisColumn={setXAxisColumn}
        onToggleYAxisColumn={toggleYAxisColumn}
        onOpenAddColumnDialog={() => setAddColumnDialog(true)}
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
