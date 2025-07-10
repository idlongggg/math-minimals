import { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CloseIcon, SearchSparkleIcon } from 'src/assets/icons';


import { DatasetElectionTable, DatasetFootballTable, DatasetGdpTable } from '../data/_mock';
import ColumnMenu from './actions/column-menu';
import DataTable from './actions/data-table';
import DatasetSelector from './actions/dataset-selector';

// Cấu hình các dataset dùng cho DataGrid
export const datasets = [
  { key: 'gdp', label: DatasetGdpTable.title, data: DatasetGdpTable },
  { key: 'election', label: DatasetElectionTable.title, data: DatasetElectionTable },
  { key: 'football', label: DatasetFootballTable.title, data: DatasetFootballTable },
];

export default function ActionsTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = useState(400);
  // datasets đã được chuyển ra ngoài để dễ cấu hình
  const [selectedDatasetKey, setSelectedDatasetKey] = useState('gdp');
  const selectedDataset =
    datasets.find((d) => d.key === selectedDatasetKey)?.data || DatasetElectionTable;
  const [columns, setColumns] = useState(
    selectedDataset.columns.map((col: any) => ({
      ...col,
      editable: true,
      sortable: false,
      type: 'number', // Đảm bảo cell chỉ nhận số
      valueParser: (value: any) => {
        const parsed = Number(value);
        return isNaN(parsed) ? '' : parsed;
      },
    }))
  );
  const [rows, setRows] = useState(selectedDataset.rows);
  const [selectedRowIds, setSelectedRowIds] = useState<readonly (string | number)[]>([]);
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
      selectedDataset.columns.map((col: any) => ({
        ...col,
        editable: true,
        sortable: false,
        type: 'number',
        valueParser: (value: any) => {
          const parsed = Number(value);
          return isNaN(parsed) ? '' : parsed;
        },
      }))
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

  // Hàm tạo hàng mới với id duy nhất và các giá trị mặc định (rỗng)
  const handleAddRow = () => {
    // Lấy danh sách các field từ columns
    const fields = columns.map((col: any) => col.field);
    // Tìm id lớn nhất hiện tại
    const maxId = rows.length > 0 ? Math.max(...rows.map((row: any) => Number(row.id) || 0)) : 0;
    // Tạo hàng mới với id mới và các giá trị rỗng
    const newRow: any = { id: maxId + 1 };
    fields.forEach((field: string) => {
      if (field !== 'id') newRow[field] = '';
    });
    setRows((prevRows: any[]) => [...prevRows, newRow]);
  };

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
          <Button
            variant="outlined"
            color="success"
            onClick={handleAddRow}
          >
            Thêm hàng
          </Button>
          {selectedRowIds.length > 0 && (
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={() => {
                setRows((prevRows: any[]) =>
                  prevRows.filter((row: any) => !selectedRowIds.includes(row.id))
                );
                setSelectedRowIds([]);
              }}
            >
              Xóa hàng đã chọn
            </Button>
          )}
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
        checkboxSelection
        rowSelectionModel={selectedRowIds}
        onRowSelectionModelChange={setSelectedRowIds}
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
