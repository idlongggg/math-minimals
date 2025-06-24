import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Xác suất cơ bản - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Xác suất cơ bản" />;
}
