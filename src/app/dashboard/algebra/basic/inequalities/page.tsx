import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Bất phương trình - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Bất phương trình" />;
}
