import { CONFIG } from 'src/global-config';
import { BaseConversionView } from 'src/sections/arithmetic';

// ----------------------------------------------------------------------

export const metadata = { title: `Chuyển đổi hệ cơ số - ${CONFIG.appName}` };

export default function Page() {
  return <BaseConversionView />;
}
