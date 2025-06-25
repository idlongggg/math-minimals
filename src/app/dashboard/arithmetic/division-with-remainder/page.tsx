import { CONFIG } from 'src/global-config';

import { DivisionWithRemainderView } from 'src/sections/arithmetic';

// ----------------------------------------------------------------------

export const metadata = { title: `Phép chia có dư - ${CONFIG.appName}` };

export default function Page() {
  return <DivisionWithRemainderView />;
}
