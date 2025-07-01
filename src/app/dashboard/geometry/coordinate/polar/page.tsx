import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Tọa độ cực - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Tọa độ cực" />;
}
