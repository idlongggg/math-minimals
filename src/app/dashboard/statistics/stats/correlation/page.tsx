import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Hệ số tương quan - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Hệ số tương quan" />;
}
