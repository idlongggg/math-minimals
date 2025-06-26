'use client';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';
import { DynamicLineChart } from 'src/components/dynamic-line-chart';

export function LineChartView() {
  return (
    <DashboardPageLayout
      title="Biểu đồ đường"
      description="Tạo biểu đồ đường từ dữ liệu bảng động. Nhập dữ liệu và xem biểu đồ được vẽ tự động bằng JSXGraph."
    >
      <DynamicLineChart
        id="line-chart-main"
        width={800}
        height={500}
        title="Biểu đồ đường từ dữ liệu bảng"
      />
    </DashboardPageLayout>
  );
}
