import { CONFIG } from 'src/global-config';

import { TrigonometryView } from 'src/sections/trigonometry/trigonometry-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Lượng giác - ${CONFIG.appName}` };

export default function Page() {
  return <TrigonometryView />;
}
