'use client';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Iconify } from 'src/components/iconify';

// Types
export interface TableData {
  id: string;
  x: number;
  y: number;
}

export interface SimpleLineChartProps {
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

export function SimpleLineChart({
  id,
  width = 800,
  height = 500,
  title = "Biểu đồ đường"
}: SimpleLineChartProps) {
  const boardRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initial data
  const [tableData, setTableData] = useState<TableData[]>([
    { id: '1', x: 1, y: 2 },
    { id: '2', x: 2, y: 4 },
    { id: '3', x: 3, y: 3 },
    { id: '4', x: 4, y: 5 },
    { id: '5', x: 5, y: 6 }
  ]);

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

  // Initialize and update chart
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initChart = async () => {
      try {
        const JXG = await import('jsxgraph');
        
        if (boardRef.current) {
          JXG.JSXGraph.freeBoard(boardRef.current);
        }

        if (containerRef.current) {
          // Calculate bounds based on data
          let xMin = -1, xMax = 10, yMin = -1, yMax = 10;
          
          if (tableData.length > 0) {
            xMin = Math.min(...tableData.map(p => p.x)) - 1;
            xMax = Math.max(...tableData.map(p => p.x)) + 1;
            yMin = Math.min(...tableData.map(p => p.y)) - 1;
            yMax = Math.max(...tableData.map(p => p.y)) + 1;
          }

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
          boardRef.current.create('text', [xMin + (xMax - xMin) * 0.05, yMax - (yMax - yMin) * 0.1, title], {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#374151'
          });

          // Draw line chart if we have at least 2 points
          if (tableData.length > 1) {
            // Create line
            boardRef.current.create('curve', [
              tableData.map(p => p.x),
              tableData.map(p => p.y)
            ], {
              strokeColor: '#3b82f6',
              strokeWidth: 2,
              name: 'Line Chart'
            });

            // Create points
            tableData.forEach((point) => {
              boardRef.current.create('point', [point.x, point.y], {
                size: 3,
                color: '#3b82f6',
                name: `(${point.x}, ${point.y})`
              });
            });
          }
        }
      } catch (error) {
        console.error('Error initializing JSXGraph:', error);
      }
    };

    initChart();
  }, [tableData, id, title]);

  // Table functions
  const addRow = () => {
    const newId = String(Date.now());
    const newX = tableData.length > 0 ? Math.max(...tableData.map(d => d.x)) + 1 : 1;
    const newY = 0;
    
    setTableData([...tableData, { id: newId, x: newX, y: newY }]);
  };

  const removeRow = (id: string) => {
    setTableData(tableData.filter(row => row.id !== id));
  };

  const updateCell = (id: string, field: 'x' | 'y', value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setTableData(tableData.map(row => 
        row.id === id ? { ...row, [field]: numValue } : row
      ));
    }
  };

  const addColumn = () => {
    // For this simple version, we only support x and y columns
    // This function is kept for potential future expansion
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Data Table Section */}
      <Card sx={{ mb: 3 }}>
        <CardHeader 
          title="Bảng dữ liệu"
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              onClick={addRow}
            >
              Thêm hàng
            </Button>
          }
        />
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell align="center">X</TableCell>
                  <TableCell align="center">Y</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={row.x}
                        onChange={(e) => updateCell(row.id, 'x', e.target.value)}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={row.y}
                        onChange={(e) => updateCell(row.id, 'y', e.target.value)}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeRow(row.id)}
                        disabled={tableData.length <= 2}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card>
        <CardHeader title="Biểu đồ đường" />
        <CardContent>
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
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            💡 Mẹo: Sử dụng chuột để phóng to/thu nhỏ và kéo để di chuyển biểu đồ
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
