'use client';

import { InlineMath } from 'react-katex';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { QUICK_EXAMPLES } from '../constants';
import { useDivisors } from '../hooks';

interface DivisorsTabProps {
  onAddToHistory: (item: any) => void;
}

export function DivisorsTab({ onAddToHistory }: DivisorsTabProps) {
  const { input, setInput, result, error, calculate, clear } = useDivisors();

  const handleCalculate = () => {
    calculate();
    if (result) {
      onAddToHistory({
        type: 'divisor',
        data: result,
      });
    }
  };

  const handleQuickExample = (example: string) => {
    setInput(example);
    calculate(example);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Input Section */}
      <Card>
        <CardHeader
          title="Tìm ước số"
          subheader="Nhập một số nguyên dương để tìm tất cả ước số của nó"
          avatar={<Iconify icon="solar:pen-bold" />}
        />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Nhập số"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ví dụ: 12"
              onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
              error={!!error}
              helperText={error}
            />
            <Button
              variant="contained"
              onClick={handleCalculate}
              disabled={!input.trim()}
              sx={{ minWidth: 120 }}
            >
              Tính toán
            </Button>
            <Button variant="outlined" onClick={clear}>
              Xóa
            </Button>
          </Box>

          {/* Quick Examples */}
          <Typography variant="subtitle2" gutterBottom>
            Ví dụ nhanh:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {QUICK_EXAMPLES.map((item) => (
              <Chip
                key={item.label}
                label={`${item.label}: ${item.example}`}
                variant="outlined"
                onClick={() => handleQuickExample(item.example)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader
            title={`Ước số của ${result.number}`}
            avatar={<Iconify icon="solar:list-bold" />}
          />
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Tổng số ước:
                </Typography>
                <Typography variant="h6">{result.divisorCount}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Tổng các ước:
                </Typography>
                <Typography variant="h6">{result.divisorSum}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Loại số:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {result.isPrime && <Chip label="Số nguyên tố" color="primary" size="small" />}
                  {result.isPerfectSquare && <Chip label="Số chính phương" color="secondary" size="small" />}
                  {result.isPerfectNumber && <Chip label="Số hoàn hảo" color="success" size="small" />}
                  {!result.isPrime && !result.isPerfectSquare && !result.isPerfectNumber && (
                    <Chip label="Số hợp số" color="default" size="small" />
                  )}
                </Box>
              </Box>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Danh sách ước số:
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              p: 2,
              bgcolor: 'background.neutral',
              borderRadius: 1,
              mb: 2
            }}>
              {result.divisors.map((divisor) => (
                <Chip
                  key={divisor}
                  label={divisor}
                  variant={divisor === 1 || divisor === result.number ? 'filled' : 'outlined'}
                  color={divisor === 1 || divisor === result.number ? 'primary' : 'default'}
                />
              ))}
            </Box>

            {result.properDivisors.length > 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Ước số thực sự (không bao gồm chính nó):
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  p: 2,
                  bgcolor: 'background.neutral',
                  borderRadius: 1
                }}>
                  {result.properDivisors.map((divisor) => (
                    <Chip key={divisor} label={divisor} variant="outlined" />
                  ))}
                </Box>
              </>
            )}

            {/* Mathematical explanation */}
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Công thức:</strong> Để tìm ước số của n, ta tìm tất cả số i sao cho{' '}
                <InlineMath math="n \bmod i = 0" /> với <InlineMath math="1 \leq i \leq n" />
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
