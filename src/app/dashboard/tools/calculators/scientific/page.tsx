import { CONFIG } from 'src/global-config';

import { ScientificCalculatorView } from 'src/sections/tools';

// ----------------------------------------------------------------------

export const metadata = { title: `Máy tính khoa học - ${CONFIG.appName}` };

export default function Page() {
  return <ScientificCalculatorView />;
}
