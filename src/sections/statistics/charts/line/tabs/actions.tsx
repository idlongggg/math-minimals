
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import { actionsColumns, actionsRows } from './actionsTableData';


function ActionsTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = useState(400);

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

  return (
    <Box ref={containerRef}>
      <Typography variant="h6" gutterBottom>
        Thao tác
      </Typography>
      <Box sx={{ height: dataGridHeight, width: '100%', mt: 2 }}>
        <DataGrid rows={actionsRows} columns={actionsColumns} hideFooterPagination disableRowSelectionOnClick />
      </Box>
    </Box>
  );
}

export default ActionsTab;
