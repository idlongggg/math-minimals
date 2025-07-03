'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const QUICK_EXAMPLES = [
  { dividend: 17, divisor: 5, description: 'Chia đơn giản' },
  { dividend: 100, divisor: 7, description: 'Chia có dư lớn' },
  { dividend: 256, divisor: 15, description: 'Chia số lớn' },
  { dividend: 1000, divisor: 23, description: 'Chia phức tạp' },
  { dividend: 75, divisor: 8, description: 'Chia thông thường' },
  { dividend: 144, divisor: 11, description: 'Chia có dư nhỏ' },
];

// ----------------------------------------------------------------------

interface DivisionResult {
  quotient: number;
  remainder: number;
  steps: Array<{
    step: number;
    description: string;
    calculation: string;
    result: string;
  }>;
}

export function DivisionWithRemainderView() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState('calculator');
  const [dividend, setDividend] = useState('');
  const [divisor, setDivisor] = useState('');
  const [result, setResult] = useState<DivisionResult | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<
    Array<{
      id: string;
      dividend: number;
      divisor: number;
      result: DivisionResult;
      timestamp: Date;
    }>
  >([]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const calculateDivision = useCallback(
    (a: number, b: number): DivisionResult => {
      if (b === 0) {
        throw new Error('Không thể chia cho 0');
      }

      const quotient = Math.floor(a / b);
      const remainder = a % b;

      // Tạo các bước tính toán chi tiết
      const steps: DivisionResult['steps'] = [
        {
          step: 1,
          description: 'Thiết lập phép chia',
          calculation: `${a} \\div ${b}`,
          result: 'Tìm thương và số dư',
        },
        {
          step: 2,
          description: 'Tính thương (làm tròn xuống)',
          calculation: `\\lfloor \\frac{${a}}{${b}} \\rfloor = \\lfloor ${(a / b).toFixed(2)} \\rfloor`,
          result: `${quotient}`,
        },
        {
          step: 3,
          description: 'Tính số dư',
          calculation: `${a} - (${quotient} \\times ${b}) = ${a} - ${quotient * b}`,
          result: `${remainder}`,
        },
        {
          step: 4,
          description: 'Kiểm tra kết quả',
          calculation: `${quotient} \\times ${b} + ${remainder} = ${quotient * b} + ${remainder} = ${a} \\checkmark`,
          result: `Kết quả chính xác`,
        },
      ];

      return { quotient, remainder, steps };
    },
    []
  );

  const handleCalculate = useCallback(() => {
    setError('');

    const a = parseInt(dividend);
    const b = parseInt(divisor);

    if (!dividend.trim() || !divisor.trim()) {
      setError('Vui lòng nhập đầy đủ số bị chia và số chia');
      setResult(null);
      return;
    }

    if (isNaN(a) || isNaN(b)) {
      setError('Vui lòng nhập số nguyên hợp lệ');
      setResult(null);
      return;
    }

    if (a < 0 || b < 0) {
      setError('Vui lòng nhập số nguyên dương');
      setResult(null);
      return;
    }

    try {
      const divisionResult = calculateDivision(a, b);
      setResult(divisionResult);

      // Add to history
      const historyItem = {
        id: Date.now().toString(),
        dividend: a,
        divisor: b,
        result: divisionResult,
        timestamp: new Date(),
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 49)]); // Keep max 50 items
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi tính toán'
      );
      setResult(null);
    }
  }, [dividend, divisor, calculateDivision]);

  const handleReset = useCallback(() => {
    setDividend('');
    setDivisor('');
    setResult(null);
    setError('');
  }, []);

  const handleHistoryItemClick = useCallback((item: (typeof history)[0]) => {
    setDividend(item.dividend.toString());
    setDivisor(item.divisor.toString());
    setResult(item.result);
    setError('');
    setCurrentTab('calculator');
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const handleQuickExample = useCallback(
    (example: (typeof QUICK_EXAMPLES)[0]) => {
      setDividend(example.dividend.toString());
      setDivisor(example.divisor.toString());
      setCurrentTab('calculator');

      setTimeout(() => {
        try {
          const divisionResult = calculateDivision(
            example.dividend,
            example.divisor
          );
          setResult(divisionResult);
          setError('');

          // Add to history
          const historyItem = {
            id: Date.now().toString(),
            dividend: example.dividend,
            divisor: example.divisor,
            result: divisionResult,
            timestamp: new Date(),
          };
          setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
        } catch {
          setError('Có lỗi xảy ra khi tính toán');
          setResult(null);
        }
      }, 100);
    },
    [calculateDivision]
  );

  const renderCalculator = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Nhập dữ liệu" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Số bị chia (a)"
                  value={dividend}
                  onChange={(e) => setDividend(e.target.value)}
                  placeholder="Ví dụ: 17"
                  type="number"
                  inputProps={{ min: 0, step: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Chip label="Dividend" size="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Số chia (b)"
                  value={divisor}
                  onChange={(e) => setDivisor(e.target.value)}
                  placeholder="Ví dụ: 5"
                  type="number"
                  inputProps={{ min: 1, step: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Chip label="Divisor" size="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                {dividend && divisor && (
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'action.hover',
                      borderRadius: 1,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Phép chia:
                    </Typography>
                    <Box component="div" sx={{ fontSize: '1.2rem' }}>
                      <InlineMath math={`${dividend} \\div ${divisor} = ?`} />
                    </Box>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Kết quả" />
            <CardContent>
              {result ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: 'primary.lighter',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'primary.main',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Kết quả phép chia:
                    </Typography>
                    <Box component="div" sx={{ fontSize: '1.5rem', mb: 2 }}>
                      <InlineMath
                        math={`${dividend} \\div ${divisor} = ${result.quotient} \\text{ dư } ${result.remainder}`}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Thương
                        </Typography>
                        <Typography variant="h4" color="primary.main">
                          {result.quotient}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Số dư
                        </Typography>
                        <Typography variant="h4" color="secondary.main">
                          {result.remainder}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'success.lighter',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'success.main',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Công thức tổng quát:
                    </Typography>
                    <Box component="div" sx={{ fontSize: '1.1rem' }}>
                      <InlineMath math={`a = b \\times q + r`} />
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1, display: 'block' }}
                    >
                      Trong đó: a = số bị chia, b = số chia, q = thương, r = số
                      dư
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Iconify
                    icon="solar:restart-bold"
                    sx={{
                      width: 64,
                      height: 64,
                      color: 'text.disabled',
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    Nhập số để tính toán
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleCalculate}
          startIcon={<Iconify icon="solar:restart-bold" />}
          sx={{ minWidth: 200 }}
        >
          Tính toán
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={handleReset}
          startIcon={<Iconify icon="solar:eraser-bold" />}
          sx={{ minWidth: 120 }}
        >
          Reset
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader title="Các bước tính toán chi tiết" />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {result.steps.map((step) => (
                <Box
                  key={step.step}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor:
                      step.step % 2 === 0 ? 'action.hover' : 'background.paper',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Chip
                      label={`Bước ${step.step}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Typography variant="subtitle2">
                      {step.description}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Box component="div" sx={{ mb: 1 }}>
                      <InlineMath math={step.calculation} />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      = {step.result}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const renderQuickTools = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Typography variant="h6">Ví dụ nhanh</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {QUICK_EXAMPLES.map((example, index) => (
          <Card
            key={index}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (themeParam) => themeParam.vars.customShadows.z8,
              },
            }}
            onClick={() => handleQuickExample(example)}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {example.description}
                </Typography>
                <Box component="div" sx={{ fontSize: '1.1rem', my: 1 }}>
                  <InlineMath
                    math={`${example.dividend} \\div ${example.divisor} = ?`}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Iconify
                    icon="eva:arrowhead-right-fill"
                    sx={{ color: 'primary.main' }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card>
        <CardHeader title="Bảng chia có dư mẫu (chia cho 3, 4, 5)" />
        <CardContent>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th
                    style={{
                      padding: 12,
                      borderBottom: '2px solid #ddd',
                      textAlign: 'center',
                    }}
                  >
                    Số bị chia
                  </th>
                  <th
                    style={{
                      padding: 12,
                      borderBottom: '2px solid #ddd',
                      textAlign: 'center',
                    }}
                  >
                    ÷ 3
                  </th>
                  <th
                    style={{
                      padding: 12,
                      borderBottom: '2px solid #ddd',
                      textAlign: 'center',
                    }}
                  >
                    ÷ 4
                  </th>
                  <th
                    style={{
                      padding: 12,
                      borderBottom: '2px solid #ddd',
                      textAlign: 'center',
                    }}
                  >
                    ÷ 5
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 15 }, (_, i) => i + 10).map((num) => (
                  <tr
                    key={num}
                    style={{
                      backgroundColor:
                        num % 2 === 0
                          ? theme.palette.action.hover
                          : theme.palette.background.paper,
                    }}
                  >
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {num}
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                      }}
                    >
                      {Math.floor(num / 3)} dư {num % 3}
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                      }}
                    >
                      {Math.floor(num / 4)} dư {num % 4}
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                      }}
                    >
                      {Math.floor(num / 5)} dư {num % 5}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderHistory = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Lịch sử tính toán</Typography>
        {history.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleClearHistory}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            Xóa lịch sử
          </Button>
        )}
      </Box>

      {history.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Iconify
              icon="solar:clock-circle-bold"
              sx={{ width: 64, height: 64, color: 'text.disabled', mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
              Chưa có lịch sử tính toán
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Thực hiện phép chia để xem lịch sử tại đây
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {history.map((item) => (
            <Card
              key={item.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'primary.lighter',
                  borderColor: 'primary.main',
                },
              }}
              onClick={() => handleHistoryItemClick(item)}
            >
              <CardContent sx={{ py: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        fontFamily: 'monospace',
                        fontSize: '1rem',
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 'bold' }}>
                        <InlineMath
                          math={`${item.dividend} \\div ${item.divisor}`}
                        />
                      </Box>
                      <Iconify
                        icon="eva:arrow-forward-fill"
                        sx={{ color: 'text.secondary' }}
                      />
                      <Box
                        component="span"
                        sx={{ fontWeight: 'bold', color: 'primary.main' }}
                      >
                        <InlineMath
                          math={`${item.result.quotient} \\text{ dư } ${item.result.remainder}`}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {item.timestamp.toLocaleTimeString('vi-VN')}
                    </Typography>
                    <Iconify
                      icon="eva:arrow-forward-fill"
                      sx={{ color: 'text.disabled' }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );

  const renderGuide = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Hướng dẫn phép chia có dư" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6">Khái niệm cơ bản:</Typography>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}
            >
              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Phép chia có dư</strong> là phép chia mà kết quả bao
                  gồm <strong>thương</strong> và <strong>số dư</strong>
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Công thức tổng quát:</strong>
                </Typography>
                <Box
                  sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}
                >
                  <BlockMath math="a = b \times q + r" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Trong đó:
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2">
                      • a: số bị chia (dividend)
                    </Typography>
                    <Typography variant="body2">
                      • b: số chia (divisor)
                    </Typography>
                    <Typography variant="body2">
                      • q: thương (quotient)
                    </Typography>
                    <Typography variant="body2">
                      • r: số dư (remainder)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Điều kiện:</strong>{' '}
                  <InlineMath math="0 \leq r < b" /> (số dư phải không âm và nhỏ
                  hơn số chia)
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Cách thực hiện phép chia có dư:
            </Typography>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}
            >
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Bước 1:</strong> Xác định số bị chia (a) và số chia
                  (b)
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Bước 2:</strong> Tính thương bằng cách làm tròn xuống
                </Typography>
                <Box
                  sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}
                >
                  <BlockMath math="q = \lfloor \frac{a}{b} \rfloor" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    (Lấy phần nguyên của phép chia)
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Bước 3:</strong> Tính số dư
                </Typography>
                <Box
                  sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}
                >
                  <BlockMath math="r = a - (q \times b)" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    hoặc sử dụng phép toán modulo:{' '}
                    <InlineMath math="r = a \bmod b" />
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Bước 4:</strong> Kiểm tra kết quả
                </Typography>
                <Box
                  sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}
                >
                  <BlockMath math="q \times b + r = a" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Nếu đẳng thức đúng thì kết quả chính xác
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Ví dụ chi tiết:
            </Typography>

            <Box
              sx={{
                p: 3,
                bgcolor: 'action.hover',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="body1" gutterBottom>
                <strong>Ví dụ 1:</strong> Chia 17 cho 5
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Bước 1:</strong> a = 17, b = 5
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Bước 2:</strong> Tính thương
                </Typography>
                <BlockMath math="q = \lfloor \frac{17}{5} \rfloor = \lfloor 3.4 \rfloor = 3" />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Bước 3:</strong> Tính số dư
                </Typography>
                <BlockMath math="r = 17 - (3 \times 5) = 17 - 15 = 2" />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Bước 4:</strong> Kiểm tra
                </Typography>
                <BlockMath math="3 \times 5 + 2 = 15 + 2 = 17 \checkmark" />
                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{ mt: 2, fontWeight: 'bold' }}
                >
                  Kết quả: <InlineMath math="17 \div 5 = 3 \text{ dư } 2" />
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Ứng dụng thực tế:
            </Typography>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2 }}
            >
              <Typography variant="body2">
                • <strong>Chia kẹo:</strong> 23 cái kẹo chia cho 7 bạn, mỗi bạn
                được bao nhiêu cái, thừa bao nhiêu cái?
              </Typography>
              <Typography variant="body2">
                • <strong>Xếp hàng:</strong> 50 học sinh xếp thành các hàng 8
                người, có bao nhiêu hàng đầy và thừa bao nhiêu người?
              </Typography>
              <Typography variant="body2">
                • <strong>Đóng gói:</strong> 156 sản phẩm đóng vào các hộp 12
                cái/hộp, cần bao nhiêu hộp và thừa bao nhiêu sản phẩm?
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="calculator"
        label="Máy tính"
        icon={<Iconify icon="solar:restart-bold" />}
      />
      <Tab
        value="quick-tools"
        label="Ví dụ nhanh"
        icon={<Iconify icon="custom:flash-outline" />}
      />
      <Tab
        value="history"
        label={`Lịch sử (${history.length})`}
        icon={<Iconify icon="solar:clock-circle-bold" />}
      />
      <Tab
        value="guide"
        label="Hướng dẫn"
        icon={<Iconify icon="solar:notebook-bold-duotone" />}
      />
    </CustomTabs>
  );

  return (
    <DashboardPageWithTabsLayout
      title="Phép chia có dư"
      description="Công cụ tính phép chia có dư với các ví dụ minh họa và bảng tra cứu nhanh."
      tabs={renderTabs()}
    >
      {currentTab === 'calculator' && renderCalculator()}
      {currentTab === 'quick-tools' && renderQuickTools()}
      {currentTab === 'history' && renderHistory()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayout>
  );
}
