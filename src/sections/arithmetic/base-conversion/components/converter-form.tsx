// Base converter form component

import { InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

import { ALL_BASES, BASE_NAMES } from '../constants';

interface BaseConverterFormProps {
  inputValue: string;
  fromBase: number;
  toBase: number;
  result: string;
  onInputChange: (value: string) => void;
  onFromBaseChange: (base: number) => void;
  onToBaseChange: (base: number) => void;
  onConvert: () => void;
  onReset: () => void;
  onSwapBases: () => void;
}

export function BaseConverterForm({
  inputValue,
  fromBase,
  toBase,
  result,
  onInputChange,
  onFromBaseChange,
  onToBaseChange,
  onConvert,
  onReset,
  onSwapBases,
}: BaseConverterFormProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Nhập dữ liệu" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Số cần chuyển đổi"
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value.toUpperCase())}
                  placeholder="Ví dụ: 255, FF, 11111111"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Chip
                          label={BASE_NAMES[fromBase] || `Cơ số ${fromBase}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Từ hệ cơ số</InputLabel>
                    <Select
                      value={fromBase}
                      label="Từ hệ cơ số"
                      onChange={(e) => onFromBaseChange(e.target.value as number)}
                    >
                      {ALL_BASES.map((base) => (
                        <MenuItem key={base} value={base}>
                          {base} - {BASE_NAMES[base] || `Cơ số ${base}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="outlined"
                    onClick={onSwapBases}
                    sx={{ minWidth: 48, height: 56 }}
                    title="Hoán đổi hệ cơ số"
                  >
                    <Iconify icon="solar:transfer-horizontal-bold-duotone" />
                  </Button>

                  <FormControl sx={{ flex: 1 }}>
                    <InputLabel>Sang hệ cơ số</InputLabel>
                    <Select
                      value={toBase}
                      label="Sang hệ cơ số"
                      onChange={(e) => onToBaseChange(e.target.value as number)}
                    >
                      {ALL_BASES.map((base) => (
                        <MenuItem key={base} value={base}>
                          {base} - {BASE_NAMES[base] || `Cơ số ${base}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {inputValue && (
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'action.hover',
                      borderRadius: 1,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Chuyển đổi:
                    </Typography>
                    <Box component="div" sx={{ fontSize: '1.2rem' }}>
                      <InlineMath
                        math={`${inputValue}_{(${fromBase})} \\rightarrow ?_{(${toBase})}`}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Kết quả" />
            <CardContent>
              {result ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: 'primary.lighter',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'primary.main',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Kết quả chuyển đổi:
                    </Typography>
                    <Box component="div" sx={{ fontSize: '1.5rem', mb: 2 }}>
                      <InlineMath
                        math={`${inputValue}_{(${fromBase})} = ${result}_{(${toBase})}`}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Giá trị gốc
                        </Typography>
                        <Typography
                          variant="h5"
                          color="text.primary"
                          sx={{ fontFamily: 'monospace' }}
                        >
                          {inputValue}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({BASE_NAMES[fromBase] || `Cơ số ${fromBase}`})
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Kết quả
                        </Typography>
                        <Typography
                          variant="h5"
                          color="primary.main"
                          sx={{ fontFamily: 'monospace' }}
                        >
                          {result}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({BASE_NAMES[toBase] || `Cơ số ${toBase}`})
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'success.lighter',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'success.main',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Các hệ cơ số phổ biến:
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Chip
                        label="Nhị phân (2)"
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label="Bát phân (8)"
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label="Thập phân (10)"
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label="Thập lục phân (16)"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Iconify
                    icon="solar:restart-bold"
                    sx={{
                      width: 64,
                      height: 64,
                      color: 'text.disabled',
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    Nhập số để chuyển đổi
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Action buttons */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2, 
        mt: 2
      }}>
        <Button
          variant="contained"
          size="large"
          onClick={onConvert}
          startIcon={<Iconify icon="solar:restart-bold" />}
          sx={{ minWidth: 200 }}
        >
          Chuyển đổi
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={onReset}
          startIcon={<Iconify icon="solar:eraser-bold" />}
          sx={{ minWidth: 120 }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}


