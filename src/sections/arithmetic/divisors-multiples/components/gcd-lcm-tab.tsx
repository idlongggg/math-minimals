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
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { QUICK_PAIRS } from '../constants';
import { useGcdLcm } from '../hooks';

interface GcdLcmTabProps {
  onAddToHistory: (item: any) => void;
}

export function GcdLcmTab({ onAddToHistory }: GcdLcmTabProps) {
  const { inputA, setInputA, inputB, setInputB, result, error, calculate, clear } = useGcdLcm();

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Input Section */}
      <Card>
        <CardHeader
          title="Tính GCD và LCM"
          subheader="Nhập hai số nguyên dương để tìm ước chung lớn nhất và bội chung nhỏ nhất"
          avatar={<Iconify icon="solar:pen-bold" />}
        />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Số thứ nhất"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              placeholder="Ví dụ: 12"
              onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Số thứ hai"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              placeholder="Ví dụ: 18"
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
            {QUICK_PAIRS.map((pair) => (
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
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.lighter', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="primary">
                    Ước chung lớn nhất (GCD)
                  </Typography>
                  <Typography variant="h4" color="primary.main">
                    {result.gcd}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <InlineMath math={`\\gcd(${result.a}, ${result.b}) = ${result.gcd}`} />
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.lighter', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="secondary">
                    Bội chung nhỏ nhất (LCM)
                  </Typography>
                  <Typography variant="h4" color="secondary.main">
                    {result.lcm}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <InlineMath math={`\\text{lcm}(${result.a}, ${result.b}) = ${result.lcm}`} />
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Key Formulas */}
              <Typography variant="h6" gutterBottom>
                Công thức quan trọng:
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
                <BlockMath math={`\\gcd(a, b) \\times \\text{lcm}(a, b) = a \\times b`} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Kiểm tra: {result.gcd} × {result.lcm} = {result.gcd * result.lcm} = {result.a} × {result.b} = {result.a * result.b}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Step-by-step Solution */}
          <Card>
            <CardHeader
              title="Các bước tính toán (Thuật toán Euclidean)"
              avatar={<Iconify icon="solar:list-bold" />}
            />
            <CardContent>
              <Stepper orientation="vertical">
                {result.steps.map((step, index) => (
                  <Step key={index} active={true} completed={true}>
                    <StepLabel>
                      <Typography variant="subtitle2">
                        Bước {step.step}: {step.description}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1, mb: 1 }}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {step.calculation}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {step.result}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>Thuật toán Euclidean:</strong> Để tính GCD(a,b), ta liên tục thực hiện phép chia có dư:
                  a = b × q + r, sau đó thay a = b, b = r cho đến khi r = 0. Khi đó GCD = b cuối cùng.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
