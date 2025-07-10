import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { SearchSparkleIcon } from 'src/assets/icons';

import { electionTable } from '../../../../../sections/statistics/data/electionTable.mock';

function ActionsTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = useState(400);
  const [columns] = useState(
    electionTable.columns.map((col) => ({ ...col, editable: true, sortable: false }))
  );
  const [rows, setRows] = useState(electionTable.rows);
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

export default ActionsTab;
