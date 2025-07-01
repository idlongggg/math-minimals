import { CONFIG } from 'src/global-config';
import { ToolsView } from 'src/sections/tools/tools-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Công cụ toán học - ${CONFIG.appName}` };

export default function Page() {
  return <ToolsView />;
}
