import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Phân tích sigma - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Phân tích sigma" />;
}
