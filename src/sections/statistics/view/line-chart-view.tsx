'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { DynamicLineChart } from 'src/components/dynamic-line-chart';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

export function LineChartView() {
  const theme = useTheme();

  return (
    <DashboardPageLayout
      title="Biểu đồ đường"
      description="Tạo biểu đồ đường từ dữ liệu bảng động. Nhập dữ liệu và xem biểu đồ được vẽ tự động bằng JSXGraph."
    >
      <Box
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.vars?.customShadows?.z8 || theme.shadows[8],
          },
        }}
      >
        <DynamicLineChart
          id="line-chart-main"
          width={800}
          height={500}
          title="Biểu đồ đường từ dữ liệu bảng"
        />
      </Box>
    </DashboardPageLayout>
  );
}
