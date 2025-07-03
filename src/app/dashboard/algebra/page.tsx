import { CONFIG } from 'src/global-config';

import { AlgebraView } from 'src/sections/algebra/algebra-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Đại số và giải tích - ${CONFIG.appName}` };

export default function Page() {
  return <AlgebraView />;
}
