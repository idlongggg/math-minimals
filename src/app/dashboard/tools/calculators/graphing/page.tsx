import { CONFIG } from 'src/global-config';

import { GraphingCalculatorView } from 'src/sections/calculator';

// ----------------------------------------------------------------------

export const metadata = { title: `Máy tính đồ thị - ${CONFIG.appName}` };

export default function Page() {
  return <GraphingCalculatorView />;
}
