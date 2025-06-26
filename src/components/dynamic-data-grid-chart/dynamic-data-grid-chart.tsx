'use client';

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Iconify } from 'src/components/iconify';

// Types
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

// JSXGraph styles
const jsxGraphStyles = `
  .jxgbox {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .JXGtext {
    font-family: inherit;
  }
  
  .JXGboard {
    overflow: hidden;
  }
`;

export function DynamicDataGridChart({
  id,
  width = 800,
  height = 500,
  title = "Biểu đồ từ dữ liệu động"
}: DynamicDataGridChartProps) {
  const boardRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for columns and data
  const [columns, setColumns] = useState<ColumnDefinition[]>([
    { id: '1', field: 'x', headerName: 'X', type: 'number', editable: true, width: 100 },
    { id: '2', field: 'y', headerName: 'Y', type: 'number', editable: true, width: 100 },
  ]);
  
  const [rows, setRows] = useState<ChartDataRow[]>([
    { id: '1', x: 1, y: 2 },
    { id: '2', x: 2, y: 4 },
    { id: '3', x: 3, y: 3 },
    { id: '4', x: 4, y: 5 },
    { id: '5', x: 5, y: 6 }
  ]);

  // Dialog states
  const [addColumnDialog, setAddColumnDialog] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'number' | 'string' | 'boolean'>('number');

  // Chart configuration
  const [xAxisColumn, setXAxisColumn] = useState('x');
  const [yAxisColumns, setYAxisColumns] = useState<string[]>(['y']);

  // Initialize JSXGraph styles
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.textContent = jsxGraphStyles;
      document.head.appendChild(styleElement);
      
      return () => {
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement);
        }
      };
    }
  }, []);

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
          onClick={() => handleDeleteRow(params.id)}
          color="error"
        />,
      ],
    },
  ];

  // Handle cell edit
  const handleProcessRowUpdate = useCallback((newRow: ChartDataRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? newRow : row))
    );
    return newRow;
  }, []);

  // Add new column
  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;
    
    const newId = String(Date.now());
    const newField = newColumnName.toLowerCase().replace(/\s+/g, '_');
    
    // Check if field already exists
    if (columns.some(col => col.field === newField)) {
      alert('Tên cột đã tồn tại!');
      return;
    }

    const newColumn: ColumnDefinition = {
      id: newId,
      field: newField,
      headerName: newColumnName,
      type: newColumnType,
      editable: true,
      width: 120,
    };

    setColumns([...columns, newColumn]);
    
    // Add default values to existing rows
    const defaultValue = newColumnType === 'number' ? 0 : newColumnType === 'boolean' ? false : '';
    setRows(rows.map(row => ({ ...row, [newField]: defaultValue })));
    
    // Reset dialog
    setNewColumnName('');
    setNewColumnType('number');
    setAddColumnDialog(false);
  };

  // Delete column
  const handleDeleteColumn = (columnId: string) => {
    const columnToDelete = columns.find(col => col.id === columnId);
    if (!columnToDelete) return;

    // Don't allow deleting if it's the last column
    if (columns.length <= 1) {
      alert('Không thể xóa cột cuối cùng!');
      return;
    }

    // Remove from columns
    setColumns(columns.filter(col => col.id !== columnId));
    
    // Remove field from all rows
    setRows(rows.map(row => {
      const { [columnToDelete.field]: removed, ...rest } = row;
      return rest as ChartDataRow;
    }));

    // Update chart configuration if necessary
    if (xAxisColumn === columnToDelete.field) {
      const remainingNumericColumns = columns.filter(col => 
        col.id !== columnId && col.type === 'number'
      );
      if (remainingNumericColumns.length > 0) {
        setXAxisColumn(remainingNumericColumns[0].field);
      }
    }

    setYAxisColumns(yAxisColumns.filter(col => col !== columnToDelete.field));
  };

  // Add new row
  const handleAddRow = () => {
    const newId = String(Date.now());
    const newRow: ChartDataRow = { id: newId };
    
    // Add default values for each column
    columns.forEach(col => {
      if (col.type === 'number') {
        newRow[col.field] = 0;
      } else if (col.type === 'boolean') {
        newRow[col.field] = false;
      } else {
        newRow[col.field] = '';
      }
    });

    setRows([...rows, newRow]);
  };

  // Delete row
  const handleDeleteRow = (rowId: string) => {
    if (rows.length <= 1) {
      alert('Không thể xóa hàng cuối cùng!');
      return;
    }
    setRows(rows.filter(row => row.id !== rowId));
  };

  // Toggle Y-axis column
  const toggleYAxisColumn = (columnField: string) => {
    if (yAxisColumns.includes(columnField)) {
      setYAxisColumns(yAxisColumns.filter(col => col !== columnField));
    } else {
      setYAxisColumns([...yAxisColumns, columnField]);
    }
  };

  // Initialize and update chart
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initChart = async () => {
      try {
        const JXG = await import('jsxgraph');
        
        if (boardRef.current) {
          JXG.JSXGraph.freeBoard(boardRef.current);
        }

        if (containerRef.current && rows.length > 0) {
          // Get numeric columns only
          const numericColumns = columns.filter(col => col.type === 'number');
          const validXColumn = numericColumns.find(col => col.field === xAxisColumn);
          const validYColumns = yAxisColumns.filter(col => 
            numericColumns.some(numCol => numCol.field === col)
          );

          if (!validXColumn || validYColumns.length === 0) return;

          // Get data for chart
          const validRows = rows.filter(row => 
            typeof row[xAxisColumn] === 'number' && 
            validYColumns.some(yCol => typeof row[yCol] === 'number')
          );

          if (validRows.length === 0) return;

          // Calculate bounds
          const xValues = validRows.map(row => row[xAxisColumn] as number);
          const allYValues = validYColumns.flatMap(yCol => 
            validRows.map(row => row[yCol] as number)
          );

          const xMin = Math.min(...xValues) - 1;
          const xMax = Math.max(...xValues) + 1;
          const yMin = Math.min(...allYValues) - 1;
          const yMax = Math.max(...allYValues) + 1;

          // Initialize board
          boardRef.current = JXG.JSXGraph.initBoard(id, {
            boundingbox: [xMin, yMax, xMax, yMin],
            axis: true,
            grid: true,
            showCopyright: false,
            showNavigation: true,
            zoom: {
              factorX: 1.25,
              factorY: 1.25,
              wheel: true,
              needShift: false
            },
            pan: {
              enabled: true,
              needShift: false
            }
          });

          // Add title
          boardRef.current.create('text', [
            xMin + (xMax - xMin) * 0.05, 
            yMax - (yMax - yMin) * 0.1, 
            title
          ], {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#374151'
          });

          // Colors for different Y series
          const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

          // Draw lines for each Y column
          validYColumns.forEach((yColumn, index) => {
            const color = colors[index % colors.length];
            const validRowsForColumn = validRows.filter(row => 
              typeof row[yColumn] === 'number'
            );

            if (validRowsForColumn.length > 1) {
              // Create line
              boardRef.current.create('curve', [
                validRowsForColumn.map(row => row[xAxisColumn] as number),
                validRowsForColumn.map(row => row[yColumn] as number)
              ], {
                strokeColor: color,
                strokeWidth: 2,
                name: `${yColumn} Line`
              });

              // Create points
              validRowsForColumn.forEach((row) => {
                boardRef.current.create('point', [
                  row[xAxisColumn] as number, 
                  row[yColumn] as number
                ], {
                  size: 3,
                  color: color,
                  name: `${yColumn}: (${row[xAxisColumn]}, ${row[yColumn]})`
                });
              });
            }
          });
        }
      } catch (error) {
        console.error('Error initializing JSXGraph:', error);
      }
    };

    initChart();
  }, [rows, columns, xAxisColumn, yAxisColumns, id, title]);

  const numericColumns = columns.filter(col => col.type === 'number');

  return (
    <>
      {/* Controls Panel */}
      <Box>
        <Card>
          <CardHeader 
            title="Điều khiển biểu đồ"
            action={
              <Button
                variant="contained"
                startIcon={<Iconify icon="solar:add-circle-bold" />}
                onClick={() => setAddColumnDialog(true)}
                size="small"
              >
                Thêm cột
              </Button>
            }
          />
          <CardContent>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Cột hiện có:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {columns.map((col) => (
                    <Chip
                      key={col.id}
                      label={`${col.headerName} (${col.type})`}
                      onDelete={columns.length > 1 ? () => handleDeleteColumn(col.id) : undefined}
                      color={col.type === 'number' ? 'primary' : 'default'}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Stack>
              </Box>

              {numericColumns.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Cấu hình biểu đồ:
                  </Typography>
                  <Stack spacing={2}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Trục X</InputLabel>
                      <Select
                        value={xAxisColumn}
                        label="Trục X"
                        onChange={(e) => setXAxisColumn(e.target.value)}
                      >
                        {numericColumns.map((col) => (
                          <MenuItem key={col.field} value={col.field}>
                            {col.headerName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Trục Y (có thể chọn nhiều):
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {numericColumns.map((col) => (
                          <Chip
                            key={col.field}
                            label={col.headerName}
                            onClick={() => toggleYAxisColumn(col.field)}
                            color={yAxisColumns.includes(col.field) ? 'primary' : 'default'}
                            variant={yAxisColumns.includes(col.field) ? 'filled' : 'outlined'}
                            size="small"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              )}

              <Box>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:add-circle-bold" />}
                  onClick={handleAddRow}
                  size="small"
                  fullWidth
                >
                  Thêm hàng dữ liệu
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Main Content Area */}
      <Box>
        {/* Data Grid Section */}
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Bảng dữ liệu động" />
          <CardContent>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={gridColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              processRowUpdate={handleProcessRowUpdate}
              sx={{
                '& .MuiDataGrid-cell': {
                  border: '1px solid rgba(224, 224, 224, 1)',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderBottom: '2px solid rgba(224, 224, 224, 1)',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card>
        <CardHeader title="Biểu đồ đường động" />
        <CardContent>
          {yAxisColumns.length === 0 ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Vui lòng chọn ít nhất một cột cho trục Y để hiển thị biểu đồ.
            </Alert>
          ) : (
            <Box
              ref={containerRef}
              sx={{
                width: '100%',
                height: height,
                minHeight: 400,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper',
              }}
            >
              <div id={id} style={{ width: '100%', height: '100%' }} />
            </Box>
          )}
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            💡 Mẹo: Sử dụng chuột để phóng to/thu nhỏ và kéo để di chuyển biểu đồ. 
            Bạn có thể thêm cột mới và chọn nhiều cột cho trục Y để so sánh dữ liệu.
          </Typography>
        </CardContent>
      </Card>
      </Box>

      {/* Add Column Dialog */}
      <Dialog open={addColumnDialog} onClose={() => setAddColumnDialog(false)}>
        <DialogTitle>Thêm cột mới</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="Tên cột"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              fullWidth
              autoFocus
            />
            <FormControl fullWidth>
              <InputLabel>Loại dữ liệu</InputLabel>
              <Select
                value={newColumnType}
                label="Loại dữ liệu"
                onChange={(e) => setNewColumnType(e.target.value as any)}
              >
                <MenuItem value="number">Số</MenuItem>
                <MenuItem value="string">Văn bản</MenuItem>
                <MenuItem value="boolean">True/False</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddColumnDialog(false)}>Hủy</Button>
          <Button onClick={handleAddColumn} variant="contained">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
