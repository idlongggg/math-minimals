import { CONFIG } from 'src/global-config';
import { DivisorsMultiplesView } from 'src/sections/arithmetic';

// ----------------------------------------------------------------------

export const metadata = { title: `Ước số và bội số - ${CONFIG.appName}` };

export default function Page() {
  return <DivisorsMultiplesView />;
}
