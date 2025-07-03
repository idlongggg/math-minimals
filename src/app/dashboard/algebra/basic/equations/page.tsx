import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Phương trình - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Phương trình" />;
}
