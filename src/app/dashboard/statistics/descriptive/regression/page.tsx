import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Hồi quy - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Hồi quy" />;
}
