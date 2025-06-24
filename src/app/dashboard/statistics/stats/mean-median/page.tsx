import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Trung bình và trung vị - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Trung bình và trung vị" />;
}
