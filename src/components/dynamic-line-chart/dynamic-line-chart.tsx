'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Box,
  Card,
  Chip,
  Paper,
  Table,
  Button,
  Switch,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  TableContainer,
  FormControlLabel,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Types
export interface DataPoint {
  x: number;
  y: number;
}

export interface DataSeries {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  points: DataPoint[];
}

export interface DynamicLineChartProps {
  id: string;
  width?: number;
  height?: number;
  title?: string;
  initialSeries?: DataSeries[];
}

// Predefined colors for series
const SERIES_COLORS = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#84cc16',
  '#f97316',
  '#6366f1',
];

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

export function DynamicLineChart({
  id,
  width = 800,
  height = 500,
  title = 'Biểu đồ đường động',
  initialSeries = [],
}: DynamicLineChartProps) {
  const boardRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [series, setSeries] = useState<DataSeries[]>(
    initialSeries.length > 0
      ? initialSeries
      : [
          {
            id: '1',
            name: 'Dữ liệu 1',
            color: SERIES_COLORS[0],
            visible: true,
            points: [
              { x: 1, y: 2 },
              { x: 2, y: 4 },
              { x: 3, y: 3 },
              { x: 4, y: 5 },
              { x: 5, y: 6 },
            ],
          },
        ]
  );

  const [selectedSeriesId, setSelectedSeriesId] = useState<string>('1');
  const [newPointX, setNewPointX] = useState<string>('');
  const [newPointY, setNewPointY] = useState<string>('');
  const [editingPoint, setEditingPoint] = useState<{
    seriesId: string;
    index: number;
  } | null>(null);

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
          let xMin = -1,
            xMax = 10,
            yMin = -1,
            yMax = 10;

          if (series.length > 0) {
            const allPoints = series.flatMap((s) => s.points);
            if (allPoints.length > 0) {
              xMin = Math.min(...allPoints.map((p) => p.x)) - 1;
              xMax = Math.max(...allPoints.map((p) => p.x)) + 1;
              yMin = Math.min(...allPoints.map((p) => p.y)) - 1;
              yMax = Math.max(...allPoints.map((p) => p.y)) + 1;
            }
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
              needShift: false,
            },
            pan: {
              enabled: true,
              needShift: false,
            },
          });

          // Add title
          boardRef.current.create(
            'text',
            [xMin + (xMax - xMin) * 0.05, yMax - (yMax - yMin) * 0.1, title],
            {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#374151',
            }
          );

          // Draw series
          series.forEach((seriesData, index) => {
            if (seriesData.visible && seriesData.points.length > 1) {
              // Create line
              const curve = boardRef.current.create(
                'curve',
                [
                  seriesData.points.map((p) => p.x),
                  seriesData.points.map((p) => p.y),
                ],
                {
                  strokeColor: seriesData.color,
                  strokeWidth: 2,
                  name: seriesData.name,
                }
              );

              // Create points
              seriesData.points.forEach((point, pointIndex) => {
                boardRef.current.create('point', [point.x, point.y], {
                  size: 3,
                  color: seriesData.color,
                  name: `${seriesData.name} (${point.x}, ${point.y})`,
                });
              });

              // Add legend entry
              const legendY =
                yMax - (yMax - yMin) * 0.2 - index * (yMax - yMin) * 0.08;
              boardRef.current.create(
                'text',
                [xMin + (xMax - xMin) * 0.7, legendY, seriesData.name],
                {
                  fontSize: 12,
                  color: seriesData.color,
                }
              );
            }
          });

          // Add axis labels
          boardRef.current.create(
            'text',
            [xMax - (xMax - xMin) * 0.05, yMin + (yMax - yMin) * 0.05, 'x'],
            {
              fontSize: 14,
              color: '#6b7280',
            }
          );

          boardRef.current.create(
            'text',
            [xMin + (xMax - xMin) * 0.05, yMax - (yMax - yMin) * 0.15, 'y'],
            {
              fontSize: 14,
              color: '#6b7280',
            }
          );
        }
      } catch (error) {
        console.error('Error initializing JSXGraph:', error);
      }
    };

    initChart();

    return () => {
      if (boardRef.current) {
        try {
          const JXG = require('jsxgraph');
          JXG.JSXGraph.freeBoard(boardRef.current);
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, [id, series, title]);

  // Add new series
  const addSeries = () => {
    const newId = Date.now().toString();
    const newSeries: DataSeries = {
      id: newId,
      name: `Dữ liệu ${series.length + 1}`,
      color: SERIES_COLORS[series.length % SERIES_COLORS.length],
      visible: true,
      points: [],
    };
    setSeries([...series, newSeries]);
    setSelectedSeriesId(newId);
  };

  // Remove series
  const removeSeries = (seriesId: string) => {
    if (series.length <= 1) return;
    const newSeries = series.filter((s) => s.id !== seriesId);
    setSeries(newSeries);
    if (selectedSeriesId === seriesId) {
      setSelectedSeriesId(newSeries[0]?.id || '');
    }
  };

  // Toggle series visibility
  const toggleSeriesVisibility = (seriesId: string) => {
    setSeries(
      series.map((s) => (s.id === seriesId ? { ...s, visible: !s.visible } : s))
    );
  };

  // Update series name
  const updateSeriesName = (seriesId: string, name: string) => {
    setSeries(series.map((s) => (s.id === seriesId ? { ...s, name } : s)));
  };

  // Add point to series
  const addPoint = () => {
    const x = parseFloat(newPointX);
    const y = parseFloat(newPointY);

    if (isNaN(x) || isNaN(y)) return;

    setSeries(
      series.map((s) =>
        s.id === selectedSeriesId
          ? { ...s, points: [...s.points, { x, y }].sort((a, b) => a.x - b.x) }
          : s
      )
    );

    setNewPointX('');
    setNewPointY('');
  };

  // Remove point from series
  const removePoint = (seriesId: string, pointIndex: number) => {
    setSeries(
      series.map((s) =>
        s.id === seriesId
          ? { ...s, points: s.points.filter((_, i) => i !== pointIndex) }
          : s
      )
    );
  };

  // Update point in series
  const updatePoint = (
    seriesId: string,
    pointIndex: number,
    x: number,
    y: number
  ) => {
    setSeries(
      series.map((s) =>
        s.id === seriesId
          ? {
              ...s,
              points: s.points
                .map((p, i) => (i === pointIndex ? { x, y } : p))
                .sort((a, b) => a.x - b.x),
            }
          : s
      )
    );
    setEditingPoint(null);
  };

  // Clear all data
  const clearAllData = () => {
    setSeries(series.map((s) => ({ ...s, points: [] })));
  };

  const selectedSeries = series.find((s) => s.id === selectedSeriesId);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '1fr 400px' },
        gap: 3,
      }}
    >
      {/* Chart Area */}
      <Card>
        <CardHeader
          title={title}
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={clearAllData}
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              >
                Xóa tất cả
              </Button>
            </Box>
          }
        />
        <CardContent>
          <Box
            ref={containerRef}
            id={id}
            className="jxgbox"
            sx={{
              width: '100%',
              height: `${height}px`,
              border: '1px solid #e5e7eb',
              borderRadius: 1,
            }}
          />

          {/* Series Legend */}
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {series.map((s) => (
              <Chip
                key={s.id}
                label={s.name}
                sx={{
                  bgcolor: s.visible ? s.color + '20' : 'grey.100',
                  color: s.visible ? s.color : 'grey.500',
                  border: `1px solid ${s.visible ? s.color : 'grey.400'}`,
                }}
                size="small"
                onClick={() => toggleSeriesVisibility(s.id)}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Control Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Series Management */}
        <Card>
          <CardHeader
            title="Quản lý dữ liệu"
            action={
              <Button
                variant="contained"
                size="small"
                onClick={addSeries}
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Thêm chuỗi
              </Button>
            }
          />
          <CardContent>
            {/* Series Selector */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Chuỗi dữ liệu hiện tại:
              </Typography>
              {series.map((s) => (
                <Box
                  key={s.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    border: selectedSeriesId === s.id ? 2 : 1,
                    borderColor:
                      selectedSeriesId === s.id ? s.color : 'grey.300',
                    borderRadius: 1,
                    mb: 1,
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedSeriesId(s.id)}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: s.color,
                      borderRadius: '50%',
                    }}
                  />
                  <TextField
                    size="small"
                    value={s.name}
                    onChange={(e) => updateSeriesName(s.id, e.target.value)}
                    variant="standard"
                    sx={{ flex: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        checked={s.visible}
                        onChange={() => toggleSeriesVisibility(s.id)}
                      />
                    }
                    label=""
                    sx={{ ml: 0 }}
                  />
                  {series.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSeries(s.id);
                      }}
                      color="error"
                    >
                      <Iconify icon="mingcute:close-line" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Add Point */}
            <Typography variant="subtitle2" gutterBottom>
              Thêm điểm cho "{selectedSeries?.name}":
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                label="X"
                type="number"
                value={newPointX}
                onChange={(e) => setNewPointX(e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                size="small"
                label="Y"
                type="number"
                value={newPointY}
                onChange={(e) => setNewPointY(e.target.value)}
                sx={{ flex: 1 }}
              />
              <IconButton
                color="primary"
                onClick={addPoint}
                disabled={!newPointX || !newPointY}
              >
                <Iconify icon="mingcute:add-line" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader
            title={`Dữ liệu: ${selectedSeries?.name || ''}`}
            subheader={`${selectedSeries?.points.length || 0} điểm`}
          />
          <CardContent sx={{ p: 0 }}>
            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>X</TableCell>
                    <TableCell>Y</TableCell>
                    <TableCell width={80}>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(selectedSeries?.points || []).map((point, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {editingPoint?.seriesId === selectedSeriesId &&
                        editingPoint.index === index ? (
                          <TextField
                            size="small"
                            type="number"
                            defaultValue={point.x}
                            onBlur={(e) => {
                              const newX = parseFloat(e.target.value);
                              if (!isNaN(newX)) {
                                updatePoint(
                                  selectedSeriesId,
                                  index,
                                  newX,
                                  point.y
                                );
                              } else {
                                setEditingPoint(null);
                              }
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const newX = parseFloat(
                                  (e.target as HTMLInputElement).value
                                );
                                if (!isNaN(newX)) {
                                  updatePoint(
                                    selectedSeriesId,
                                    index,
                                    newX,
                                    point.y
                                  );
                                }
                              }
                            }}
                            autoFocus
                          />
                        ) : (
                          <span
                            onClick={() =>
                              setEditingPoint({
                                seriesId: selectedSeriesId,
                                index,
                              })
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            {point.x}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingPoint?.seriesId === selectedSeriesId &&
                        editingPoint.index === index ? (
                          <TextField
                            size="small"
                            type="number"
                            defaultValue={point.y}
                            onBlur={(e) => {
                              const newY = parseFloat(e.target.value);
                              if (!isNaN(newY)) {
                                updatePoint(
                                  selectedSeriesId,
                                  index,
                                  point.x,
                                  newY
                                );
                              } else {
                                setEditingPoint(null);
                              }
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const newY = parseFloat(
                                  (e.target as HTMLInputElement).value
                                );
                                if (!isNaN(newY)) {
                                  updatePoint(
                                    selectedSeriesId,
                                    index,
                                    point.x,
                                    newY
                                  );
                                }
                              }
                            }}
                          />
                        ) : (
                          <span
                            onClick={() =>
                              setEditingPoint({
                                seriesId: selectedSeriesId,
                                index,
                              })
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            {point.y}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removePoint(selectedSeriesId, index)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!selectedSeries?.points ||
                    selectedSeries.points.length === 0) && (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        align="center"
                        sx={{ color: 'text.secondary', py: 4 }}
                      >
                        Chưa có dữ liệu. Thêm điểm ở trên để bắt đầu.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
