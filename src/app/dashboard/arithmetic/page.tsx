import { CONFIG } from 'src/global-config';
import { ArithmeticView } from 'src/sections/arithmetic/arithmetic-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Số học cơ bản - ${CONFIG.appName}` };

export default function Page() {
  return <ArithmeticView />;
}
