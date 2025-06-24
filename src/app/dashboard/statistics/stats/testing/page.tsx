import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Kiểm định thống kê - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Kiểm định thống kê" />;
}
