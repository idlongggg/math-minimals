'use client';

import { useCallback, useState } from 'react';

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

// ----------------------------------------------------------------------

export function BaseConversionView() {
  const [currentTab, setCurrentTab] = useState('converter');
  const [inputValue, setInputValue] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

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

  const handleQuickConversion = useCallback(
    (quickConv: (typeof QUICK_CONVERSIONS)[0]) => {
      setFromBase(quickConv.from);
      setToBase(quickConv.to);
      setInputValue(quickConv.example);
      setCurrentTab('converter');

      // Convert immediately
      setTimeout(() => {
        try {
          const converted = convertBase(quickConv.example, quickConv.from, quickConv.to);
          setResult(converted);
          setError('');
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
                  placeholder={`Ví dụ: ${fromBase === 16 ? 'FF' : fromBase === 2 ? '1010' : '123'}`}
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
        <Button variant="outlined" size="large" onClick={handleReset} sx={{ minWidth: 120 }}>
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
                <Typography variant="body2" color="text.secondary">
                  Ví dụ: {quickConv.example}
                </Typography>
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
                  <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Thập phân</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Nhị phân</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Bát phân</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>Thập lục phân</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 16 }, (_, i) => (
                  <tr key={i}>
                    <td style={{ padding: 8, textAlign: 'center', fontFamily: 'monospace' }}>
                      {i}
                    </td>
                    <td style={{ padding: 8, textAlign: 'center', fontFamily: 'monospace' }}>
                      {i.toString(2)}
                    </td>
                    <td style={{ padding: 8, textAlign: 'center', fontFamily: 'monospace' }}>
                      {i.toString(8)}
                    </td>
                    <td style={{ padding: 8, textAlign: 'center', fontFamily: 'monospace' }}>
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

  const renderGuide = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card>
        <CardHeader title="Hướng dẫn chuyển đổi cơ số" />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Các hệ cơ số phổ biến:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2 }}>
            <Typography variant="body1">
              • <strong>Nhị phân (Base 2):</strong> Chỉ sử dụng các chữ số 0, 1
            </Typography>
            <Typography variant="body1">
              • <strong>Bát phân (Base 8):</strong> Sử dụng các chữ số 0-7
            </Typography>
            <Typography variant="body1">
              • <strong>Thập phân (Base 10):</strong> Sử dụng các chữ số 0-9 (hệ thông thường)
            </Typography>
            <Typography variant="body1">
              • <strong>Thập lục phân (Base 16):</strong> Sử dụng 0-9 và A-F
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
            Cách chuyển đổi:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2 }}>
            <Typography variant="body1">
              1. <strong>Từ bất kỳ hệ nào sang thập phân:</strong> Nhân mỗi chữ số với lũy thừa
              tương ứng của cơ số
            </Typography>
            <Typography variant="body1">
              2. <strong>Từ thập phân sang hệ khác:</strong> Chia liên tục cho cơ số đích và lấy
              phần dư
            </Typography>
            <Typography variant="body1">
              3. <strong>Giữa các hệ khác nhau:</strong> Chuyển về thập phân trước, sau đó chuyển
              sang hệ đích
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
            Ví dụ:
          </Typography>

          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              fontFamily: 'monospace',
              '& .MuiTypography-root': { fontFamily: 'monospace' },
            }}
          >
            <Typography variant="body2">Chuyển 255₁₀ sang nhị phân:</Typography>
            <Typography variant="body2">255 ÷ 2 = 127 dư 1</Typography>
            <Typography variant="body2">127 ÷ 2 = 63 dư 1</Typography>
            <Typography variant="body2">63 ÷ 2 = 31 dư 1</Typography>
            <Typography variant="body2">...</Typography>
            <Typography variant="body2">Kết quả: 11111111₂</Typography>
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
            value="guide"
            label="Hướng dẫn"
            icon={<Iconify icon="solar:notebook-bold-duotone" />}
          />
        </CustomTabs>

        {currentTab === 'converter' && renderConverter()}
        {currentTab === 'quick-tools' && renderQuickTools()}
        {currentTab === 'guide' && renderGuide()}
      </Box>
    </DashboardContent>
  );
}
