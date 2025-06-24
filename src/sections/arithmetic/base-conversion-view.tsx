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
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CustomTabs } from 'src/components/custom-tabs';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

const QUICK_CONVERSIONS = [
  { label: 'Thập phân → Nhị phân', from: 10, to: 2, example: '255' },
  { label: 'Thập phân → Thập lục phân', from: 10, to: 16, example: '255' },
  { label: 'Nhị phân → Thập phân', from: 2, to: 10, example: '11111111' },
  { label: 'Thập lục phân → Thập phân', from: 16, to: 10, example: 'FF' },
  { label: 'Bát phân → Thập phân', from: 8, to: 10, example: '377' },
  { label: 'Thập phân → Bát phân', from: 10, to: 8, example: '255' },
];

const BASE_NAMES = {
  2: 'Nhị phân (Binary)',
  8: 'Bát phân (Octal)',
  10: 'Thập phân (Decimal)',
  16: 'Thập lục phân (Hexadecimal)',
  3: 'Tam phân (Ternary)',
  4: 'Tứ phân (Quaternary)',
  5: 'Ngũ phân (Quinary)',
  6: 'Lục phân (Senary)',
  7: 'Thất phân (Septenary)',
  9: 'Cửu phân (Nonary)',
  11: 'Thập nhất phân (Undecimal)',
  12: 'Thập nhị phân (Duodecimal)',
};

const BASE_LATEX_NOTATION: Record<number, string> = {
  2: '_{(2)}',
  8: '_{(8)}',
  10: '_{(10)}',
  16: '_{(16)}',
  3: '_{(3)}',
  4: '_{(4)}',
  5: '_{(5)}',
  6: '_{(6)}',
  7: '_{(7)}',
  9: '_{(9)}',
  11: '_{(11)}',
  12: '_{(12)}',
};

// ----------------------------------------------------------------------

