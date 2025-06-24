import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Tối ưu hóa - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Tối ưu hóa" />;
}
