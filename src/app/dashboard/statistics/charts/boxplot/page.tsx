import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Biểu đồ hộp - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Biểu đồ hộp" />;
}
