'use client';

import { BlockMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

import { useGcdLcm } from '../hooks';
import { QUICK_GCD_LCM } from '../constants';

interface GcdLcmFactorizationTabProps {
  onAddToHistory: (item: any) => void;
}

export function GcdLcmFactorizationTab({
  onAddToHistory,
}: GcdLcmFactorizationTabProps) {
  const {
    inputA,
    setInputA,
    inputB,
    setInputB,
    result,
    error,
    calculate,
    clear,
  } = useGcdLcm();

  const handleCalculate = () => {
    calculate();
    if (result) {
      onAddToHistory({
        type: 'gcd-lcm',
        data: result,
      });
    }
  };

  const handleQuickPair = (a: string, b: string) => {
    setInputA(a);
    setInputB(b);
    calculate(a, b);
  };

  const formatFactors = (factors: { prime: number; power: number }[]) => {
    if (factors.length === 0) return '1';
    return factors
      .map(({ prime, power }) =>
        power === 1 ? `${prime}` : `${prime}^{${power}}`
      )
      .join(' \\times ');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Input Section */}
      <Card>
        <CardHeader
          title="GCD và LCM bằng phân tích thừa số"
          subheader="Tính ước chung lớn nhất và bội chung nhỏ nhất bằng phương pháp phân tích thừa số nguyên tố"
          avatar={<Iconify icon="solar:pen-bold" />}
        />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Số thứ nhất"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              placeholder="Ví dụ: 48"
              onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Số thứ hai"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              placeholder="Ví dụ: 72"
              onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleCalculate}
              disabled={!inputA.trim() || !inputB.trim()}
              sx={{ minWidth: 120 }}
            >
              Tính toán
            </Button>
            <Button variant="outlined" onClick={clear}>
              Xóa
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Quick Examples */}
          <Typography variant="subtitle2" gutterBottom>
            Cặp số mẫu:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {QUICK_GCD_LCM.map((pair) => (
              <Chip
                key={pair.label}
                label={`${pair.label}: ${pair.a}, ${pair.b}`}
                variant="outlined"
                onClick={() => handleQuickPair(pair.a, pair.b)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <>
          {/* Summary Results */}
          <Card>
            <CardHeader
              title={`GCD và LCM của ${result.a} và ${result.b}`}
              avatar={<Iconify icon="solar:flag-bold" />}
            />
            <CardContent>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 3,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    bgcolor: 'primary.lighter',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2" color="primary">
                    Ước chung lớn nhất (GCD)
                  </Typography>
                  <Typography variant="h4" color="primary.main">
                    {result.gcd}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      p: 1,
                      bgcolor: 'background.paper',
                      borderRadius: 0.5,
                    }}
                  >
                    <BlockMath
                      math={`\\gcd(${result.a}, ${result.b}) = ${formatFactors(result.gcdFactors)}`}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    bgcolor: 'secondary.lighter',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2" color="secondary">
                    Bội chung nhỏ nhất (LCM)
                  </Typography>
                  <Typography variant="h4" color="secondary.main">
                    {result.lcm}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      p: 1,
                      bgcolor: 'background.paper',
                      borderRadius: 0.5,
                    }}
                  >
                    <BlockMath
                      math={`\\text{lcm}(${result.a}, ${result.b}) = ${formatFactors(result.lcmFactors)}`}
                    />
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Detailed Analysis */}
              <Typography variant="h6" gutterBottom>
                Phân tích chi tiết:
              </Typography>

              {/* GCD Analysis */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Cách tính GCD:
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    GCD được tính bằng cách lấy{' '}
                    <strong>lũy thừa nhỏ nhất</strong> của mỗi thừa số nguyên tố
                    chung.
                  </Typography>
                </Alert>
                <Box
                  sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}
                >
                  {result.gcdFactors.length === 0 ? (
                    <Typography variant="body2">
                      Hai số nguyên tố cùng nhau (không có thừa số chung) → GCD
                      = 1
                    </Typography>
                  ) : (
                    result.gcdFactors.map(({ prime, power }) => (
                      <Typography key={prime} variant="body2" sx={{ mb: 0.5 }}>
                        • Thừa số {prime}: min(lũy thừa trong {result.a}, lũy
                        thừa trong {result.b}) = {power}
                      </Typography>
                    ))
                  )}
                </Box>
              </Box>

              {/* LCM Analysis */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="secondary" gutterBottom>
                  Cách tính LCM:
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    LCM được tính bằng cách lấy{' '}
                    <strong>lũy thừa lớn nhất</strong> của mỗi thừa số nguyên tố
                    xuất hiện.
                  </Typography>
                </Alert>
                <Box
                  sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}
                >
                  {result.lcmFactors.map(({ prime, power }) => (
                    <Typography key={prime} variant="body2" sx={{ mb: 0.5 }}>
                      • Thừa số {prime}: max(lũy thừa trong {result.a}, lũy thừa
                      trong {result.b}) = {power}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Verification */}
              <Box sx={{ p: 2, bgcolor: 'success.lighter', borderRadius: 1 }}>
                <Typography
                  variant="subtitle2"
                  color="success.dark"
                  gutterBottom
                >
                  Kiểm tra công thức:
                </Typography>
                <BlockMath
                  math={`\\gcd(a, b) \\times \\text{lcm}(a, b) = a \\times b`}
                />
                <Typography variant="body2" color="success.dark">
                  {result.gcd} × {result.lcm} = {result.gcd * result.lcm} ={' '}
                  {result.a} × {result.b} = {result.a * result.b} ✓
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
