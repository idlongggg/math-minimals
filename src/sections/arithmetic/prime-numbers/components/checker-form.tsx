// Prime checker form component

import { InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

import { FIRST_100_PRIMES } from '../constants';

import type { PrimeCheckResult } from '../types';

interface PrimeCheckerFormProps {
  inputNumber: string;
  result: PrimeCheckResult | null;
  error: string;
  onInputChange: (value: string) => void;
  onCheck: () => void;
  onReset: () => void;
}

export function PrimeCheckerForm({
  inputNumber,
  result,
  error,
  onInputChange,
  onCheck,
  onReset,
}: PrimeCheckerFormProps) {
  const getPrimeFactorization = (num: number): string => {
    if (num <= 1) return '';

    const factors: number[] = [];
    let temp = num;

    for (let i = 2; i <= temp; i++) {
      while (temp % i === 0) {
        factors.push(i);
        temp /= i;
      }
    }

    return factors.join(' \\times ');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Kiểm tra số nguyên tố" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Nhập số cần kiểm tra"
              value={inputNumber}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Ví dụ: 17"
              type="number"
              helperText="Nhập số nguyên dương để kiểm tra"
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={onCheck}
                startIcon={<Iconify icon="solar:shield-check-bold" />}
                sx={{ minWidth: 200 }}
              >
                Kiểm tra
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={onReset}
                sx={{ minWidth: 120 }}
              >
                Reset
              </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {result && (
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">
                        Kết quả cho số {result.number}
                      </Typography>
                      <Chip
                        label={
                          result.isPrime
                            ? 'Số nguyên tố'
                            : 'Không phải số nguyên tố'
                        }
                        color={result.isPrime ? 'success' : 'error'}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body1" paragraph>
                    {result.explanation}
                  </Typography>

                  {result.factors && result.factors.length > 2 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Phân tích thành thừa số nguyên tố:
                      </Typography>
                      <Box
                        sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}
                      >
                        <Typography variant="body1">
                          <InlineMath
                            math={`${result.number} = ${getPrimeFactorization(result.number)}`}
                          />
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {result.isPrime && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: 'success.lighter',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" color="success.dark">
                        💡 <strong>Thông tin thêm:</strong> Số {result.number}{' '}
                        là số nguyên tố thứ{' '}
                        {FIRST_100_PRIMES.indexOf(result.number) + 1 > 0
                          ? FIRST_100_PRIMES.indexOf(result.number) + 1
                          : '?'}{' '}
                        trong dãy số nguyên tố.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
