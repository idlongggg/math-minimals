import { CONFIG } from 'src/global-config';

import { BasicCalculatorView } from 'src/sections/calculator/basic-calculator-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Máy tính cơ bản - ${CONFIG.appName}` };

export default function Page() {
  return <BasicCalculatorView />;
}
