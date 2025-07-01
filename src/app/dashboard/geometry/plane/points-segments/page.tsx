import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Điểm và đoạn thẳng - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Điểm và đoạn thẳng" />;
}
