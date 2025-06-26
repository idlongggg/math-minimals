import { CONFIG } from 'src/global-config';

import { SimpleLineChartView } from 'src/sections/charts/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Line Chart - ${CONFIG.appName}` };

export default function Page() {
  return <SimpleLineChartView />;
}
