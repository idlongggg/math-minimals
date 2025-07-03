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
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { QUICK_EXAMPLES } from '../constants';
import { useCommonDenominator } from '../hooks';
import { formatFractionLatex } from '../utils';

interface CommonDenominatorTabProps {
  onAddToHistory: (item: any) => void;
}

export function CommonDenominatorTab({ onAddToHistory }: CommonDenominatorTabProps) {
  const {
    fractionInputs,
    result,
    error,
    addFractionInput,
    removeFractionInput,
    updateFractionInput,
    calculate,
    clear,
    setQuickExample,
  } = useCommonDenominator();

  const handleCalculate = () => {
    calculate();
    if (result) {
      onAddToHistory({
        inputFractions: fractionInputs.filter(f => f.trim()),
        lcm: result.lcm,
        fractions: result.fractions,
        convertedFractions: result.convertedFractions,
      });
    }
  };

  const handleQuickExample = (example: string[]) => {
    setQuickExample(example);
    onAddToHistory({
      inputFractions: example,
      lcm: result?.lcm || 0,
      fractions: result?.fractions || [],
      convertedFractions: result?.convertedFractions || [],
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Input Section */}
      <Card>
        <CardHeader
          title="Tìm mẫu số chung"
          subheader="Nhập các phân số để tìm mẫu số chung nhỏ nhất và chuyển đổi"
          avatar={<Iconify icon="solar:pen-bold" />}
        />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            {fractionInputs.map((input, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 80 }}>
                  Phân số {index + 1}:
                </Typography>
                <TextField
                  fullWidth
                  value={input}
                  onChange={(e) => updateFractionInput(index, e.target.value)}
                  placeholder="Ví dụ: 1/2"
                  onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
                />
                {fractionInputs.length > 2 && (
                  <IconButton
                    onClick={() => removeFractionInput(index)}
                    color="error"
                    size="small"
                  >
                    <Iconify icon="solar:trash-bin-minimalistic-bold" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              onClick={handleCalculate}
              disabled={fractionInputs.filter(f => f.trim()).length < 2}
            >
              Tính toán
            </Button>
            <Button variant="outlined" onClick={addFractionInput}>
              Thêm phân số
            </Button>
            <Button variant="outlined" onClick={clear}>
              Xóa tất cả
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Quick Examples */}
          <Typography variant="subtitle2" gutterBottom>
            Ví dụ nhanh:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {QUICK_EXAMPLES.map((example, index) => (
              <Chip
                key={index}
                label={`${example.description}: ${example.fractions.join(', ')}`}
                variant="outlined"
                onClick={() => handleQuickExample(example.fractions)}
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
            title="Kết quả chuyển đổi"
            avatar={<Iconify icon="solar:list-bold" />}
          />
          <CardContent>
            {/* Summary */}
            <Box sx={{ 
              textAlign: 'center', 
              mb: 3, 
              p: 3, 
              bgcolor: 'primary.lighter', 
              borderRadius: 1 
            }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Mẫu số chung nhỏ nhất: {result.lcm}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                LCM của mẫu số: {result.fractions.map(f => f.denominator).join(', ')} = {result.lcm}
              </Typography>
            </Box>

            {/* Before and After Comparison */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="secondary" gutterBottom>
                  Phân số ban đầu:
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
                  {result.fractions.map((fraction, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <InlineMath math={formatFractionLatex(fraction)} />
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Sau khi chuyển đổi:
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'primary.lighter', borderRadius: 1 }}>
                  {result.convertedFractions.map((fraction, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <InlineMath math={formatFractionLatex(fraction)} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Step by step explanation */}
            <Typography variant="subtitle2" gutterBottom>
              Các bước thực hiện:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {result.fractions.map((fraction, index) => {
                const multiplier = result.lcm / fraction.denominator;
                return (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      bgcolor: 'background.neutral',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2" gutterBottom>
                      Bước {index + 1}: Chuyển đổi {formatFractionLatex(fraction)}
                    </Typography>
                    <Box sx={{ ml: 2 }}>
                      <BlockMath math={`\\frac{${fraction.numerator}}{${fraction.denominator}} = \\frac{${fraction.numerator} \\times ${multiplier}}{${fraction.denominator} \\times ${multiplier}} = \\frac{${fraction.numerator * multiplier}}{${result.lcm}}`} />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Mathematical explanation */}
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                <strong>Mẫu số chung nhỏ nhất (LCM):</strong> Để cộng trừ phân số, ta cần chuyển chúng về cùng mẫu số.
                Mẫu số chung nhỏ nhất là bội chung nhỏ nhất của tất cả các mẫu số.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
