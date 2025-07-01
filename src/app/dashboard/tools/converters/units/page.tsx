import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Chuyển đổi đơn vị - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Chuyển đổi đơn vị" />;
}
