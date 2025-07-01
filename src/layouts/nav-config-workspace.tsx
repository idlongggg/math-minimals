import { CONFIG } from 'src/global-config';
import type { WorkspacesPopoverProps } from './components/workspaces-popover';

// ----------------------------------------------------------------------

export const _workspaces: WorkspacesPopoverProps['data'] = [
  {
    id: 'algebra-analysis',
    name: 'Đại số và Giải tích',
    plan: 'Sở hữu',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/logo-1.webp`,
  },
  {
    id: 'geometry-measurement',
    name: 'Hình học và Đo lường',
    plan: 'Sở hữu',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/logo-2.webp`,
  },
  {
    id: 'statistics-probability',
    name: 'Xác suất và Thống kê',
    plan: 'Chưa có',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/logo-3.webp`,
  },
];
