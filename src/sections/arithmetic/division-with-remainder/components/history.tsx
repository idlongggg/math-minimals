// History component for division calculations

import { InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

import type { HistoryItem } from '../types';

interface DivisionHistoryProps {
  history: HistoryItem[];
  onHistoryItemClick: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export function DivisionHistory({
  history,
  onHistoryItemClick,
  onClearHistory,
}: DivisionHistoryProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Lịch sử tính toán</Typography>
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
              Chưa có lịch sử tính toán
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Thực hiện phép chia để xem lịch sử tại đây
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
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        fontFamily: 'monospace',
                        fontSize: '1rem',
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 'bold' }}>
                        <InlineMath
                          math={`${item.dividend} \\div ${item.divisor}`}
                        />
                      </Box>
                      <Iconify
                        icon="eva:arrow-forward-fill"
                        sx={{ color: 'text.secondary' }}
                      />
                      <Box
                        component="span"
                        sx={{ fontWeight: 'bold', color: 'primary.main' }}
                      >
                        <InlineMath
                          math={`${item.result.quotient} \\text{ dư } ${item.result.remainder}`}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {item.timestamp.toLocaleTimeString('vi-VN')}
                    </Typography>
                    <Iconify
                      icon="eva:arrow-forward-fill"
                      sx={{ color: 'text.disabled' }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
