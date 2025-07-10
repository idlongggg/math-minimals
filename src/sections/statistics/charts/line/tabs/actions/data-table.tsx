import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { DataGrid } from '@mui/x-data-grid';

import CustomColumnMenu from './custom-column-menu';

import type { CustomColumnMenuProps } from './custom-column-menu';

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  dataGridHeight: number;
  checkboxSelection?: boolean;
  rowSelectionModel?: GridRowSelectionModel;
  onRowSelectionModelChange?: (selection: GridRowSelectionModel) => void;
  onCellEditCommit?: (params: any) => void;
  columnMenuProps?: Partial<CustomColumnMenuProps>;
}

export default function DataTable({
  rows,
  columns,
  dataGridHeight,
  checkboxSelection = true,
  rowSelectionModel,
  onRowSelectionModelChange,
  onCellEditCommit,
  columnMenuProps = {},
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
        disableColumnFilter
        disableColumnSelector
        slotProps={{ columnMenu: columnMenuProps }}
        slots={{ columnMenu: CustomColumnMenu }}
        processRowUpdate={(newRow: any) => {
          if (onCellEditCommit) {
            onCellEditCommit({ id: newRow.id, ...newRow });
          }
          return newRow;
        }}
      />
    </div>
  );
}
