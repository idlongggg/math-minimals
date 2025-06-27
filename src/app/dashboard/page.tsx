import { CONFIG } from 'src/global-config';

import { DashboardDemoView } from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <DashboardDemoView />;
}
