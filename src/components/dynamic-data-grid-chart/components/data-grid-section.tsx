import type { GridColDef } from '@mui/x-data-grid';

import { Button, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import { Iconify } from 'src/components/iconify';

import type { ChartDataRow, ColumnDefinition } from '../types';

interface DataGridSectionProps {
  columns: ColumnDefinition[];
  rows: ChartDataRow[];
  onProcessRowUpdate: (newRow: ChartDataRow) => ChartDataRow;
  onDeleteRow: (rowId: string) => void;
  onAddRow: () => void;
  onOpenControls: (event: React.MouseEvent<HTMLElement>) => void;
  onOpenChart: () => void;
}

export function DataGridSection({
  columns,
  rows,
  onProcessRowUpdate,
  onDeleteRow,
  onAddRow,
  onOpenControls,
  onOpenChart,
}: DataGridSectionProps) {
  // Generate DataGrid columns
  const gridColumns: GridColDef[] = [
    ...columns.map((col) => ({
      field: col.field,
      headerName: col.headerName,
      type: col.type,
      editable: col.editable,
      width: col.width || 150,
      hideable: false, // Prevent hiding columns
    })),
    // Spacer column to push actions to the right
    {
      field: 'spacer',
      headerName: '',
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      resizable: false,
      flex: 1,
      minWidth: 50,
      renderCell: () => null,
      renderHeader: () => null,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Thao tác',
      width: 100,
      sortable: false,
      filterable: false,
      hideable: false,
      headerAlign: 'right',
      align: 'right',
      getActions: (params: any) => [
        <GridActionsCellItem
          key="delete"
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Xóa"
          onClick={() => onDeleteRow(params.id)}
          color="error"
        />,
      ],
    },
  ];

  return (
    <Card
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 180px)',
        minHeight: 400,
        maxHeight: 'calc(100vh - 180px)',
        overflow: 'hidden',
        border: '1px solid rgba(224, 224, 224, 1)',
      }}
    >
      <CardHeader
        title="Bảng dữ liệu động"
        action={
          <Stack direction="row" spacing={1}>
            <Button
              onClick={onOpenControls}
              variant="text"
              color="primary"
              size="small"
              sx={{
                minWidth: 'auto',
                padding: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Iconify icon="solar:settings-bold" />
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:full-screen-square-outline" />}
              onClick={onOpenChart}
              size="small"
            >
              Xem biểu đồ
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              onClick={onAddRow}
              size="small"
            >
              Thêm hàng
            </Button>
          </Stack>
        }
      />
      <CardContent
        sx={{
          flex: 1,
          overflow: 'hidden',
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          height: '100%',
        }}
      >
        <DataGrid
          rows={rows}
          columns={gridColumns}
          processRowUpdate={onProcessRowUpdate}
          autoHeight={false}
          hideFooter={false}
          disableColumnFilter
          disableColumnMenu={false} // Enable column menu for renaming
          disableColumnSelector={false} // Allow column reordering
          disableDensitySelector
          rowHeight={52}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            columns: {
              columnVisibilityModel: {},
            },
          }}
          sx={{
            height: '100%',
            width: '100%',
            flex: 1,
            minHeight: 300,
            border: '1px solid rgba(224, 224, 224, 1)',
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-main': {
              overflow: 'hidden',
            },
            '& .MuiDataGrid-virtualScroller': {
              flex: 1,
              overflow: 'auto',
              minHeight: 0,
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderBottom: '2px solid rgba(224, 224, 224, 1)',
              minHeight: '52px !important',
              maxHeight: '52px !important',
            },
            '& .MuiDataGrid-columnHeader': {
              outline: 'none',
              '&:focus': {
                outline: 'none',
              },
              '&:focus-within': {
                outline: 'none',
              },
            },
            '& .MuiDataGrid-cell': {
              border: '1px solid rgba(224, 224, 224, 1)',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              '&:focus': {
                outline: 'none',
              },
              '&:focus-within': {
                outline: 'none',
              },
            },
            '& .MuiDataGrid-row': {
              minHeight: '52px !important',
              maxHeight: '52px !important',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
            '& .MuiDataGrid-footerContainer': {
              minHeight: '52px',
              borderTop: '1px solid rgba(224, 224, 224, 1)',
              backgroundColor: '#fff',
              flexShrink: 0,
            },
            // Style for actions column to keep it on the right
            '& .MuiDataGrid-columnHeader[data-field="actions"]': {
              position: 'sticky',
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              zIndex: 1,
              borderLeft: '2px solid rgba(224, 224, 224, 1)',
            },
            '& .MuiDataGrid-cell[data-field="actions"]': {
              position: 'sticky',
              right: 0,
              backgroundColor: '#fff',
              zIndex: 1,
              borderLeft: '2px solid rgba(224, 224, 224, 1)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
