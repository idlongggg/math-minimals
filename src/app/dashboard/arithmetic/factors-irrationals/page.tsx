import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Thừa số và số vô tỷ - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Thừa số và số vô tỷ" />;
}
