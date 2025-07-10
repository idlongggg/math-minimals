export type ElectionColumn = {
  field: string;
  headerName: string;
  width?: number;
};

export type ElectionRow = {
  id: number;
  year: number;
  [party: string]: number | string;
};

export type ElectionTable = {
  title: string;
  columns: ElectionColumn[];
  rows: ElectionRow[];
};
