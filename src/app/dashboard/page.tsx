import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
    return <BlankView title="Page one" />;
}
