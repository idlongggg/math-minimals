import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Các dạng đường thẳng - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Các dạng đường thẳng" />;
}
