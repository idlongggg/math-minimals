// Division calculator form component

import { InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

import type { DivisionResult } from '../types';

interface DivisionCalculatorFormProps {
  dividend: string;
  divisor: string;
  result: DivisionResult | null;
  onDividendChange: (value: string) => void;
  onDivisorChange: (value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export function DivisionCalculatorForm({
  dividend,
  divisor,
  result,
  onDividendChange,
  onDivisorChange,
  onCalculate,
  onReset,
}: DivisionCalculatorFormProps) {
  return (
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
                onChange={(e) => onDividendChange(e.target.value)}
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
                onChange={(e) => onDivisorChange(e.target.value)}
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
                    Trong đó: a = số bị chia, b = số chia, q = thương, r = số dư
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
  );
}

export function DivisionCalculatorActions({
  onCalculate,
  onReset,
}: {
  onCalculate: () => void;
  onReset: () => void;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button
        variant="contained"
        size="large"
        onClick={onCalculate}
        startIcon={<Iconify icon="solar:restart-bold" />}
        sx={{ minWidth: 200 }}
      >
        Tính toán
      </Button>
      <Button
        variant="outlined"
        size="large"
        onClick={onReset}
        startIcon={<Iconify icon="solar:eraser-bold" />}
        sx={{ minWidth: 120 }}
      >
        Reset
      </Button>
    </Box>
  );
}
