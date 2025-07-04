import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { DATASET_LABELS } from '../constants';

import type { DataSetKey, PictographActions } from '../types';

interface DataSetSelectorProps {
  selectedDataSet: DataSetKey;
  useCustomData: boolean;
  onDataSetChange: PictographActions['setSelectedDataSet'];
  onToggleCustomData: PictographActions['setUseCustomData'];
}

export function DataSetSelector({
  selectedDataSet,
  useCustomData,
  onDataSetChange,
  onToggleCustomData,
}: DataSetSelectorProps) {
  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Button
          variant={!useCustomData ? 'contained' : 'outlined'}
          onClick={() => onToggleCustomData(false)}
          size="small"
        >
          Mẫu có sẵn
        </Button>
        <Button
          variant={useCustomData ? 'contained' : 'outlined'}
          onClick={() => onToggleCustomData(true)}
          size="small"
        >
          Tự tạo
        </Button>
      </Box>

      {!useCustomData && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Chọn bộ dữ liệu</InputLabel>
          <Select
            value={selectedDataSet}
            label="Chọn bộ dữ liệu"
            onChange={(e) => onDataSetChange(e.target.value as DataSetKey)}
          >
            {Object.entries(DATASET_LABELS).map(([key, label]) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}
