import { useState } from 'react';

export function useChartConfiguration() {
  // Chart configuration
  const [xAxisColumn, setXAxisColumn] = useState('x');
  const [yAxisColumns, setYAxisColumns] = useState<string[]>(['y']);

  // Toggle Y-axis column
  const toggleYAxisColumn = (columnField: string) => {
    if (yAxisColumns.includes(columnField)) {
      setYAxisColumns(yAxisColumns.filter((col) => col !== columnField));
    } else {
      setYAxisColumns([...yAxisColumns, columnField]);
    }
  };

  // Update chart configuration when columns are deleted
  const updateConfigurationAfterColumnDelete = (deletedField: string, numericColumns: any[]) => {
    if (xAxisColumn === deletedField) {
      if (numericColumns.length > 0) {
        setXAxisColumn(numericColumns[0].field);
      }
    }
    setYAxisColumns(yAxisColumns.filter((col) => col !== deletedField));
  };

  return {
    xAxisColumn,
    yAxisColumns,
    setXAxisColumn,
    setYAxisColumns,
    toggleYAxisColumn,
    updateConfigurationAfterColumnDelete,
  };
}
