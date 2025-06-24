import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Tạo đồ thị - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Tạo đồ thị" />;
}
