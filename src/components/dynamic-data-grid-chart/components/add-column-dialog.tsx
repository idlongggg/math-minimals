import { useState } from 'react';

import {
  Stack,
  Button,
  Dialog,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
} from '@mui/material';

interface AddColumnDialogProps {
  open: boolean;
  onClose: () => void;
  onAddColumn: (name: string, type: 'number' | 'string' | 'boolean') => boolean;
}

export function AddColumnDialog({
  open,
  onClose,
  onAddColumn,
}: AddColumnDialogProps) {
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<
    'number' | 'string' | 'boolean'
  >('number');

  const handleAddColumn = () => {
    const success = onAddColumn(newColumnName, newColumnType);
    if (success) {
      setNewColumnName('');
      setNewColumnType('number');
      onClose();
    }
  };

  const handleClose = () => {
    setNewColumnName('');
    setNewColumnType('number');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Thêm cột mới</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
          <TextField
            label="Tên cột"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            fullWidth
            autoFocus
          />
          <FormControl fullWidth>
            <InputLabel>Loại dữ liệu</InputLabel>
            <Select
              value={newColumnType}
              label="Loại dữ liệu"
              onChange={(e) => setNewColumnType(e.target.value as any)}
            >
              <MenuItem value="number">Số</MenuItem>
              <MenuItem value="string">Văn bản</MenuItem>
              <MenuItem value="boolean">True/False</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleAddColumn} variant="contained">
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
