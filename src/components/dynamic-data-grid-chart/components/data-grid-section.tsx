import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Stack
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
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
    })),
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Thao tác',
      width: 100,
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
    <Card sx={{ 
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 180px)', // Cố định chiều cao theo viewport
      minHeight: 400,
      maxHeight: 'calc(100vh - 180px)',
      overflow: 'hidden', // Paper không scroll
    }}>
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
                }
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
      <CardContent sx={{ 
        flex: 1,
        overflow: 'hidden',
        p: 1, // Giảm padding để tối ưu không gian
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        height: '100%', // Đảm bảo content fill toàn bộ space còn lại
      }}>
        <DataGrid
          rows={rows}
          columns={gridColumns}
          processRowUpdate={onProcessRowUpdate}
          autoHeight={false}
          hideFooter={true}
          sx={{
            height: '100%',
            width: '100%',
            flex: 1,
            minHeight: 300,
            border: 'none',
            '& .MuiDataGrid-main': {
              overflow: 'hidden',
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'auto !important',
              height: '100% !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderBottom: '2px solid rgba(224, 224, 224, 1)',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            },
            '& .MuiDataGrid-cell': {
              border: '1px solid rgba(224, 224, 224, 1)',
            },
            '& .MuiDataGrid-scrollArea': {
              overflow: 'auto',
            },
            // Đảm bảo scroll chỉ ảnh hưởng đến nội dung data, không phải header
            '& .MuiDataGrid-container--top [role=row]': {
              position: 'sticky',
              top: 0,
              zIndex: 1,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
