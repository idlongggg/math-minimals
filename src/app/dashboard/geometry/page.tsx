import { CONFIG } from 'src/global-config';
import { GeometryView } from 'src/sections/geometry/geometry-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Hình học và đo lường - ${CONFIG.appName}` };

export default function Page() {
  return <GeometryView />;
}
