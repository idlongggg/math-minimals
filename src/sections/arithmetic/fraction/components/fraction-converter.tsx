import { BlockMath } from 'react-katex';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { CONVERSION_TYPES } from '../constants';
import { useFractionConverter } from '../hooks';

/**
 * Component chuyển đổi phân số
 * Hỗ trợ chuyển đổi giữa phân số, số thập phân và phần trăm
 */
export function FractionConverter() {
  const {
    numerator,
    denominator,
    decimalInput,
    percentageInput,
    conversionType,
    result,
    error,
    setNumerator,
    setDenominator,
    setDecimalInput,
    setPercentageInput,
    setConversionType,
    convert,
    clear,
  } = useFractionConverter();

  return (
    <Card>
      <CardHeader
        title="Chuyển đổi phân số"
        subheader="Chuyển đổi giữa phân số, số thập phân và phần trăm"
        action={
          <Button onClick={clear} variant="outlined" size="small">
            <Iconify icon="solar:restart-bold" width={16} sx={{ mr: 0.5 }} />
            Xóa
          </Button>
        }
      />

      <CardContent>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Loại chuyển đổi</InputLabel>
            <Select
              value={conversionType}
              label="Loại chuyển đổi"
              onChange={(e) => setConversionType(e.target.value)}
            >
              {Object.entries(CONVERSION_TYPES).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Input forms cho từng loại */}
        {conversionType === 'fraction' && (
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Tử số"
              type="number"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              fullWidth
            />
            <TextField
              label="Mẫu số"
              type="number"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              fullWidth
            />
          </Box>
        )}

        {conversionType === 'decimal' && (
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Số thập phân"
              type="number"
              value={decimalInput}
              onChange={(e) => setDecimalInput(e.target.value)}
              fullWidth
              placeholder="0.75"
              slotProps={{
                htmlInput: { step: 'any' },
              }}
            />
          </Box>
        )}

        {conversionType === 'percentage' && (
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Phần trăm"
              type="number"
              value={percentageInput}
              onChange={(e) => setPercentageInput(e.target.value)}
              fullWidth
              placeholder="75"
              slotProps={{
                htmlInput: { step: 'any' },
              }}
            />
          </Box>
        )}

        <Button
          onClick={convert}
          variant="contained"
          size="large"
          fullWidth
          sx={{ mb: 2 }}
        >
          Chuyển đổi
        </Button>

        {/* Hiển thị lỗi */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Hiển thị kết quả */}
        {result && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Kết quả:
            </Typography>
            <BlockMath math={result} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
