import { CONFIG } from 'src/global-config';

import { FractionView } from 'src/sections/arithmetic/fraction-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Phân số - ${CONFIG.appName}` };

export default function Page() {
  return <FractionView />;
}
