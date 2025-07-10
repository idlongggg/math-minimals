import { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

import DataTable from './actions/data-table';
// import ColumnMenu from './actions/column-menu';
import { DatasetElectionTable, DatasetFootballTable, DatasetGdpTable } from '../data/_mock';
import DatasetSelector from './actions/dataset-selector';

// Thêm các mẫu dữ liệu vào đây
const datasets = [
  { key: 'gdp', label: DatasetGdpTable.title, data: DatasetGdpTable },
  { key: 'election', label: DatasetElectionTable.title, data: DatasetElectionTable },
  { key: 'football', label: DatasetFootballTable.title, data: DatasetFootballTable },
];

export default function ActionsTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = useState(400);
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

  // Xử lý đổi tên cột
  const handleRenameColumn = (field: string, newHeaderName: string) => {
    // Đổi cả field (key) và headerName nếu cần
    // Tạo field mới từ headerName
    let baseField = newHeaderName.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    if (!baseField) baseField = 'col';
    let newField = baseField;
    let suffix = 1;
    while (columns.some((col: any) => col.field === newField)) {
      if (newField === field) break; // Cho phép giữ nguyên nếu chỉ đổi headerName
      newField = `${baseField}_${suffix}`;
      suffix++;
    }
    setColumns((prevCols: any[]) =>
      prevCols.map((col: any) =>
        col.field === field ? { ...col, headerName: newHeaderName, field: newField } : col
      )
    );
    // Đổi key trong từng row
    if (newField !== field) {
      setRows((prevRows: any[]) =>
        prevRows.map((row: any) => {
          if (!(field in row)) return row;
          const { [field]: oldValue, ...rest } = row;
          return { ...rest, [newField]: oldValue };
        })
      );
    }
  };

  // Xử lý ẩn cột
  const handleHideColumn = (field: string) => {
    setColumns((prevCols: any[]) => prevCols.filter((col: any) => col.field !== field));
    setRows((prevRows: any[]) =>
      prevRows.map((row: any) => {
        const { [field]: _, ...rest } = row;
        return rest;
      })
    );
  };

  // Hàm tạo hàng mới với id duy nhất và các giá trị mặc định (rỗng)
  const handleAddRow = () => {
    // Lấy danh sách các field từ columns
    const fields = columns.map((col: any) => col.field);
    // Tìm id lớn nhất hiện tại
    const maxId = rows.length > 0 ? Math.max(...rows.map((row: any) => Number(row.id) || 0)) : 0;
    // Tạo hàng mới với id mới và các giá trị undefined (trừ id)
    const newRow: any = { id: maxId + 1 };
    fields.forEach((field: string) => {
      if (field !== 'id') newRow[field] = undefined;
    });
    setRows((prevRows: any[]) => [...prevRows, newRow]);
  };

  // State cho popover thêm cột
  const [addColAnchorEl, setAddColAnchorEl] = useState<null | HTMLElement>(null);
  const [newColName, setNewColName] = useState('');
  const [newColError, setNewColError] = useState('');

  // Hàm xác nhận thêm cột mới
  const handleConfirmAddColumn = () => {
    // Tên field sẽ là tên cột viết thường, thay khoảng trắng bằng _ và loại bỏ ký tự đặc biệt
    let baseField = newColName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
    if (!baseField) baseField = 'col';
    let newField = baseField;
    let suffix = 1;
    while (columns.some((col: any) => col.field === newField)) {
      newField = `${baseField}_${suffix}`;
      suffix++;
    }
    // Nếu tên cột rỗng hoặc đã tồn tại
    if (!newColName.trim()) {
      setNewColError('Tên cột không được để trống');
      return;
    }
    if (columns.some((col: any) => col.headerName === newColName.trim())) {
      setNewColError('Tên cột đã tồn tại');
      return;
    }
    const newCol = {
      field: newField,
      headerName: newColName.trim(),
      editable: true,
      sortable: false,
      type: 'number',
      valueParser: (value: any) => {
        const parsed = Number(value);
        return isNaN(parsed) ? '' : parsed;
      },
    };
    setColumns((prevCols: any[]) => [...prevCols, newCol]);
    // Thêm giá trị undefined cho cột mới vào tất cả các hàng hiện tại để đảm bảo đúng kiểu số
    setRows((prevRows: any[]) => prevRows.map((row: any) => ({ ...row, [newField]: undefined })));
    setAddColAnchorEl(null);
    setNewColName('');
    setNewColError('');
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
          <Button variant="outlined" color="success" onClick={handleAddRow}>
            Thêm hàng
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={(e) => {
              setAddColAnchorEl(e.currentTarget);
              setNewColName('');
              setNewColError('');
            }}
          >
            Thêm cột
          </Button>
          <Popover
            open={Boolean(addColAnchorEl)}
            anchorEl={addColAnchorEl}
            onClose={() => {
              setAddColAnchorEl(null);
              setNewColName('');
              setNewColError('');
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Box sx={{ p: 2, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                label="Tên cột mới"
                value={newColName}
                onChange={(e) => {
                  setNewColName(e.target.value);
                  setNewColError('');
                }}
                error={!!newColError}
                helperText={newColError}
                size="small"
                autoFocus
              />
              <Button variant="contained" onClick={handleConfirmAddColumn}>
                Xác nhận
              </Button>
            </Box>
          </Popover>
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
        columns={getColumnsWithMenu()}
        dataGridHeight={dataGridHeight}
        checkboxSelection
        rowSelectionModel={selectedRowIds}
        onRowSelectionModelChange={setSelectedRowIds}
        onCellEditCommit={(params: any) => {
          setRows((prevRows: any[]) =>
            prevRows.map((row: any) => (row.id === params.id ? { ...row, ...params } : row))
          );
        }}
        columnMenuProps={{
          onRenameColumn: handleRenameColumn,
          onHideColumn: handleHideColumn,
        }}
      />
      {/*
      <ColumnMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => {
          setMenuAnchorEl(null);
          setMenuColField(null);
        }}
        menuColField={menuColField}
      />
      */}
    </Box>
  );
}
