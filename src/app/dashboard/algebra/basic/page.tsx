import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Đại số cơ bản - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Đại số cơ bản" />;
}
