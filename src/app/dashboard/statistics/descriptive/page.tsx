import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Thống kê mô tả - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Thống kê mô tả" />;
}
