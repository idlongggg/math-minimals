import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Độ phân tán - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Độ phân tán" />;
}
