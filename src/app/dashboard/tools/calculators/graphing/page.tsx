import { CONFIG } from 'src/global-config';

import { GraphingCalculatorView } from 'src/sections/tools';

// ----------------------------------------------------------------------

export const metadata = { title: `Máy tính đồ thị - ${CONFIG.appName}` };

export default function Page() {
  return <GraphingCalculatorView />;
}
