import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Xác suất có điều kiện - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Xác suất có điều kiện" />;
}
