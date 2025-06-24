import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Ước và bội - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Ước và bội" />;
}
