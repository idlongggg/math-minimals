import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { DataGrid } from '@mui/x-data-grid';

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  dataGridHeight: number;
  getColumnsWithMenu: () => GridColDef[];
  checkboxSelection?: boolean;
  rowSelectionModel?: GridRowSelectionModel;
  onRowSelectionModelChange?: (selection: GridRowSelectionModel) => void;
}

export default function DataTable({
  rows,
  columns,
  dataGridHeight,
  getColumnsWithMenu,
  checkboxSelection = true,
  rowSelectionModel,
  onRowSelectionModelChange,
}: DataTableProps) {
  return (
    <div style={{ height: dataGridHeight, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={getColumnsWithMenu()}
        hideFooterPagination
        checkboxSelection={checkboxSelection}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={onRowSelectionModelChange}
      />
    </div>
  );
}
