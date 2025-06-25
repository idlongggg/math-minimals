import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Công cụ giải tích - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Công cụ giải tích" />;
}
