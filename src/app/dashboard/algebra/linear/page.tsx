import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Đại số tuyến tính - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Đại số tuyến tính" />;
}
