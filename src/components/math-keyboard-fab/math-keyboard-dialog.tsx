'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { useMathKeyboard } from 'src/contexts/math-keyboard-context';

// ----------------------------------------------------------------------

const MATH_SYMBOLS = [
  // Phép toán cơ bản
  { symbol: '+', label: 'Cộng' },
  { symbol: '-', label: 'Trừ' },
  { symbol: '×', label: 'Nhân' },
  { symbol: '÷', label: 'Chia' },
  { symbol: '=', label: 'Bằng' },
  { symbol: '≠', label: 'Không bằng' },

  // Số mũ và căn bậc
  { symbol: 'x²', label: 'Bình phương' },
  { symbol: 'x³', label: 'Lập phương' },
  { symbol: 'xⁿ', label: 'Lũy thừa n' },
  { symbol: '√', label: 'Căn bậc hai' },
  { symbol: '∛', label: 'Căn bậc ba' },
  { symbol: 'ⁿ√', label: 'Căn bậc n' },

  // Phân số
  { symbol: '½', label: 'Một phần hai' },
  { symbol: '⅓', label: 'Một phần ba' },
  { symbol: '¼', label: 'Một phần tư' },
  { symbol: 'a/b', label: 'Phân số' },

  // So sánh
  { symbol: '<', label: 'Nhỏ hơn' },
  { symbol: '>', label: 'Lớn hơn' },
  { symbol: '≤', label: 'Nhỏ hơn hoặc bằng' },
  { symbol: '≥', label: 'Lớn hơn hoặc bằng' },

  // Hình học
  { symbol: '∠', label: 'Góc' },
  { symbol: '°', label: 'Độ' },
  { symbol: '⊥', label: 'Vuông góc' },
  { symbol: '∥', label: 'Song song' },
  { symbol: 'π', label: 'Pi' },

  // Khác
  { symbol: '∞', label: 'Vô cực' },
  { symbol: '±', label: 'Cộng trừ' },
  { symbol: '%', label: 'Phần trăm' },
  { symbol: '‰', label: 'Phần nghìn' },
];

const NUMBER_BUTTONS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '(', ')'];

export function MathKeyboardDialog() {
  const { isOpen, onClose } = useMathKeyboard();
  const [expression, setExpression] = useState('');

  const handleSymbolClick = (symbol: string) => {
    setExpression((prev) => prev + symbol);
  };

  const handleClear = () => {
    setExpression('');
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(expression);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">Bàn Phím Toán Học</Typography>
        <IconButton onClick={onClose} size="small">
          <Iconify icon="solar:close-circle-bold" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Nhập biểu thức toán học..."
            InputProps={{
              endAdornment: (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={handleBackspace} size="small" title="Xóa lùi">
                    <Iconify icon="solar:close-circle-bold" />
                  </IconButton>
                  <IconButton onClick={handleClear} size="small" title="Xóa tất cả">
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                  <IconButton onClick={handleCopy} size="small" title="Sao chép">
                    <Iconify icon="solar:copy-bold" />
                  </IconButton>
                </Box>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '1.1rem',
                fontFamily: 'monospace',
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Số và dấu ngoặc
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'background.neutral' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {NUMBER_BUTTONS.map((num) => (
                <Button
                  key={num}
                  variant="outlined"
                  onClick={() => handleSymbolClick(num)}
                  sx={{
                    minHeight: 40,
                    fontSize: '1rem',
                    minWidth: 60,
                    flex: '0 0 auto',
                  }}
                >
                  {num}
                </Button>
              ))}
            </Box>
          </Paper>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Ký hiệu toán học
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'background.neutral' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {MATH_SYMBOLS.map((item) => (
                <Button
                  key={item.symbol}
                  variant="outlined"
                  onClick={() => handleSymbolClick(item.symbol)}
                  title={item.label}
                  sx={{
                    minHeight: 50,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    minWidth: 60,
                    flex: '0 0 auto',
                  }}
                >
                  {item.symbol}
                </Button>
              ))}
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClear}
          color="warning"
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Xóa tất cả
        </Button>
        <Button onClick={handleCopy} color="primary" startIcon={<Iconify icon="solar:copy-bold" />}>
          Sao chép
        </Button>
        <Button onClick={onClose} variant="contained">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
