// Types and interfaces for Dynamic Data Grid Chart
export interface ColumnDefinition {
  id: string;
  field: string;
  headerName: string;
  type: 'number' | 'string' | 'boolean';
  editable: boolean;
  width?: number;
}

export interface ChartDataRow {
  id: string;
  [key: string]: any;
}

export interface DynamicDataGridChartProps {
  id: string;
  width?: number;
  height?: number;
  title?: string;
}
