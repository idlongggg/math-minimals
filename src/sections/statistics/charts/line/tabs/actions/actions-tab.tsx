import type { GridRowId, GridRowModel, GridColumnMenuProps } from '@mui/x-data-grid';

import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  AppBar,
  Select,
  Toolbar,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
} from '@mui/material';

import { CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

import CustomColumnMenu from './custom-column-menu';
import { DEFAULT_DATA } from './actions-tab-constants';

import type { LineChartData } from '../../data/table-types';

export default function ActionsTab() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = React.useState(400);
  const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [selectedDatasetKey, setSelectedDatasetKey] = React.useState('gdp');
  const [table, setTable] = React.useState<LineChartData>(DEFAULT_DATA[0].table);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
          data: newData,
        };
      }
    });

    setTable(updatedTable);
    return newRow;
  };

  const handleDeleteSelectedRows = () => {
    if (selectedRows.length === 0) return;

    const indicesToDelete = new Set(selectedRows);

    const newLabels = table.labels.filter((_, index) => !indicesToDelete.has(index));

    const newDatasets = table.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.filter((_, index) => !indicesToDelete.has(index)),
    }));

    setTable({
      ...table,
      labels: newLabels,
      datasets: newDatasets,
    });

    setSelectedRows([]);
  };

  const handleRenameColumn = (field: string, newName: string) => {
    const updatedTable = { ...table };

    const updatedDatasets = updatedTable.datasets.map((dataset) => {
      if (dataset.label === field) {
        return { ...dataset, label: newName };
      }
      return dataset;
    });

    setTable({
      ...updatedTable,
      datasets: updatedDatasets,
    });
  };

  const handleDeleteColumn = (field: string) => {
    if (field === 'x') return;

    const updatedTable = { ...table };

    const updatedDatasets = updatedTable.datasets.filter((dataset) => dataset.label !== field);

    setTable({
      ...updatedTable,
      datasets: updatedDatasets,
    });
  };

  const columns = React.useMemo(() => {
    const cols: any = [
      {
        field: 'x',
        headerName: '   ',
        editable: true,
        disableColumnMenu: true,
      },
    ];

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

  const CustomColumnMenuWithHandlers = (props: GridColumnMenuProps) => (
    <CustomColumnMenu
      {...props}
      onRenameColumn={handleRenameColumn}
      onDeleteColumn={handleDeleteColumn}
    />
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
              setOpenDialog(true);
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
            setSelectedRows(newSelection as GridRowId[]);
          }}
          slots={{
            columnMenu: CustomColumnMenuWithHandlers,
          }}
        />
      </Box>

      <Dialog
        fullScreen
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="chart-dialog-title"
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ ml: 2, flex: 1 }}>
              <strong>{table.title}</strong>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3, height: 'calc(100% - 64px)' }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.grey[100],
              borderRadius: 1,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>Biểu đồ sẽ được hiển thị ở đây.</Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
