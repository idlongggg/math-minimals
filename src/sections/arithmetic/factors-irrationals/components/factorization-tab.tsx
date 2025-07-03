'use client';

import { BlockMath, InlineMath } from 'react-katex';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { QUICK_FACTORIZATIONS } from '../constants';
import { useFactorization } from '../hooks';
import { eulerTotient, getDivisorsFromFactorization } from '../utils';

interface FactorizationTabProps {
  onAddToHistory: (item: any) => void;
}

export function FactorizationTab({ onAddToHistory }: FactorizationTabProps) {
  const { input, setInput, result, error, calculate, clear } = useFactorization();

  const handleCalculate = () => {
    calculate();
    if (result) {
      onAddToHistory({
        type: 'factorization',
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
          title="Phân tích thừa số nguyên tố"
          subheader="Nhập một số nguyên lớn hơn 1 để phân tích thành các thừa số nguyên tố"
          avatar={<Iconify icon="solar:pen-bold" />}
        />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Nhập số"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ví dụ: 60"
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
              Phân tích
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
            {QUICK_FACTORIZATIONS.map((item) => (
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
            title={`Phân tích thừa số nguyên tố của ${result.number}`}
            avatar={<Iconify icon="solar:list-bold" />}
          />
          <CardContent>
            {/* Main Factorization */}
            <Box sx={{ textAlign: 'center', mb: 3, p: 3, bgcolor: 'primary.lighter', borderRadius: 1 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Kết quả phân tích:
              </Typography>
              <BlockMath math={`${result.number} = ${result.factorString}`} />
            </Box>

            {/* Properties Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Số thừa số nguyên tố:
                </Typography>
                <Typography variant="h6">{result.factors.length}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Tổng số ước:
                </Typography>
                <Typography variant="h6">
                  {result.factors.reduce((acc, f) => acc * (f.power + 1), 1)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Euler φ(n):
                </Typography>
                <Typography variant="h6">{eulerTotient(result.number)}</Typography>
              </Box>
            </Box>

            {/* Properties Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {result.isSquareFree && (
                <Chip label="Square-free" color="primary" size="small" />
              )}
              {result.isPrimePower && (
                <Chip label="Prime power" color="secondary" size="small" />
              )}
              {result.factors.length === 1 && result.factors[0].power === 1 && (
                <Chip label="Số nguyên tố" color="success" size="small" />
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Detailed Factorization */}
            <Typography variant="subtitle2" gutterBottom>
              Chi tiết phân tích:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
              {result.factors.map(({ prime, power }, index) => (
                <Box
                  key={prime}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    bgcolor: 'background.neutral',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ minWidth: 100 }}>
                    Thừa số {index + 1}:
                  </Typography>
                  <Chip label={`${prime}${power > 1 ? `^${power}` : ''}`} color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    = {Math.pow(prime, power)}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* All Divisors */}
            <Typography variant="subtitle2" gutterBottom>
              Tất cả ước số:
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
              {getDivisorsFromFactorization(result.factors).map((divisor) => (
                <Chip
                  key={divisor}
                  label={divisor}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>

            {/* Mathematical explanation */}
            <Alert severity="info">
              <Typography variant="body2">
                <strong>Định lý cơ bản của số học:</strong> Mọi số nguyên lớn hơn 1 đều có thể phân tích duy nhất thành tích của các thừa số nguyên tố.
                Công thức số ước: nếu <InlineMath math="n = p_1^{a_1} \times p_2^{a_2} \times ... \times p_k^{a_k}" /> thì số ước của n là{' '}
                <InlineMath math="(a_1 + 1)(a_2 + 1)...(a_k + 1)" />
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
