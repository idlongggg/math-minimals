import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Phép chia có dư - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Phép chia có dư" />;
}
