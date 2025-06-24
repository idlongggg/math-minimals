import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Mẫu và phương sai - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Mẫu và phương sai" />;
}
