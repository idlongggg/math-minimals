import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Nhân tử vô tỷ - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Nhân tử vô tỷ" />;
}
