import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid, GridRowModel, GridRowSelectionModel } from '@mui/x-data-grid'; // Thêm GridRowSelectionModel

import { CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

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
  // Sửa kiểu dữ liệu thành GridRowSelectionModel
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);

  const [selectedDatasetKey, setSelectedDatasetKey] = React.useState('gdp');
  const [table, setTable] = React.useState<LineChartData>(DatasetGdp);

  React.useEffect(() => {
    const found = DEFAULT_DATA.find((d) => d.key === selectedDatasetKey);
    if (found) {
      setTable(found.table);
      setSelectedRows([]);
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

  const handleProcessRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const updatedTable = { ...table };
    const rowIndex = oldRow.id;
    
    if (newRow.x !== oldRow.x) {
      updatedTable.labels[rowIndex] = newRow.x;
    }
    
    table.datasets.forEach((dataset, datasetIndex) => {
      if (newRow[dataset.label] !== oldRow[dataset.label]) {
        const newData = [...updatedTable.datasets[datasetIndex].data];
        newData[rowIndex] = newRow[dataset.label];
        updatedTable.datasets[datasetIndex] = {
          ...dataset,
          data: newData
        };
      }
    });
    
    setTable(updatedTable);
    return newRow;
  };

  const handleDeleteSelectedRows = () => {
    if (selectedRows.length === 0) return;

    // Chuyển đổi sang Set<number> để xử lý
    const indicesToDelete = new Set(selectedRows.map(id => Number(id)));
    
    const newLabels = table.labels.filter((_, index) => !indicesToDelete.has(index));
    
    const newDatasets = table.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.filter((_, index) => !indicesToDelete.has(index))
    }));

    setTable({
      ...table,
      labels: newLabels,
      datasets: newDatasets
    });
    
    setSelectedRows([]);
  };

  const columns = React.useMemo(() => {
    const cols: any = [{ 
      field: 'x', 
      headerName: '   ', 
      editable: true
    }];
    
    table.datasets.forEach((ds) => {
      cols.push({
        field: ds.label,
        headerName: ds.label,
        editable: true,
        type: 'number',
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            onClick={handleDeleteSelectedRows}
            disabled={selectedRows.length === 0}
          >
            Xóa hàng
          </Button>
          <Button
            variant="contained"
            startIcon={<SearchSparkleIcon />}
            onClick={() => {
              console.log('View chart clicked', { selectedDatasetKey, table });
            }}
          >
            Xem biểu đồ
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: dataGridHeight, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          checkboxSelection
          disableRowSelectionOnClick
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={(error) => console.error(error)}
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </Box>
    </Box>
  );
}