export function BaseConversionView() {
  const [currentTab, setCurrentTab] = useState('converter');
  const [inputValue, setInputValue] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<
    Array<{
      id: string;
      input: string;
      fromBase: number;
      toBase: number;
      result: string;
      timestamp: Date;
    }>
  >([]);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const isValidDigit = (digit: string, base: number): boolean => {
    const charCode = digit.toUpperCase().charCodeAt(0);
    if (digit >= '0' && digit <= '9') {
      return parseInt(digit) < base;
    }
    if (digit >= 'A' && digit <= 'Z') {
      return charCode - 65 + 10 < base;
    }
    return false;
  };

  const isValidNumber = (value: string, base: number): boolean => {
    if (!value) return false;
    return value.split('').every((digit) => isValidDigit(digit, base));
  };

  const convertBase = useCallback((value: string, fromBase: number, toBase: number): string => {
    if (!value) return '';

    try {
      // Convert to decimal first
      let decimal = 0;
      const digits = value.toUpperCase().split('').reverse();

      for (let i = 0; i < digits.length; i++) {
        const digit = digits[i];
        let digitValue: number;

        if (digit >= '0' && digit <= '9') {
          digitValue = parseInt(digit);
        } else if (digit >= 'A' && digit <= 'Z') {
          digitValue = digit.charCodeAt(0) - 65 + 10;
        } else {
          throw new Error('Invalid character');
        }

        if (digitValue >= fromBase) {
          throw new Error(`Invalid digit '${digit}' for base ${fromBase}`);
        }

        decimal += digitValue * Math.pow(fromBase, i);
      }

      if (toBase === 10) {
        return decimal.toString();
      }

      // Convert from decimal to target base
      if (decimal === 0) return '0';

      const digits_map = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';

      while (decimal > 0) {
        result = digits_map[decimal % toBase] + result;
        decimal = Math.floor(decimal / toBase);
      }

      return result;
    } catch (err) {
      throw new Error('Conversion failed');
    }
  }, []);

  const handleConvert = useCallback(() => {
    setError('');

    if (!inputValue.trim()) {
      setResult('');
      return;
    }

    if (!isValidNumber(inputValue.trim(), fromBase)) {
      setError(`Số "${inputValue}" không hợp lệ cho hệ cơ số ${fromBase}`);
      setResult('');
      return;
    }

    try {
      const converted = convertBase(inputValue.trim(), fromBase, toBase);
      setResult(converted);

      // Add to history
      const historyItem = {
        id: Date.now().toString(),
        input: inputValue.trim(),
        fromBase,
        toBase,
        result: converted,
        timestamp: new Date(),
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 49)]); // Keep max 50 items
    } catch (err) {
      setError('Có lỗi xảy ra khi chuyển đổi');
      setResult('');
    }
  }, [inputValue, fromBase, toBase, convertBase]);

  const handleReset = useCallback(() => {
    setInputValue('');
    setFromBase(10);
    setToBase(2);
    setResult('');
    setError('');
  }, []);

  const handleHistoryItemClick = useCallback((item: (typeof history)[0]) => {
    setInputValue(item.input);
    setFromBase(item.fromBase);
    setToBase(item.toBase);
    setResult(item.result);
    setError('');
    setCurrentTab('converter');
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const handleQuickConversion = useCallback(
    (quickConv: (typeof QUICK_CONVERSIONS)[0]) => {
      setFromBase(quickConv.from);
      setToBase(quickConv.to);
      setInputValue(quickConv.example);
      setCurrentTab('converter'); // Convert immediately
      setTimeout(() => {
        try {
          const converted = convertBase(quickConv.example, quickConv.from, quickConv.to);
          setResult(converted);
          setError('');

          // Add to history
          const historyItem = {
            id: Date.now().toString(),
            input: quickConv.example,
            fromBase: quickConv.from,
            toBase: quickConv.to,
            result: converted,
            timestamp: new Date(),
          };
          setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
        } catch (err) {
          setError('Có lỗi xảy ra khi chuyển đổi');
          setResult('');
        }
      }, 100);
    },
    [convertBase]
  );

  const renderConverter = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Số gốc" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Hệ cơ số gốc</InputLabel>
                  <Select
                    value={fromBase}
                    label="Hệ cơ số gốc"
                    onChange={(e) => setFromBase(Number(e.target.value))}
                  >
                    {Object.entries(BASE_NAMES).map(([base, name]) => (
                      <MenuItem key={base} value={Number(base)}>
                        {name} (Base {base})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Nhập số cần chuyển đổi"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                  placeholder={`Ví dụ: ${fromBase === 16 ? 'FF' : fromBase === 2 ? '1010' : fromBase === 8 ? '377' : '123'}`}
                  helperText={
                    inputValue && (
                      <Box component="span">
                        Bạn đang nhập:{' '}
                        <InlineMath math={`${inputValue}_{${BASE_LATEX_NOTATION[fromBase]}}`} />
                      </Box>
                    )
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Chip label={`Base ${fromBase}`} size="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Kết quả" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Hệ cơ số đích</InputLabel>
                  <Select
                    value={toBase}
                    label="Hệ cơ số đích"
                    onChange={(e) => setToBase(Number(e.target.value))}
                  >
                    {Object.entries(BASE_NAMES).map(([base, name]) => (
                      <MenuItem key={base} value={Number(base)}>
                        {name} (Base {base})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Kết quả"
                  value={result}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Chip label={`Base ${toBase}`} size="small" color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontFamily: 'monospace',
                      fontSize: '1.1rem',
                    },
                  }}
                />

                {result && (
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'primary.lighter',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'primary.main',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Kết quả chuyển đổi:
                    </Typography>
                    <Box component="div" sx={{ fontSize: '1.2rem' }}>
                      <InlineMath
                        math={`${inputValue || '?'}_{${BASE_LATEX_NOTATION[fromBase]}} = ${result}_{${BASE_LATEX_NOTATION[toBase]}}`}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleConvert}
          startIcon={<Iconify icon="solar:restart-bold" />}
          sx={{ minWidth: 200 }}
        >
          Chuyển đổi
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
    </Box>
  );

  const renderQuickTools = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">Chuyển đổi nhanh</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {QUICK_CONVERSIONS.map((quickConv, index) => (
          <Card
            key={index}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => theme.vars.customShadows.z8,
              },
            }}
            onClick={() => handleQuickConversion(quickConv)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {quickConv.label}
                </Typography>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Ví dụ:
                  </Typography>
                  <InlineMath
                    math={`${quickConv.example}_{${BASE_LATEX_NOTATION[quickConv.from]}}`}
                  />
                  <Iconify
                    icon="eva:arrow-forward-fill"
                    sx={{ color: 'primary.main', fontSize: 16 }}
                  />
                  <InlineMath math={`?_{${BASE_LATEX_NOTATION[quickConv.to]}}`} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Iconify icon="eva:arrowhead-right-fill" sx={{ color: 'primary.main' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card>
        <CardHeader title="Bảng chuyển đổi cơ bản (0-15)" />
        <CardContent>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd', textAlign: 'center' }}>
                    <InlineMath math="N_{(10)}" />
                  </th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd', textAlign: 'center' }}>
                    <InlineMath math="N_{(2)}" />
                  </th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd', textAlign: 'center' }}>
                    <InlineMath math="N_{(8)}" />
                  </th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd', textAlign: 'center' }}>
                    <InlineMath math="N_{(16)}" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 16 }, (_, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                      }}
                    >
                      {i}
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                      }}
                    >
                      {i.toString(2)}
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                      }}
                    >
                      {i.toString(8)}
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                      }}
                    >
                      {i.toString(16).toUpperCase()}
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Lịch sử chuyển đổi</Typography>
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
              Chưa có lịch sử chuyển đổi
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Thực hiện chuyển đổi để xem lịch sử tại đây
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
                  transform: 'translateX(4px)',
                  boxShadow: (theme) => theme.vars.customShadows.z4,
                },
              }}
              onClick={() => handleHistoryItemClick(item)}
            >
              <CardContent sx={{ py: 2 }}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                      }}
                    >
                      <Chip label={`Base ${item.fromBase}`} size="small" variant="outlined" />
                      <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        <InlineMath
                          math={`${item.input}_{${BASE_LATEX_NOTATION[item.fromBase]}}`}
                        />
                      </Box>
                      <Iconify icon="eva:arrow-forward-fill" sx={{ color: 'text.secondary' }} />
                      <Chip label={`Base ${item.toBase}`} size="small" color="primary" />
                      <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        <InlineMath math={`${item.result}_{${BASE_LATEX_NOTATION[item.toBase]}}`} />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {item.timestamp.toLocaleTimeString('vi-VN')}
                    </Typography>
                    <Iconify icon="eva:arrow-forward-fill" sx={{ color: 'text.disabled' }} />
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card>
        <CardHeader title="Hướng dẫn chuyển đổi cơ số" />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Các hệ cơ số phổ biến:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6">Các hệ cơ số phổ biến:</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}>
              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Nhị phân (Base 2):</strong> Chỉ sử dụng các chữ số{' '}
                  <InlineMath math="\{0, 1\}" />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Ví dụ: <InlineMath math="1010_{(2)} = 10_{(10)}" />
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Bát phân (Base 8):</strong> Sử dụng các chữ số{' '}
                  <InlineMath math="\{0, 1, 2, 3, 4, 5, 6, 7\}" />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Ví dụ: <InlineMath math="377_{(8)} = 255_{(10)}" />
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Thập phân (Base 10):</strong> Sử dụng các chữ số{' '}
                  <InlineMath math="\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}" /> (hệ thông thường)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Ví dụ: <InlineMath math="255_{(10)}" />
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Thập lục phân (Base 16):</strong> Sử dụng{' '}
                  <InlineMath math="\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F\}" />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Ví dụ: <InlineMath math="FF_{(16)} = 255_{(10)}" />
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Công thức chuyển đổi:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>1. Từ hệ cơ số b sang thập phân:</strong>
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <BlockMath math="N_{(b)} = \sum_{i=0}^{n-1} d_i \times b^i" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Trong đó: <InlineMath math="d_i" /> là chữ số thứ i từ phải sang trái,{' '}
                    <InlineMath math="b" /> là cơ số
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>2. Từ thập phân sang hệ cơ số b:</strong>
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Thuật toán chia liên tục:
                  </Typography>
                  <BlockMath math="N_{(10)} \div b = q_1 \text{ dư } r_1" />
                  <BlockMath math="q_1 \div b = q_2 \text{ dư } r_2" />
                  <BlockMath math="\vdots" />
                  <BlockMath math="q_{n-1} \div b = 0 \text{ dư } r_n" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Kết quả: <InlineMath math="r_n r_{n-1} \ldots r_2 r_1" />
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
                bgcolor: 'grey.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Typography variant="body1" gutterBottom>
                <strong>Chuyển đổi từ nhị phân sang thập phân:</strong>
              </Typography>
              <Box sx={{ ml: 2 }}>
                <BlockMath math="1101_{(2)} = 1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0" />
                <BlockMath math="= 1 \times 8 + 1 \times 4 + 0 \times 2 + 1 \times 1" />
                <BlockMath math="= 8 + 4 + 0 + 1 = 13_{(10)}" />
              </Box>

              <Typography variant="body1" gutterBottom sx={{ mt: 3 }}>
                <strong>Chuyển đổi từ thập phân sang nhị phân:</strong>
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  Chuyển 13₁₀ sang nhị phân:
                </Typography>
                <BlockMath math="13 \div 2 = 6 \text{ dư } 1" />
                <BlockMath math="6 \div 2 = 3 \text{ dư } 0" />
                <BlockMath math="3 \div 2 = 1 \text{ dư } 1" />
                <BlockMath math="1 \div 2 = 0 \text{ dư } 1" />
                <Typography variant="body2" color="primary.main" sx={{ mt: 1 }}>
                  Đọc từ dưới lên: <InlineMath math="13_{(10)} = 1101_{(2)}" />
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4">Chuyển đổi hệ cơ số</Typography>

        <CustomTabs value={currentTab} onChange={handleTabChange}>
          <Tab value="converter" label="Chuyển đổi" icon={<Iconify icon="solar:restart-bold" />} />
          <Tab
            value="quick-tools"
            label="Công cụ nhanh"
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

        {currentTab === 'converter' && renderConverter()}
        {currentTab === 'quick-tools' && renderQuickTools()}
        {currentTab === 'history' && renderHistory()}
        {currentTab === 'guide' && renderGuide()}
      </Box>
    </DashboardContent>
  );
}
