import { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

import { electionTable } from '../../../../../sections/statistics/data/electionTable.mock';

function ActionsTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = useState(400);
  // State for columns (allow dynamic headerName)
  const [columns] = useState(
    electionTable.columns.map((col) => ({ ...col, editable: true, sortable: false }))
  );
  // State for rows (to allow deleting rows)
  const [rows, setRows] = useState(electionTable.rows);
  // State for selected rows
  const [selectionModel, setSelectionModel] = useState<Array<number | string>>([]);
  // State for column menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuColField, setMenuColField] = useState<string | null>(null);

  useEffect(() => {
    function updateHeight() {
      const windowHeight = window.innerHeight;
      let containerHeight = 0;
      if (containerRef.current) {
        containerHeight = containerRef.current.getBoundingClientRect().top;
      }
      // Tính chiều cao còn lại: chiều cao thiết bị - vị trí top của container - header - content pt - content pb
      // header: var(--layout-header-desktop-height) = 64px
      // content pt: var(--layout-dashboard-content-pt) = 32px
      // content pb: var(--layout-dashboard-content-pb) = 32px
      // Scrollbar pt: 8px, pb: 8px, DataGrid Box mt: 16px
      // Tổng: 64 + 32 + 32 + 8 + 8 + 16 = 160
      setDataGridHeight(windowHeight - containerHeight - 160 + 20);
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Custom renderHeader for column menu
  const getColumnsWithMenu = () =>
    columns.map((col) => {
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
          {electionTable.title}
        </Typography>
        <Box ml={2} sx={{ display: 'flex', gap: 1 }}>
          {selectionModel.length > 0 && (
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<CloseIcon sx={{ fontSize: 18 }} />}
              onClick={() => {
                const count = selectionModel.length;
                const msg = count === 1 ? 'Bạn có chắc muốn xóa hàng đã chọn?' : `Bạn có chắc muốn xóa ${count} hàng đã chọn?`;
                if (!window.confirm(msg)) return;
                setRows((prevRows) => prevRows.filter((row) => !selectionModel.includes(row.id)));
                setSelectionModel([]);
              }}
            >
              {selectionModel.length === 1
                ? 'Xóa hàng đã chọn'
                : `Xóa ${selectionModel.length} hàng đã chọn`}
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SearchSparkleIcon sx={{ fontSize: 18 }} />}
            onClick={() => {
              // Hiển thị dữ liệu trên console tab (console.table)
              // eslint-disable-next-line no-console
              // @ts-ignore
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
          disableRowSelectionOnClick
          checkboxSelection
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(newSelection: any) => setSelectionModel(newSelection)}
          processRowUpdate={(newRow) => newRow}
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
              // TODO: Implement rename logic here (open dialog or inline input)
              setMenuAnchorEl(null);
              // You can set a state to show a rename dialog/input for menuColField
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

export default ActionsTab;
