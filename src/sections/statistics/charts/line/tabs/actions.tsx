import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { SearchSparkleIcon } from 'src/assets/icons';

import DataTable from './actions/data-table';
import ColumnMenu from './actions/column-menu';
import DatasetSelector from './actions/dataset-selector';
import { DatasetGdpTable, DatasetElectionTable, DatasetFootballTable } from '../data/_mock';

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
  const selectedDataset =
    datasets.find((d) => d.key === selectedDatasetKey)?.data || DatasetElectionTable;
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
      setDataGridHeight(windowHeight - containerHeight - 160);
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Khi đổi dataset thì cập nhật columns và rows
  useEffect(() => {
    setColumns(
      selectedDataset.columns.map((col: any) => ({ ...col, editable: true, sortable: false }))
    );
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
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchSparkleIcon sx={{ fontSize: 18 }} />}
            onClick={() => {
              console.table(rows);
            }}
          >
            Xem biểu đồ
          </Button>
          <DatasetSelector
            datasets={datasets}
            selectedDatasetKey={selectedDatasetKey}
            setSelectedDatasetKey={setSelectedDatasetKey}
          />
        </Box>
      </Box>
      <DataTable
        rows={rows}
        columns={columns}
        dataGridHeight={dataGridHeight}
        getColumnsWithMenu={getColumnsWithMenu}
      />
      <ColumnMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => {
          setMenuAnchorEl(null);
          setMenuColField(null);
        }}
        menuColField={menuColField}
      />
    </Box>
  );
}
