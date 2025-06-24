import { CONFIG } from 'src/global-config';

import { TestScrollView } from './view';

// ----------------------------------------------------------------------

export const metadata = { title: `Test Scroll - ${CONFIG.appName}` };

export default function Page() {
  return <TestScrollView />;
}
