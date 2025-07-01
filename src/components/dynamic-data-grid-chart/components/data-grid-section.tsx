import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';

import { Button, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { Iconify } from 'src/components/iconify';

import type { ChartDataRow, ColumnDefinition } from '../types';

interface DataGridSectionProps {
  columns: ColumnDefinition[];
  rows: ChartDataRow[];
  onProcessRowUpdate: (newRow: ChartDataRow) => ChartDataRow;
  onDeleteRow: (rowId: string) => void;
  onDeleteRows: (rowIds: string[]) => void;
  onAddRow: () => void;
  onOpenChart: () => void;
  onOpenAddColumn: () => void;
}

export function DataGridSection({
  columns,
  rows,
  onProcessRowUpdate,
  onDeleteRow,
  onDeleteRows,
  onAddRow,
  onOpenChart,
  onOpenAddColumn,
}: DataGridSectionProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>(
    []
  );

  // Handle row selection
  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectedRowIds(newSelection);
  };

  // Handle delete selected rows
  const handleDeleteSelected = () => {
    const rowIds = selectedRowIds.map(id => String(id));
    onDeleteRows(rowIds);
    setSelectedRowIds([]);
  };

  // Generate DataGrid columns
  const gridColumns: GridColDef[] = [
    // STT column
    {
      field: 'stt',
      headerName: 'STT',
      type: 'number',
      editable: false,
      width: 80,
      hideable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <strong style={{ fontWeight: 'bold' }}>
          {params.api.getRowIndexRelativeToVisibleRows(params.id) + 1}
        </strong>
      ),
      renderHeader: () => <strong style={{ fontWeight: 'bold' }}>STT</strong>,
    },
    ...columns.map((col) => ({
      field: col.field,
      headerName: col.headerName,
      type: col.type,
      editable: col.editable,
      width: col.width || 150,
      hideable: false, // Prevent hiding columns
    })),
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
              onClick={onOpenAddColumn}
              size="small"
            >
              Thêm cột
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              onClick={onAddRow}
              size="small"
            >
              Thêm hàng
            </Button>
            {selectedRowIds.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={handleDeleteSelected}
                size="small"
              >
                Xóa {selectedRowIds.length} hàng
              </Button>
            )}
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
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableColumnSorting
          checkboxSelection
          rowSelectionModel={selectedRowIds}
          onRowSelectionModelChange={handleSelectionChange}
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
          }}
        />
      </CardContent>
    </Card>
  );
}
