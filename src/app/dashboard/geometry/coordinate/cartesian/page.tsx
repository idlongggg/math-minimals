import { CONFIG } from 'src/global-config';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Tọa độ Descartes - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Tọa độ Descartes" />;
}
