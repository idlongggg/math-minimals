import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Phương trình lượng giác - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Phương trình lượng giác" />;
}
