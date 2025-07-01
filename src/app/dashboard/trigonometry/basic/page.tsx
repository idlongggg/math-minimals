import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Lượng giác cơ bản - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Lượng giác cơ bản" />;
}
