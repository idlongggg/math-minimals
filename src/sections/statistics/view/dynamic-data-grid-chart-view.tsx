'use client';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';
import { DynamicDataGridChart } from 'src/components/dynamic-data-grid-chart';

export function DynamicDataGridChartView() {
  return (
    <DashboardPageLayout
      title="Biểu đồ đường"
      description="Hiển thị dữ liệu dưới dạng biểu đồ đường với khả năng tùy chỉnh trục X, Y và các thông số hiển thị. Công cụ mạnh mẽ để phân tích xu hướng và so sánh dữ liệu theo thời gian."
      contentSx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <DynamicDataGridChart
        id="dynamic-data-grid-chart"
        width={800}
        height={500}
        title="Xu hướng bầu cử Đức (1949-2009)"
      />
    </DashboardPageLayout>
  );
}
