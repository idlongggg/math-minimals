export type LineChartTableColumn = {
  field: string;
  headerName: string;
  width?: number;
};

export type LineChartTableRow = {
  id: number;
  year: number;
  [key: string]: number | undefined;
};

export type LineChartTable = {
  title: string;
  columns: LineChartTableColumn[];
  rows: LineChartTableRow[];
};
