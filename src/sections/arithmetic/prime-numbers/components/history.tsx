// History component for prime number checks

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import type { HistoryItem } from '../types';

interface PrimeHistoryProps {
  history: HistoryItem[];
  onHistoryItemClick: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export function PrimeHistory({
  history,
  onHistoryItemClick,
  onClearHistory,
}: PrimeHistoryProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Lịch sử kiểm tra</Typography>
        {history.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={onClearHistory}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            Xóa lịch sử
          </Button>
        )}
      </Box>

      {history.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Iconify
              icon="solar:clock-circle-bold"
              sx={{ width: 64, height: 64, color: 'text.disabled', mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
              Chưa có lịch sử kiểm tra
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Thực hiện kiểm tra số nguyên tố để xem lịch sử tại đây
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {history.map((item) => (
            <Card
              key={item.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'primary.lighter',
                  borderColor: 'primary.main',
                },
              }}
              onClick={() => onHistoryItemClick(item)}
            >
              <CardContent sx={{ py: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                      {item.number}
                    </Typography>
                    <Chip
                      label={item.isPrime ? 'Số nguyên tố' : 'Hợp số'}
                      color={item.isPrime ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {item.timestamp.toLocaleTimeString('vi-VN')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
