import { useEffect, useRef, useState } from 'react';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';


import { SearchSparkleIcon } from 'src/assets/icons';
import { DatasetElectionTable, DatasetFootballTable, DatasetGdpTable } from '../data/_mock';

export default function ActionsTab() {

  const containerRef = useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = useState(400);
  // Thêm các mẫu dữ liệu vào đây
  const datasets = [
    { key: 'election', label: DatasetElectionTable.title, data: DatasetElectionTable },
    { key: 'gdp', label: DatasetGdpTable.title, data: DatasetGdpTable },
    { key: 'football', label: DatasetFootballTable.title, data: DatasetFootballTable },
  ];
  const [selectedDatasetKey, setSelectedDatasetKey] = useState('election');
  const selectedDataset = datasets.find((d) => d.key === selectedDatasetKey)?.data || DatasetElectionTable;
  const [columns, setColumns] = useState(
    selectedDataset.columns.map((col: any) => ({ ...col, editable: true, sortable: false }))
  );
  const [rows, setRows] = useState(selectedDataset.rows);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuColField, setMenuColField] = useState<string | null>(null);

  useEffect(() => {
    function updateHeight() {
      const windowHeight = window.innerHeight;
      let containerHeight = 0;
      if (containerRef.current) {
        containerHeight = containerRef.current.getBoundingClientRect().top;
      }
      setDataGridHeight(windowHeight - containerHeight - 160 + 14);
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Khi đổi dataset thì cập nhật columns và rows
  useEffect(() => {
    setColumns(selectedDataset.columns.map((col: any) => ({ ...col, editable: true, sortable: false })));
    setRows(selectedDataset.rows);
  }, [selectedDatasetKey]);

  const getColumnsWithMenu = () =>
    columns.map((col: any) => {
      const renderHeader = (params: any) => (
        <span
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            setMenuAnchorEl(e.currentTarget);
            setMenuColField(col.field);
          }}
          title="Tùy chọn cột"
        >
          {col.headerName || col.field}
        </span>
      );
      return { ...col, renderHeader };
    });

  return (
    <Box ref={containerRef}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {selectedDataset.title}
        </Typography>
        <Box ml={2} sx={{ display: 'flex', gap: 1 }}>
          {/* Select để chọn dataset bằng Material UI */}
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel id="dataset-select-label">Chọn mẫu dữ liệu</InputLabel>
            <Select
              labelId="dataset-select-label"
              id="dataset-select"
              value={selectedDatasetKey}
              label="Chọn mẫu dữ liệu"
              onChange={(e) => setSelectedDatasetKey(e.target.value as string)}
            >
              {datasets.map((ds) => (
                <MenuItem key={ds.key} value={ds.key}>{ds.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SearchSparkleIcon sx={{ fontSize: 18 }} />}
            onClick={() => {
              console.table(rows);
            }}
          >
            Xem biểu đồ
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: dataGridHeight, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={getColumnsWithMenu()}
          hideFooterPagination
          checkboxSelection
        />
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={() => {
            setMenuAnchorEl(null);
            setMenuColField(null);
          }}
        >
          <MenuItem
            onClick={() => {
              setMenuAnchorEl(null);
              alert('Đổi tên cột: ' + menuColField);
            }}
          >
            Đổi tên cột
          </MenuItem>
          {/* Thêm các menu khác nếu muốn */}
        </Menu>
      </Box>
    </Box>
  );
}
