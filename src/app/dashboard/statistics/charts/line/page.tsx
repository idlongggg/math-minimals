import { CONFIG } from 'src/global-config';
import { DynamicDataGridChartView } from 'src/sections/charts/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Biểu đồ đường động - ${CONFIG.appName}` };

export default function Page() {
  return <DynamicDataGridChartView />;
}
