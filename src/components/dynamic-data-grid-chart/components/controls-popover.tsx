import {
  Box,
  Chip,
  Alert,
  Stack,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import type { ColumnDefinition } from '../types';

interface ControlsPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  columns: ColumnDefinition[];
  numericColumns: ColumnDefinition[];
  xAxisColumn: string;
  yAxisColumns: string[];
  onDeleteColumn: (columnId: string) => void;
  onSetXAxisColumn: (column: string) => void;
  onToggleYAxisColumn: (column: string) => void;
  onOpenAddColumnDialog: () => void;
}

export function ControlsPopover({
  open,
  anchorEl,
  onClose,
  columns,
  numericColumns,
  xAxisColumn,
  yAxisColumns,
  onDeleteColumn,
  onSetXAxisColumn,
  onToggleYAxisColumn,
  onOpenAddColumnDialog,
}: ControlsPopoverProps) {
  return (
    <CustomPopover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      slotProps={{
        paper: {
          sx: { width: 380, maxHeight: 500, overflow: 'auto' },
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '1rem' }}>
              Điều khiển biểu đồ
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              onClick={onOpenAddColumnDialog}
              size="small"
            >
              Thêm cột
            </Button>
          </Box>

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
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
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
      </Box>
    </CustomPopover>
  );
}
