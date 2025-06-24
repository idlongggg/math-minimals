import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Máy tính chuỗi - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Máy tính chuỗi" />;
}
