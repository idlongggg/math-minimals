import { CONFIG } from 'src/global-config';
import { StatisticsView } from 'src/sections/statistics/statistics-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Xác suất và thống kê - ${CONFIG.appName}` };

export default function Page() {
  return <StatisticsView />;
}
