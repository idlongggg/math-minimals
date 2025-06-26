'use client';

import { Box } from '@mui/material';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';
import { DynamicDataGridChart } from 'src/components/dynamic-data-grid-chart';

export function DynamicDataGridChartView() {
  return (
    <DashboardPageLayout
      title="Biểu đồ đường với DataGrid động"
      description="Tạo biểu đồ đường từ bảng dữ liệu có thể tùy chỉnh hoàn toàn. Thêm cột, định nghĩa kiểu dữ liệu, chọn trục X và Y, và xem biểu đồ được vẽ tự động bằng JSXGraph."
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        <DynamicDataGridChart
          id="dynamic-data-grid-chart"
          width={800}
          height={500}
          title="Biểu đồ đường từ DataGrid động"
        />
      </Box>
    </DashboardPageLayout>
  );
}
