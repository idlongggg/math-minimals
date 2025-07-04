// History component for base conversions

import { InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';

import { BASE_NAMES } from '../constants';

import type { HistoryItem } from '../types';

interface ConversionHistoryProps {
  history: HistoryItem[];
  onHistoryItemClick: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export function ConversionHistory({
  history,
  onHistoryItemClick,
  onClearHistory,
}: ConversionHistoryProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Lịch sử chuyển đổi</Typography>
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
              Chưa có lịch sử chuyển đổi
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Thực hiện chuyển đổi hệ cơ số để xem lịch sử tại đây
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
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        fontFamily: 'monospace',
                        fontSize: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 'bold' }}>
                        <InlineMath
                          math={`${item.input}_{(${item.fromBase})}`}
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
                          math={`${item.result}_{(${item.toBase})}`}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '0.8rem',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {BASE_NAMES[item.fromBase] || `Cơ số ${item.fromBase}`}
                      </Typography>
                      <Iconify
                        icon="eva:arrow-forward-fill"
                        sx={{ fontSize: 12, color: 'text.disabled' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {BASE_NAMES[item.toBase] || `Cơ số ${item.toBase}`}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.disabled">
                      {item.timestamp.toLocaleTimeString('vi-VN')}
                    </Typography>
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
