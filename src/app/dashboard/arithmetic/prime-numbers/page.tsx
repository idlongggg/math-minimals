import { CONFIG } from 'src/global-config';

import { PrimeNumbersView } from 'src/sections/arithmetic';

// ----------------------------------------------------------------------

export const metadata = { title: `Số nguyên tố - ${CONFIG.appName}` };

export default function Page() {
  return <PrimeNumbersView />;
}
