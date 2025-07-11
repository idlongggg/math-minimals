import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type Dataset = {
  key: string;
  label: string;
};

interface DatasetSelectorProps {
  datasets: Dataset[];
  activeDatasetKey: string;
  selectDatasetByKey: (key: string) => void;
}

export default function DatasetSelector({
  datasets,
  activeDatasetKey,
  selectDatasetByKey,
}: DatasetSelectorProps) {
  return (
    <Box
      ml={2}
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      <FormControl size="small" sx={{ width: 320, minWidth: 0 }}>
        <InputLabel id="dataset-select-label">Chọn mẫu dữ liệu</InputLabel>
        <Select
          labelId="dataset-select-label"
          id="dataset-select"
          value={activeDatasetKey}
          label="Chọn mẫu dữ liệu"
          onChange={(e) => selectDatasetByKey(e.target.value as string)}
        >
          {datasets.map((ds) => (
            <MenuItem key={ds.key} value={ds.key}>
              {ds.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
