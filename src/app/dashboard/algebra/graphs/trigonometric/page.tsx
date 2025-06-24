import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Đồ thị lượng giác - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Đồ thị lượng giác" />;
}
