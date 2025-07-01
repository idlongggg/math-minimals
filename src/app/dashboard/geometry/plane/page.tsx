import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Hình học mặt phẳng - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Hình học mặt phẳng" />;
}
