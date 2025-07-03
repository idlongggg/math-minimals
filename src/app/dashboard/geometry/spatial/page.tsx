import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Hình học không gian - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Hình học không gian" />;
}
