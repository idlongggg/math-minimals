import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Biểu đồ đường - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Biểu đồ đường" />;
}
