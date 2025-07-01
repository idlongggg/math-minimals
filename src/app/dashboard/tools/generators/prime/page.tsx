import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Tạo số nguyên tố - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Tạo số nguyên tố" />;
}
