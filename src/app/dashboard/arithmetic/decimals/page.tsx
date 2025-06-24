import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Số thập phân - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Số thập phân" />;
}
