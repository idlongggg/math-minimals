import { BlockMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';

import type { HistoryEntry } from '../types';

interface HistoryPanelProps {
  title: string;
  history: HistoryEntry[];
  onClearHistory: () => void;
}

/**
 * Component hiển thị lịch sử tính toán và chuyển đổi
 * Cho phép xem lại các phép tính đã thực hiện trước đó
 */
export function HistoryPanel({
  title,
  history,
  onClearHistory,
}: HistoryPanelProps) {
  const formatTimestamp = (timestamp: Date): string =>
    timestamp.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4,
              color: 'text.secondary',
            }}
          >
            <Iconify
              icon="solar:clock-circle-bold"
              width={48}
              sx={{ mb: 2, opacity: 0.5 }}
            />
            <Typography variant="body2">Chưa có lịch sử nào</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={`${history.length} phép tính gần đây`}
        action={
          <Button onClick={onClearHistory} variant="outlined" size="small">
            <Iconify
              icon="solar:trash-bin-trash-bold"
              width={16}
              sx={{ mr: 0.5 }}
            />
            Xóa lịch sử
          </Button>
        }
      />

      <CardContent sx={{ pt: 0 }}>
        <List disablePadding>
          {history.map((entry, index) => (
            <Box key={entry.id}>
              <ListItem sx={{ px: 0, py: 2 }}>
                <ListItemText
                  primary={
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {formatTimestamp(entry.timestamp)}
                      </Typography>
                      <Box sx={{ my: 1 }}>
                        <Typography variant="body2" gutterBottom>
                          Biểu thức:
                        </Typography>
                        <Box
                          sx={{
                            bgcolor: 'grey.50',
                            p: 1,
                            borderRadius: 1,
                            mb: 1,
                          }}
                        >
                          <BlockMath math={entry.expression} />
                        </Box>
                        <Typography variant="body2" gutterBottom>
                          Kết quả:
                        </Typography>
                        <Box
                          sx={{
                            bgcolor: 'success.lighter',
                            p: 1,
                            borderRadius: 1,
                          }}
                        >
                          <BlockMath math={entry.result} />
                        </Box>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < history.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
