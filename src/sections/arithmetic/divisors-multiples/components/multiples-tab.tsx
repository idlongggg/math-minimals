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
import { useMultiples } from '../hooks';

interface MultiplesTabProps {
  onAddToHistory: (item: any) => void;
}

export function MultiplesTab({ onAddToHistory }: MultiplesTabProps) {
  const { input, setInput, limit, setLimit, result, error, calculate, clear } = useMultiples();

  const handleCalculate = () => {
    calculate();
    if (result) {
      onAddToHistory({
        type: 'multiple',
        data: result,
      });
    }
  };

  const handleQuickExample = (example: string) => {
    setInput(example);
    calculate(example, limit);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Input Section */}
      <Card>
        <CardHeader
          title="Tìm bội số"
          subheader="Nhập một số nguyên dương để tìm các bội số của nó"
          avatar={<Iconify icon="solar:copy-bold" />}
        />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Nhập số"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ví dụ: 12"
              onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
              sx={{ flex: 2 }}
            />
            <TextField
              label="Số lượng bội"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="10"
              onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleCalculate}
              disabled={!input.trim() || !limit.trim()}
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
            title={`${result.count} bội số đầu tiên của ${result.number}`}
            avatar={<Iconify icon="solar:list-bold" />}
          />
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Số gốc:
                </Typography>
                <Typography variant="h6">{result.number}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Số lượng bội:
                </Typography>
                <Typography variant="h6">{result.count}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Bội số lớn nhất:
                </Typography>
                <Typography variant="h6">{result.limit}</Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Danh sách bội số:
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
              {result.multiples.map((multiple, index) => (
                <Chip
                  key={multiple}
                  label={`${multiple} (${result.number}×${index + 1})`}
                  variant={index === 0 ? 'filled' : 'outlined'}
                  color={index === 0 ? 'primary' : 'default'}
                />
              ))}
            </Box>

            {/* Mathematical explanation */}
            <Alert severity="info">
              <Typography variant="body2">
                <strong>Công thức:</strong> Bội số thứ k của n là{' '}
                <InlineMath math="n \times k" /> với <InlineMath math="k = 1, 2, 3, ..." />
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
