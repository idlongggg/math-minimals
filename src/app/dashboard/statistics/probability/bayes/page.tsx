import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Định lý Bayes - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Định lý Bayes" />;
}
