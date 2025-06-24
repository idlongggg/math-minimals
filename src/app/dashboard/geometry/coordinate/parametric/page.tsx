import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Tọa độ tham số - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Tọa độ tham số" />;
}
