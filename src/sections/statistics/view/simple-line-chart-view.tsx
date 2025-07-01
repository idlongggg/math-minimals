'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';
import { SimpleLineChart } from 'src/components/simple-line-chart';

export function SimpleLineChartView() {
  const theme = useTheme();

  return (
    <DashboardPageLayout
      title="Biểu đồ đường đơn giản"
      description="Tạo biểu đồ đường từ bảng dữ liệu có thể tùy chỉnh. Nhập dữ liệu vào bảng và xem biểu đồ được vẽ tự động bằng JSXGraph."
    >
      <Box
        sx={{
          transition: 'all 0.3s ease',
        }}
      >
        <SimpleLineChart
          id="simple-line-chart"
          width={800}
          height={500}
          title="Biểu đồ đường từ dữ liệu bảng"
        />
      </Box>
    </DashboardPageLayout>
  );
}
