import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Xu hướng trung tâm - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Xu hướng trung tâm" />;
}
