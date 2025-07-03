import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Lăng trụ - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Lăng trụ" />;
}
