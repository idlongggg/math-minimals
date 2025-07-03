import { CONFIG } from 'src/global-config';

import { FactorsIrrationalsView } from 'src/sections/arithmetic/factors-irrationals-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Thừa số và số vô tỷ - ${CONFIG.appName}` };

export default function Page() {
  return <FactorsIrrationalsView />;
}
