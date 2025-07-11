import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { DatasetElection, DatasetFootball, DatasetGdp } from '../../data/_mock';

import type { LineChartData } from '../../data/table-types';

const DEFAULT_DATA: { key: string; label: string; table: LineChartData }[] = [
  { key: 'gdp', label: 'GDP', table: DatasetGdp },
  { key: 'election', label: 'Election', table: DatasetElection },
  { key: 'football', label: 'Football', table: DatasetFootball },
];

import React from 'react';

export default function ActionsTab() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = React.useState(400);

  const [selectedDatasetKey, setSelectedDatasetKey] = React.useState('gdp');
  const [table, setTable] = React.useState<LineChartData>(DatasetGdp);

  React.useEffect(() => {
    const found = DEFAULT_DATA.find((d) => d.key === selectedDatasetKey);
    if (found) {
      setTable(found.table);
    }
  }, [selectedDatasetKey]);

  React.useEffect(() => {
    function updateHeight() {
      const windowHeight = window.innerHeight;
      let containerHeight = 0;
      if (containerRef.current) {
        containerHeight = containerRef.current.getBoundingClientRect().top;
      }
      setDataGridHeight(windowHeight - containerHeight - 160);
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const columns = React.useMemo(() => {
    const cols = [{ field: 'x', headerName: '   '}];
    table.datasets.forEach((ds, idx) => {
      cols.push({
        field: ds.label,
        headerName: ds.label,
      });
    });
    return cols;
  }, [table]);

  const rows = React.useMemo(
    () =>
      table.labels.map((x, i) => {
        const row: { id: number; x: string | number; [key: string]: any } = { id: i, x };
        table.datasets.forEach((ds) => {
          row[ds.label] = ds.data[i];
        });
        return row;
      }),
    [table]
  );

  return (
    <Box ref={containerRef}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 120, width: 320 }}>
          <InputLabel id="dataset-select-label">Dataset</InputLabel>
          <Select
            labelId="dataset-select-label"
            value={selectedDatasetKey}
            label="Mẫu dữ liệu"
            onChange={(e) => setSelectedDatasetKey(e.target.value)}
          >
            {DEFAULT_DATA.map((d) => (
              <MenuItem key={d.key} value={d.key}>
                {d.table.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ height: dataGridHeight, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
