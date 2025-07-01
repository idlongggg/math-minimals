import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import type { ColumnDefinition } from '../types';

interface ChartDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  chartId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  columns: ColumnDefinition[];
  numericColumns: ColumnDefinition[];
  xAxisColumn: string;
  yAxisColumns: string[];
  onDeleteColumn: (columnId: string) => void;
  onSetXAxisColumn: (column: string) => void;
  onToggleYAxisColumn: (column: string) => void;
}

export function ChartDialog({
  open,
  onClose,
  title,
  chartId,
  containerRef,
  columns,
  numericColumns,
  xAxisColumn,
  yAxisColumns,
  onDeleteColumn,
  onSetXAxisColumn,
  onToggleYAxisColumn,
}: ChartDialogProps) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: 'background.default',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          p: 2,
        }}
      >
        {/* Dialog Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h4">{title}</Typography>
          <Button
            onClick={onClose}
            startIcon={<Iconify icon="solar:quit-full-screen-square-outline" />}
            variant="outlined"
          >
            Đóng
          </Button>
        </Box>

        {/* Chart Content */}
        <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
          {/* Controls Panel */}
          <Card sx={{ width: 380, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  Điều khiển biểu đồ
                </Typography>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Cột hiện có:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {columns.map((col) => (
                      <Chip
                        key={col.id}
                        label={`${col.headerName} (${col.type})`}
                        onDelete={
                          columns.length > 1
                            ? () => onDeleteColumn(col.id)
                            : undefined
                        }
                        color={col.type === 'number' ? 'primary' : 'default'}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Stack>
                </Box>

                {numericColumns.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Cấu hình biểu đồ:
                    </Typography>
                    <Stack spacing={2}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Trục X</InputLabel>
                        <Select
                          value={xAxisColumn}
                          label="Trục X"
                          onChange={(e) => onSetXAxisColumn(e.target.value)}
                        >
                          {numericColumns.map((col) => (
                            <MenuItem key={col.field} value={col.field}>
                              {col.headerName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Trục Y (có thể chọn nhiều):
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          {numericColumns.map((col) => (
                            <Chip
                              key={col.field}
                              label={col.headerName}
                              onClick={() => onToggleYAxisColumn(col.field)}
                              color={
                                yAxisColumns.includes(col.field)
                                  ? 'primary'
                                  : 'default'
                              }
                              variant={
                                yAxisColumns.includes(col.field)
                                  ? 'filled'
                                  : 'outlined'
                              }
                              size="small"
                            />
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                )}

                {yAxisColumns.length === 0 && (
                  <Alert severity="warning" sx={{ fontSize: '0.875rem' }}>
                    Chọn ít nhất một cột cho trục Y để hiển thị biểu đồ.
                  </Alert>
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* Chart Panel */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent
              sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {yAxisColumns.length === 0 ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Vui lòng chọn ít nhất một cột cho trục Y từ panel điều khiển
                  để hiển thị biểu đồ.
                </Alert>
              ) : (
                <Box
                  ref={containerRef}
                  sx={{
                    width: '100%',
                    flex: 1,
                    minHeight: 500,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                  }}
                >
                  <div id={chartId} style={{ width: '100%', height: '100%' }} />
                </Box>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                💡 Mẹo: Sử dụng chuột để phóng to/thu nhỏ và kéo để di chuyển
                biểu đồ. Bạn có thể chọn nhiều cột cho trục Y để so sánh dữ
                liệu.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Dialog>
  );
}
