'use client';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';
import { DynamicDataGridChart } from 'src/components/dynamic-data-grid-chart';

export function DynamicDataGridChartView() {
  return (
    <DashboardPageLayout
      title="Biểu đồ đường với DataGrid động"
      description="Tạo biểu đồ đường từ bảng dữ liệu có thể tùy chỉnh hoàn toàn. Thêm cột, định nghĩa kiểu dữ liệu, chọn trục X và Y, và xem biểu đồ được vẽ tự động bằng JSXGraph."
      contentSx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)', // Cố định chiều cao theo viewport, trừ đi header
        overflow: 'hidden',
      }}
    >
      <DynamicDataGridChart
        id="dynamic-data-grid-chart"
        width={800}
        height={500}
        title="Biểu đồ đường từ DataGrid động"
      />
    </DashboardPageLayout>
  );
}
