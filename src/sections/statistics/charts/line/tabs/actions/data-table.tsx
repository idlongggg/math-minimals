import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { DataGrid } from '@mui/x-data-grid';

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  dataGridHeight: number;
  checkboxSelection?: boolean;
  rowSelectionModel?: GridRowSelectionModel;
  onRowSelectionModelChange?: (selection: GridRowSelectionModel) => void;
  onCellEditCommit?: (params: any) => void;
}

export default function DataTable({
  rows,
  columns,
  dataGridHeight,
  checkboxSelection = true,
  rowSelectionModel,
  onRowSelectionModelChange,
  onCellEditCommit,
}: DataTableProps) {
  return (
    <div style={{ height: dataGridHeight, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooterPagination
        checkboxSelection={checkboxSelection}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={onRowSelectionModelChange}
        disableRowSelectionOnClick
        processRowUpdate={(newRow: any) => {
          if (onCellEditCommit) {
            onCellEditCommit({ id: newRow.id, ...newRow });
          }
          return newRow;
        }}
        // experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}
