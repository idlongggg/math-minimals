import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Hệ phương trình - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Hệ phương trình" />;
}
