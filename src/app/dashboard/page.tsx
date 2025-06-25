import { CONFIG } from 'src/global-config';

import { Windows11ShadowShowcase } from 'src/components/windows11-shadow-showcase';
import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <BlankView title="Dashboard" />
      <Windows11ShadowShowcase />
    </>
  );
}
