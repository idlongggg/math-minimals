import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Mẫu số chung - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Mẫu số chung" />;
}
