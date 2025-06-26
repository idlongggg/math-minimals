import { CONFIG } from 'src/global-config';
import { LineChartView } from 'src/sections/charts/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Biểu đồ đường - ${CONFIG.appName}` };

export default function Page() {
  return <LineChartView />;
}
