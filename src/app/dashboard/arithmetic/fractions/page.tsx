import { CONFIG } from 'src/global-config';
import { FractionView } from 'src/sections/arithmetic/fraction-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Phân số & Chuyển đổi - ${CONFIG.appName}` };

export default function Page() {
  return <FractionView />;
}
