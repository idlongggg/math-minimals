import { CONFIG } from 'src/global-config';

import { DashboardOverviewView } from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: `Tổng quan Dashboard - ${CONFIG.appName}`,
  description: 'Trang tổng quan các công cụ toán học và thống kê sử dụng',
};

/**
 * Trang Dashboard chính - Hiển thị tổng quan toàn bộ hệ thống
 */
export default function DashboardHomePage() {
  return <DashboardOverviewView />;
}
