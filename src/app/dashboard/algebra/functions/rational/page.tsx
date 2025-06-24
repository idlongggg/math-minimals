import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Hàm hữu tỷ - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Hàm hữu tỷ" />;
}
