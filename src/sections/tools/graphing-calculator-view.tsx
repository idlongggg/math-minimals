'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface PlotPoint {
  x: number;
  y: number;
}

interface FunctionData {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
  points: PlotPoint[];
}

const COLORS = [
  '#1976d2', // blue
  '#d32f2f', // red
  '#388e3c', // green
  '#f57c00', // orange
  '#7b1fa2', // purple
  '#0288d1', // light blue
  '#c2185b', // pink
  '#5d4037', // brown
];

export function GraphingCalculatorView() {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [functions, setFunctions] = useState<FunctionData[]>([
    {
      id: '1',
      expression: 'x^2',
      color: COLORS[0],
      visible: true,
      points: [],
    },
  ]);
  const [selectedFunctionId, setSelectedFunctionId] = useState('1');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [gridVisible, setGridVisible] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Material Design card style
  const cardStyle = {
    p: 3,
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
  };

  // Parse and evaluate mathematical expression
  const evaluateExpression = useCallback(
    (expression: string, x: number): number => {
      try {
        // Replace mathematical functions and constants
        const expr = expression
          .replace(/\^/g, '**')
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log')
          .replace(/sqrt/g, 'Math.sqrt')
          .replace(/abs/g, 'Math.abs')
          .replace(/pi/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/x/g, x.toString());

        // Simple validation to prevent dangerous code execution
        if (!/^[0-9+\-*/().\s Math.sincotanlgqrbspiPIE]+$/.test(expr)) {
          throw new Error('Invalid expression');
        }

        const result = eval(expr);
        return typeof result === 'number' ? result : NaN;
      } catch {
        return NaN;
      }
    },
    []
  );

  // Generate points for a function
  const generatePoints = useCallback(
    (expression: string): PlotPoint[] => {
      const points: PlotPoint[] = [];
      const step = (xMax - xMin) / 1000; // 1000 points for smooth curve

      for (let x = xMin; x <= xMax; x += step) {
        const y = evaluateExpression(expression, x);
        if (!isNaN(y) && isFinite(y)) {
          points.push({ x, y });
        }
      }

      return points;
    },
    [xMin, xMax, evaluateExpression]
  );

  // Update function points when expression or range changes
  const updateFunctionPoints = useCallback(() => {
    setFunctions((prev) =>
      prev.map((func) => ({
        ...func,
        points: func.expression ? generatePoints(func.expression) : [],
      }))
    );
  }, [generatePoints]);

  // Draw the graph
  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate scaling factors
    const scaleX = width / (xMax - xMin);
    const scaleY = height / (yMax - yMin);

    // Transform coordinate system
    const transformX = (x: number) => (x - xMin) * scaleX;
    const transformY = (y: number) => height - (y - yMin) * scaleY;

    // Draw grid
    if (gridVisible) {
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 0.5;

      // Vertical grid lines
      const xStep = Math.pow(10, Math.floor(Math.log10((xMax - xMin) / 10)));
      for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
        const canvasX = transformX(x);
        ctx.beginPath();
        ctx.moveTo(canvasX, 0);
        ctx.lineTo(canvasX, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      const yStep = Math.pow(10, Math.floor(Math.log10((yMax - yMin) / 10)));
      for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
        const canvasY = transformY(y);
        ctx.beginPath();
        ctx.moveTo(0, canvasY);
        ctx.lineTo(width, canvasY);
        ctx.stroke();
      }
    }

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;

    // X-axis
    if (yMin <= 0 && yMax >= 0) {
      const axisY = transformY(0);
      ctx.beginPath();
      ctx.moveTo(0, axisY);
      ctx.lineTo(width, axisY);
      ctx.stroke();
    }

    // Y-axis
    if (xMin <= 0 && xMax >= 0) {
      const axisX = transformX(0);
      ctx.beginPath();
      ctx.moveTo(axisX, 0);
      ctx.lineTo(axisX, height);
      ctx.stroke();
    }

    // Draw functions
    functions.forEach((func) => {
      if (func.visible && func.points.length > 0) {
        ctx.strokeStyle = func.color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        let isFirstPoint = true;
        for (const point of func.points) {
          const canvasX = transformX(point.x);
          const canvasY = transformY(point.y);

          if (
            canvasX >= 0 &&
            canvasX <= width &&
            canvasY >= 0 &&
            canvasY <= height
          ) {
            if (isFirstPoint) {
              ctx.moveTo(canvasX, canvasY);
              isFirstPoint = false;
            } else {
              ctx.lineTo(canvasX, canvasY);
            }
          }
        }

        ctx.stroke();
      }
    });

    // Draw hovered point
    if (hoveredPoint) {
      const canvasX = transformX(hoveredPoint.x);
      const canvasY = transformY(hoveredPoint.y);

      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Draw coordinates
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.fillText(
        `(${hoveredPoint.x.toFixed(2)}, ${hoveredPoint.y.toFixed(2)})`,
        canvasX + 10,
        canvasY - 10
      );
    }
  }, [functions, xMin, xMax, yMin, yMax, gridVisible, hoveredPoint]);

  // Handle canvas mouse move for hover effect
  const handleCanvasMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const canvasX = event.clientX - rect.left;
      const canvasY = event.clientY - rect.top;

      // Transform back to mathematical coordinates
      const x = xMin + (canvasX / canvas.width) * (xMax - xMin);
      const y = yMax - (canvasY / canvas.height) * (yMax - yMin);

      setHoveredPoint({ x, y });
    },
    [xMin, xMax, yMin, yMax]
  );

  // Add new function
  const addFunction = useCallback(() => {
    const newId = (functions.length + 1).toString();
    const newFunction: FunctionData = {
      id: newId,
      expression: '',
      color: COLORS[functions.length % COLORS.length],
      visible: true,
      points: [],
    };

    setFunctions((prev) => [...prev, newFunction]);
    setSelectedFunctionId(newId);
  }, [functions.length]);

  // Remove function
  const removeFunction = useCallback(
    (id: string) => {
      setFunctions((prev) => prev.filter((func) => func.id !== id));
      if (selectedFunctionId === id && functions.length > 1) {
        const remainingFunction = functions.find((func) => func.id !== id);
        if (remainingFunction) {
          setSelectedFunctionId(remainingFunction.id);
        }
      }
    },
    [selectedFunctionId, functions]
  );

  // Update function expression
  const updateFunctionExpression = useCallback(
    (id: string, expression: string) => {
      setFunctions((prev) =>
        prev.map((func) => (func.id === id ? { ...func, expression } : func))
      );
      setError('');
    },
    []
  );

  // Toggle function visibility
  const toggleFunctionVisibility = useCallback((id: string) => {
    setFunctions((prev) =>
      prev.map((func) =>
        func.id === id ? { ...func, visible: !func.visible } : func
      )
    );
  }, []);

  // Reset view
  const resetView = useCallback(() => {
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
    setZoom(1);
  }, []);

  // Handle zoom
  const handleZoom = useCallback(
    (newZoom: number) => {
      setZoom(newZoom);
      const centerX = (xMin + xMax) / 2;
      const centerY = (yMin + yMax) / 2;
      const rangeX = 20 / newZoom;
      const rangeY = 20 / newZoom;

      setXMin(centerX - rangeX / 2);
      setXMax(centerX + rangeX / 2);
      setYMin(centerY - rangeY / 2);
      setYMax(centerY + rangeY / 2);
    },
    [xMin, xMax, yMin, yMax]
  );

  // Add to history
  const addToHistory = useCallback((expression: string) => {
    setHistory((prev) => [expression, ...prev.slice(0, 9)]);
  }, []);

  // Update points when functions or range changes
  useEffect(() => {
    updateFunctionPoints();
  }, [updateFunctionPoints]);

  // Redraw graph when anything changes
  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  const selectedFunction = functions.find(
    (func) => func.id === selectedFunctionId
  );

  return (
    <DashboardPageLayout
      title="Máy tính đồ thị"
      description="Vẽ và phân tích đồ thị của các hàm số toán học"
      maxWidth="xl"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 400px' },
          gap: 3,
        }}
      >
        {/* Graph Canvas */}
        <Card sx={cardStyle}>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Biểu đồ</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant={gridVisible ? 'contained' : 'outlined'}
                onClick={() => setGridVisible(!gridVisible)}
              >
                Lưới
              </Button>
              <Button size="small" variant="outlined" onClick={resetView}>
                Reset
              </Button>
            </Box>
          </Box>

          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{
              width: '100%',
              height: 'auto',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'crosshair',
            }}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setHoveredPoint(null)}
          />

          {/* Zoom Control */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Zoom: {zoom.toFixed(1)}x
            </Typography>
            <Slider
              value={zoom}
              onChange={(_, value) => handleZoom(value as number)}
              min={0.1}
              max={5}
              step={0.1}
              sx={{ width: 200 }}
            />
          </Box>
        </Card>

        {/* Control Panel */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Functions */}
          <Card sx={cardStyle}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6">Hàm số</Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={addFunction}
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Thêm
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {functions.map((func) => (
                <Box
                  key={func.id}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: func.color,
                        borderRadius: '50%',
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" sx={{ minWidth: 20 }}>
                      f{func.id}(x) =
                    </Typography>
                    <TextField
                      size="small"
                      value={func.expression}
                      onChange={(e) =>
                        updateFunctionExpression(func.id, e.target.value)
                      }
                      placeholder="x^2, sin(x), log(x), ..."
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => toggleFunctionVisibility(func.id)}
                      color={func.visible ? 'primary' : 'default'}
                    >
                      <Iconify
                        icon={
                          func.visible
                            ? 'solar:eye-bold'
                            : 'solar:eye-closed-bold'
                        }
                      />
                    </IconButton>
                    {functions.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => removeFunction(func.id)}
                        color="error"
                      >
                        <Iconify icon="mingcute:close-line" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Card>

          {/* View Range */}
          <Card sx={cardStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Phạm vi hiển thị
            </Typography>

            <Box
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
            >
              <TextField
                label="X min"
                type="number"
                value={xMin}
                onChange={(e) => setXMin(Number(e.target.value))}
                size="small"
              />
              <TextField
                label="X max"
                type="number"
                value={xMax}
                onChange={(e) => setXMax(Number(e.target.value))}
                size="small"
              />
              <TextField
                label="Y min"
                type="number"
                value={yMin}
                onChange={(e) => setYMin(Number(e.target.value))}
                size="small"
              />
              <TextField
                label="Y max"
                type="number"
                value={yMax}
                onChange={(e) => setYMax(Number(e.target.value))}
                size="small"
              />
            </Box>
          </Card>

          {/* Quick Functions */}
          <Card sx={cardStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Hàm nhanh
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                'x^2',
                'x^3',
                'sqrt(x)',
                'sin(x)',
                'cos(x)',
                'tan(x)',
                'log(x)',
                'ln(x)',
                '1/x',
                'abs(x)',
              ].map((expr) => (
                <Button
                  key={expr}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    if (selectedFunction) {
                      updateFunctionExpression(selectedFunction.id, expr);
                      addToHistory(expr);
                    }
                  }}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  y = {expr}
                </Button>
              ))}
            </Box>
          </Card>

          {/* History */}
          <Card sx={{ ...cardStyle, maxHeight: '300px', overflow: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Lịch sử
            </Typography>

            {history.length === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 2 }}
              >
                Chưa có hàm nào
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {history.map((expr, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1,
                      backgroundColor: 'grey.50',
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'grey.100',
                      },
                    }}
                    onClick={() => {
                      if (selectedFunction) {
                        updateFunctionExpression(selectedFunction.id, expr);
                      }
                    }}
                  >
                    y = {expr}
                  </Box>
                ))}
              </Box>
            )}

            {history.length > 0 && (
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 2, width: '100%' }}
                onClick={() => setHistory([])}
              >
                Xóa lịch sử
              </Button>
            )}
          </Card>

          {/* Instructions */}
          <Card sx={cardStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Hướng dẫn sử dụng
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <strong>Hàm số hỗ trợ:</strong>
              <br />
              • Cơ bản: +, -, *, /, ^
              <br />
              • Lượng giác: sin, cos, tan
              <br />
              • Logarit: log (log₁₀), ln (logₑ)
              <br />
              • Khác: sqrt, abs, pi, e
              <br />
              <br />
              <strong>Thao tác:</strong>
              <br />
              • Di chuột trên đồ thị để xem tọa độ
              <br />
              • Sử dụng zoom để phóng to/thu nhỏ
              <br />
              • Bật/tắt hiển thị lưới
              <br />• Thêm nhiều hàm để so sánh
            </Typography>
          </Card>
        </Box>
      </Box>
    </DashboardPageLayout>
  );
}
