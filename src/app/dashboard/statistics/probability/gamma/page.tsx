import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Phân phối Gamma - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Phân phối Gamma" />;
}
