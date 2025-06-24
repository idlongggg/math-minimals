import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Biểu đồ cột đơn - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Biểu đồ cột đơn" />;
}
