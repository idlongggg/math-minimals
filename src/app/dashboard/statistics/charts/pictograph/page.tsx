import { CONFIG } from 'src/global-config';
import { PictographView } from 'src/sections/statistics/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Biểu đồ tranh - ${CONFIG.appName}` };

export default function Page() {
  return <PictographView />;
}
