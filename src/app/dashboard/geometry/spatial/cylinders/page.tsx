import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Hình trụ - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Hình trụ" />;
}
