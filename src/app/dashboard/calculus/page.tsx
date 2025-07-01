import { CONFIG } from 'src/global-config';
import { CalculusView } from 'src/sections/calculus/calculus-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Công cụ giải tích - ${CONFIG.appName}` };

export default function Page() {
  return <CalculusView />;
}
