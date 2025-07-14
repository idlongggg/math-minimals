import type { GridColDef, GridColumnMenuProps, GridRowId, GridRowModel } from '@mui/x-data-grid';
import type { ApexOptions } from 'apexcharts';

import dynamic from 'next/dynamic';
import React from 'react';

import {
    AppBar,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

import { AddIcon, CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

import { DEFAULT_DATA, EMPTY_TABLE } from './actions-tab-constants';
import CustomColumnMenu from './custom-column-menu';

import type { LineChartData } from './data/table-types';

// Dynamic import để tránh lỗi server-side rendering
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ActionsTab() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = React.useState(400);
  const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openAddColumnDialog, setOpenAddColumnDialog] = React.useState(false);
  const [newColumnName, setNewColumnName] = React.useState('');
  const [selectedDatasetKey, setSelectedDatasetKey] = React.useState('election');
  const [table, setTable] = React.useState<LineChartData>(EMPTY_TABLE);

  const theme = useTheme();

  React.useEffect(() => {
    if (selectedDatasetKey === 'blank') {
      setTable(EMPTY_TABLE);
      setSelectedRows([]);
    } else {
      const found = DEFAULT_DATA.find((d) => d.key === selectedDatasetKey);
      if (found) {
        setTable(found.table);
        setSelectedRows([]);
      }
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

  const handleAddNewRow = () => {
    const newLabels = [...table.labels, ''];
    const newDatasets = table.datasets.map((dataset) => ({
      ...dataset,
      data: [...dataset.data, 0],
    }));

    setTable({
      ...table,
      labels: newLabels,
      datasets: newDatasets,
    });
  };

  const handleAddNewColumn = () => {
    if (!newColumnName.trim()) return;

    const newDatasets = [
      ...table.datasets,
      {
        label: newColumnName,
        data: Array(table.labels.length).fill(0),
      },
    ];

    setTable({
      ...table,
      datasets: newDatasets,
    });

    setNewColumnName('');
    setOpenAddColumnDialog(false);
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

  const columns: GridColDef[] = React.useMemo(() => {
    const cols: GridColDef[] = [
      {
        field: 'x',
        headerName: '   ',
        editable: true,
        disableColumnMenu: true,
        type: 'string',
      },
    ];

    return [
      ...cols,
      ...table.datasets.map((ds) => ({
        field: ds.label,
        headerName: ds.label,
        editable: true,
        type: 'number' as const,
      })),
    ];
  }, [table]);

  const rows = React.useMemo(
    () =>
      table.labels.map((x, i) => {
        const row: Record<string, any> = { id: i, x };
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

  // Chuẩn bị dữ liệu cho ApexCharts
  const chartOptions: ApexOptions = React.useMemo(
    () => ({
      chart: {
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      xaxis: {
        categories: table.labels,
        title: {
          text: table.xAxisTitle || 'X Axis',
          style: {
            fontFamily: theme.typography.fontFamily, // Áp dụng font hệ thống
          },
        },
        labels: {
          style: {
            fontFamily: theme.typography.fontFamily, // Áp dụng font hệ thống
          },
        },
      },
      yaxis: {
        title: {
          text: table.yAxisTitle || 'Y Axis',
          style: {
            fontFamily: theme.typography.fontFamily, // Áp dụng font hệ thống
          },
        },
        labels: {
          style: {
            fontFamily: theme.typography.fontFamily, // Áp dụng font hệ thống
            colors: theme.palette.text.primary, // Sử dụng màu chữ chính của theme
          },
        },
      },
      legend: {
        fontFamily: theme.typography.fontFamily, // Áp dụng font hệ thống
      },
      tooltip: {
        theme: theme.palette.background.default, // Sử dụng chế độ màu của theme
        style: {
            fontFamily: theme.typography.fontFamily, // Áp dụng font hệ thống
        },
      },
    }),
    [table]
  );

  const chartSeries = React.useMemo(
    () =>
      table.datasets.map((dataset) => ({
        name: dataset.label,
        data: dataset.data,
      })),
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
            <MenuItem value="blank" sx={{ fontStyle: 'italic' }}>
              Bảng dữ liệu trống
            </MenuItem>
            <Divider />
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
            color="success"
            startIcon={<AddIcon />}
            onClick={handleAddNewRow}
          >
            Thêm hàng
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddColumnDialog(true)}
          >
            Thêm cột
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchSparkleIcon />}
            onClick={() => setOpenDialog(true)}
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
          onProcessRowUpdateError={console.error}
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(rowSelectionModel) => setSelectedRows([...rowSelectionModel])}
          slots={{ columnMenu: CustomColumnMenuWithHandlers }}
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
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={() => setOpenDialog(false)}
            >
              Đóng
            </Button>
            <Box sx={{ ml: 2, flex: 1 }}>
              <strong>{table.title}</strong>
            </Box>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 3 }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 1,
            }}
          >
            {table.datasets.length > 0 && table.labels.length > 0 ? (
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  height="100%"
                />
              </Box>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  p: 3,
                  color: theme.palette.text.primary,
                }}
              >
                <Box>
                  <Box sx={{ fontSize: 18, fontWeight: 'medium', mb: 1 }}>
                    Chưa có dữ liệu để hiển thị
                  </Box>
                  <Box sx={{ color: theme.palette.text.secondary }}>
                    Hãy thêm dữ liệu hoặc chọn một dataset khác
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openAddColumnDialog}
        onClose={() => setOpenAddColumnDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Thêm cột mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên cột"
            fullWidth
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddColumnDialog(false)}>Hủy</Button>
          <Button onClick={handleAddNewColumn} variant="contained" disabled={!newColumnName.trim()}>
            Thêm cột
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
