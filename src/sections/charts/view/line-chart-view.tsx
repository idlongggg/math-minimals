'use client';

import { Box, Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { LineChart } from 'src/components/line-chart';

// ----------------------------------------------------------------------

const sampleData = {
  trigonometric: [
    {
      name: "sin(x)",
      points: Array.from({ length: 100 }, (_, i) => {
        const x = (i - 50) * 0.2;
        return [x, Math.sin(x)] as [number, number];
      }),
      color: '#3b82f6'
    },
    {
      name: "cos(x)", 
      points: Array.from({ length: 100 }, (_, i) => {
        const x = (i - 50) * 0.2;
        return [x, Math.cos(x)] as [number, number];
      }),
      color: '#ef4444'
    }
  ],
  polynomial: [
    {
      name: "x²",
      points: Array.from({ length: 100 }, (_, i) => {
        const x = (i - 50) * 0.1;
        return [x, x * x] as [number, number];
      }),
      color: '#10b981'
    },
    {
      name: "x³",
      points: Array.from({ length: 100 }, (_, i) => {
        const x = (i - 50) * 0.1;
        return [x, x * x * x] as [number, number];
      }),
      color: '#f59e0b'
    }
  ],
  exponential: [
    {
      name: "e^x",
      points: Array.from({ length: 50 }, (_, i) => {
        const x = (i - 25) * 0.1;
        return [x, Math.exp(x)] as [number, number];
      }),
      color: '#8b5cf6'
    },
    {
      name: "ln(x)",
      points: Array.from({ length: 50 }, (_, i) => {
        const x = (i + 1) * 0.2;
        return [x, Math.log(x)] as [number, number];
      }),
      color: '#ec4899'
    }
  ]
};

export function LineChartView() {
  const [chartType, setChartType] = useState<keyof typeof sampleData | 'custom'>('trigonometric');
  const [customFunction, setCustomFunction] = useState('sin(x)');

  const generateCustomData = () => {
    try {
      const points: Array<[number, number]> = Array.from({ length: 100 }, (_, i) => {
        const x = (i - 50) * 0.2;
        // Simple function parser - for demo purposes
        let y = 0;
        const func = customFunction.toLowerCase();
        
        if (func.includes('sin')) y = Math.sin(x);
        else if (func.includes('cos')) y = Math.cos(x);
        else if (func.includes('tan')) y = Math.tan(x);
        else if (func.includes('x^2') || func.includes('x²')) y = x * x;
        else if (func.includes('x^3') || func.includes('x³')) y = x * x * x;
        else if (func.includes('exp') || func.includes('e^x')) y = Math.exp(x);
        else if (func.includes('ln') || func.includes('log')) y = x > 0 ? Math.log(x) : NaN;
        else y = x; // default to linear
        
        return [x, y] as [number, number];
      }).filter(([x, y]) => !isNaN(y));

      return [{
        name: customFunction,
        points,
        color: '#6366f1'
      }];
    } catch (error) {
      return sampleData.trigonometric;
    }
  };

  const currentData = chartType === 'custom' ? generateCustomData() : sampleData[chartType];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Biểu đồ đường với JSXGraph
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Trang này sử dụng thư viện JSXGraph để hiển thị các biểu đồ đường tương tác. 
        Bạn có thể zoom, pan và tương tác với biểu đồ.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        <Card>
            <CardHeader title="Điều khiển biểu đồ" />
            <CardContent>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Loại biểu đồ</InputLabel>
                <Select
                  value={chartType}
                  label="Loại biểu đồ"
                  onChange={(e) => setChartType(e.target.value as keyof typeof sampleData | 'custom')}
                >
                  <MenuItem value="trigonometric">Hàm lượng giác</MenuItem>
                  <MenuItem value="polynomial">Đa thức</MenuItem>
                  <MenuItem value="exponential">Hàm mũ & Logarit</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Hàm tùy chỉnh"
                value={customFunction}
                onChange={(e) => setCustomFunction(e.target.value)}
                placeholder="sin(x), cos(x), x^2, etc."
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                fullWidth
                onClick={() => setChartType('custom')}
              >
                Vẽ hàm tùy chỉnh
              </Button>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Hướng dẫn sử dụng:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Scroll để zoom in/out<br/>
                  • Kéo để di chuyển biểu đồ<br/>
                  • Sử dụng nút điều hướng ở góc trên phải
                </Typography>
              </Box>
            </CardContent>
          </Card>

        <Card>
            <CardHeader 
              title="Biểu đồ tương tác"
              subheader="Được tạo bằng JSXGraph"
            />
            <CardContent>
              <LineChart
                id="line-chart-demo"
                width={600}
                height={400}
                title={`Biểu đồ ${chartType === 'trigonometric' ? 'hàm lượng giác' : 
                  chartType === 'polynomial' ? 'đa thức' : 
                  chartType === 'exponential' ? 'hàm mũ' : 'tùy chỉnh'}`}
                data={currentData}
              />
            </CardContent>
          </Card>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Card>
            <CardHeader title="Các tính năng nâng cao" />
            <CardContent>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <LineChart
                    id="advanced-chart-1"
                    width={400}
                    height={300}
                    title="Đạo hàm hàm số"
                    data={[
                      {
                        name: "f(x) = x²",
                        points: Array.from({ length: 50 }, (_, i) => {
                          const x = (i - 25) * 0.2;
                          return [x, x * x] as [number, number];
                        }),
                        color: '#3b82f6'
                      },
                      {
                        name: "f'(x) = 2x",
                        points: Array.from({ length: 50 }, (_, i) => {
                          const x = (i - 25) * 0.2;
                          return [x, 2 * x] as [number, number];
                        }),
                        color: '#ef4444'
                      }
                    ]}
                  />
                
                <LineChart
                    id="advanced-chart-2"
                    width={400}
                    height={300}
                    title="Hàm composite"
                    data={[
                      {
                        name: "sin(x²)",
                        points: Array.from({ length: 100 }, (_, i) => {
                          const x = (i - 50) * 0.1;
                          return [x, Math.sin(x * x)] as [number, number];
                        }),
                        color: '#10b981'
                      },
                      {
                        name: "cos(x) + sin(2x)",
                        points: Array.from({ length: 100 }, (_, i) => {
                          const x = (i - 50) * 0.1;
                          return [x, Math.cos(x) + Math.sin(2 * x)] as [number, number];
                        }),
                        color: '#f59e0b'
                      }
                    ]}
                  />
              </Box>
            </CardContent>
          </Card>
      </Box>
    </Box>
  );
}
