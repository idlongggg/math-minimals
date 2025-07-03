import { CONFIG } from 'src/global-config';

import { DashboardOverviewView } from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <DashboardOverviewView />;
}
