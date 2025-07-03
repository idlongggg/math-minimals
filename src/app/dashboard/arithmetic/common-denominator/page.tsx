import { CONFIG } from 'src/global-config';

import { CommonDenominatorView } from 'src/sections/arithmetic/common-denominator-view-refactored';

// ----------------------------------------------------------------------

export const metadata = { title: `Mẫu số chung - ${CONFIG.appName}` };

export default function Page() {
  return <CommonDenominatorView />;
}
