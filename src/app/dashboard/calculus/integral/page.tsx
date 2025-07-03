import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Tích phân - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Tích phân" />;
}
