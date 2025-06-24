import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Xác suất và thống kê - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Xác suất và thống kê" />;
}
