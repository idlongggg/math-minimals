// Prime range finder component

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

interface PrimeRangeFinderProps {
  rangeStart: string;
  rangeEnd: string;
  primesInRange: number[];
  error: string;
  onRangeStartChange: (value: string) => void;
  onRangeEndChange: (value: string) => void;
  onFindPrimes: () => void;
  onPrimeClick: (prime: number) => void;
}

export function PrimeRangeFinder({
  rangeStart,
  rangeEnd,
  primesInRange,
  error,
  onRangeStartChange,
  onRangeEndChange,
  onFindPrimes,
  onPrimeClick,
}: PrimeRangeFinderProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Tìm số nguyên tố trong khoảng" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <TextField
                label="Từ số"
                value={rangeStart}
                onChange={(e) => onRangeStartChange(e.target.value)}
                placeholder="0"
                type="number"
                sx={{ flex: 1 }}
              />
              <Typography variant="h6" sx={{ mx: 1 }}>
                đến
              </Typography>
              <TextField
                label="Đến số"
                value={rangeEnd}
                onChange={(e) => onRangeEndChange(e.target.value)}
                placeholder="100"
                type="number"
                sx={{ flex: 1 }}
              />
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={onFindPrimes}
              startIcon={<Iconify icon="solar:list-bold" />}
              sx={{ alignSelf: 'center', minWidth: 200 }}
            >
              Tìm số nguyên tố
            </Button>

            {error && <Alert severity="error">{error}</Alert>}

            {primesInRange.length > 0 && (
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">
                        Tìm thấy {primesInRange.length} số nguyên tố
                      </Typography>
                      <Chip
                        label={`Từ ${rangeStart} đến ${rangeEnd}`}
                        color="primary"
                        size="small"
                      />
                    </Box>
                  }
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      maxHeight: 300,
                      overflow: 'auto',
                    }}
                  >
                    {primesInRange.map((prime) => (
                      <Chip
                        key={prime}
                        label={prime}
                        variant="outlined"
                        color="primary"
                        onClick={() => onPrimeClick(prime)}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
