import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Giới hạn - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Giới hạn" />;
}
