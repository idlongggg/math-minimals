import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Đa thức nội suy - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Đa thức nội suy" />;
}
