import { BlockMath } from 'react-katex';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { useFractionCalculator } from '../hooks';

/**
 * Component máy tính phân số
 * Thực hiện các phép tính cơ bản với phân số: cộng, trừ, nhân, chia
 */
export function FractionCalculator() {
  const {
    num1,
    den1,
    num2,
    den2,
    operation,
    result,
    error,
    setNum1,
    setDen1,
    setNum2,
    setDen2,
    setOperation,
    calculate,
    clear,
  } = useFractionCalculator();

  const OPERATIONS = [
    { value: 'add', label: 'Cộng (+)', symbol: '+' },
    { value: 'subtract', label: 'Trừ (-)', symbol: '-' },
    { value: 'multiply', label: 'Nhân (×)', symbol: '×' },
    { value: 'divide', label: 'Chia (÷)', symbol: '÷' },
  ];

  return (
    <Card>
      <CardHeader
        title="Máy tính phân số"
        subheader="Thực hiện các phép tính cơ bản với phân số"
        action={
          <Button onClick={clear} variant="outlined" size="small">
            <Iconify icon="solar:restart-bold" width={16} sx={{ mr: 0.5 }} />
            Xóa
          </Button>
        }
      />

      <CardContent>
        {/* Phân số thứ nhất */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Phân số thứ nhất
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Tử số"
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              fullWidth
            />
            <TextField
              label="Mẫu số"
              type="number"
              value={den1}
              onChange={(e) => setDen1(e.target.value)}
              fullWidth
            />
          </Box>
        </Box>

        {/* Phép toán */}
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Phép toán</InputLabel>
            <Select
              value={operation}
              label="Phép toán"
              onChange={(e) => setOperation(e.target.value)}
            >
              {OPERATIONS.map((op) => (
                <MenuItem key={op.value} value={op.value}>
                  {op.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Phân số thứ hai */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Phân số thứ hai
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Tử số"
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              fullWidth
            />
            <TextField
              label="Mẫu số"
              type="number"
              value={den2}
              onChange={(e) => setDen2(e.target.value)}
              fullWidth
            />
          </Box>
        </Box>

        <Button
          onClick={calculate}
          variant="contained"
          size="large"
          fullWidth
          sx={{ mb: 2 }}
        >
          Tính toán
        </Button>

        {/* Hiển thị lỗi */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Hiển thị kết quả */}
        {result && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Kết quả:
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <BlockMath
                math={`\\frac{${num1}}{${den1}} ${OPERATIONS.find((op) => op.value === operation)?.symbol} \\frac{${num2}}{${den2}} = \\frac{${result.numerator}}{${result.denominator}}`}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
