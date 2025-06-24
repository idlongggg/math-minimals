import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Hình lập phương - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Hình lập phương" />;
}
