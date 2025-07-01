import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Góc và phép quay - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Góc và phép quay" />;
}
