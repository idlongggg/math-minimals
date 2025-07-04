'use client';

import { useState } from 'react';
import { InlineMath } from 'react-katex';

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

import { COMMON_IRRATIONALS } from '../constants';

interface IrrationalNumbersTabProps {
  onAddToHistory: (item: any) => void;
}

export function IrrationalNumbersTab({
  onAddToHistory,
}: IrrationalNumbersTabProps) {
  const [customInput, setCustomInput] = useState('');
  const [customResult, setCustomResult] = useState<{
    value: number;
    approximation: string;
  } | null>(null);
  const [precision, setPrecision] = useState('10');

  const handleCustomCalculation = () => {
    try {
      // Simple evaluation for square roots and basic expressions
      const expression = customInput.toLowerCase().trim();
      let value: number;

      if (expression.startsWith('sqrt(') && expression.endsWith(')')) {
        const num = parseFloat(expression.slice(5, -1));
        if (isNaN(num) || num < 0) {
          throw new Error('Invalid input for square root');
        }
        value = Math.sqrt(num);
      } else if (expression === 'pi' || expression === 'π') {
        value = Math.PI;
      } else if (expression === 'e') {
        value = Math.E;
      } else {
        const num = parseFloat(expression);
        if (isNaN(num)) {
          throw new Error('Invalid number');
        }
        value = num;
      }

      const digits = parseInt(precision) || 10;
      const approximation = value.toFixed(digits);

      setCustomResult({ value, approximation });

      onAddToHistory({
        type: 'irrational',
        data: {
          expression: customInput,
          value,
          approximation,
          precision: digits,
        },
      });
    } catch {
      alert(
        'Không thể tính toán biểu thức này. Vui lòng thử sqrt(n), pi, e hoặc một số thập phân.'
      );
    }
  };

  const handleCommonIrrational = (
    irrational: (typeof COMMON_IRRATIONALS)[0]
  ) => {
    const digits = parseInt(precision) || 10;
    const approximation = irrational.value.toFixed(digits);

    setCustomResult({ value: irrational.value, approximation });
    setCustomInput(irrational.name);

    onAddToHistory({
      type: 'irrational',
      data: {
        expression: irrational.name,
        value: irrational.value,
        approximation,
        precision: digits,
        latex: irrational.latex,
        description: irrational.description,
      },
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Custom Input Section */}
      <Card>
        <CardHeader
          title="Tính toán số vô tỉ"
          subheader="Nhập biểu thức để tính giá trị xấp xỉ của số vô tỉ"
          avatar={<Iconify icon="solar:pen-bold" />}
        />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Biểu thức"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="sqrt(2), pi, e, 1.414..."
              onKeyPress={(e) => e.key === 'Enter' && handleCustomCalculation()}
              sx={{ flex: 2 }}
            />
            <TextField
              label="Độ chính xác"
              value={precision}
              onChange={(e) => setPrecision(e.target.value)}
              placeholder="10"
              sx={{ flex: 1, maxWidth: 120 }}
            />
            <Button
              variant="contained"
              onClick={handleCustomCalculation}
              disabled={!customInput.trim()}
              sx={{ minWidth: 120 }}
            >
              Tính toán
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Hỗ trợ: sqrt(n) cho căn bậc hai, &quot;pi&quot; hoặc
              &quot;π&quot;, &quot;e&quot;, hoặc nhập trực tiếp số thập phân.
            </Typography>
          </Alert>

          {customResult && (
            <Box sx={{ p: 2, bgcolor: 'primary.lighter', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="primary">
                Kết quả:
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                {customResult.approximation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Giá trị chính xác: {customResult.value}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Common Irrational Numbers */}
      <Card>
        <CardHeader
          title="Số vô tỉ thông dụng"
          subheader="Các số vô tỉ quan trọng trong toán học"
          avatar={<Iconify icon="solar:list-bold" />}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Nhấp vào một số để xem giá trị xấp xỉ với độ chính xác được chọn.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {COMMON_IRRATIONALS.map((irrational) => (
              <Card
                key={irrational.name}
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    transform: 'translateY(-2px)',
                    boxShadow: 1,
                  },
                }}
                onClick={() => handleCommonIrrational(irrational)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" component="div">
                      {irrational.name}
                    </Typography>
                    <Chip
                      label={irrational.value.toFixed(4)}
                      color="primary"
                      size="small"
                      sx={{ fontFamily: 'monospace' }}
                    />
                  </Box>

                  <Box
                    sx={{
                      mb: 1,
                      textAlign: 'center',
                      p: 1,
                      bgcolor: 'background.neutral',
                      borderRadius: 0.5,
                    }}
                  >
                    <InlineMath math={irrational.latex} />
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {irrational.description}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontFamily: 'monospace' }}
                  >
                    ≈ {irrational.value.toFixed(parseInt(precision) || 10)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Số vô tỉ</strong> là số thực không thể biểu diễn dưới dạng
              phân số a/b (a, b nguyên, b ≠ 0). Khai triển thập phân của số vô
              tỉ là vô hạn không tuần hoàn.
            </Typography>
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
}
