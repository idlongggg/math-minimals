import { CONFIG } from 'src/global-config';

import type { WorkspacesPopoverProps } from './components/workspaces-popover';

// ----------------------------------------------------------------------

export const _workspaces: WorkspacesPopoverProps['data'] = [
  {
    id: 'all-tools',
    name: 'Tất cả công cụ toán học',
    plan: '',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/all-tools.svg`,
  },
  {
    id: 'algebra',
    name: 'Đại số và giải tích',
    plan: 'Sở hữu',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/algebra.svg`,
  },
  {
    id: 'statistics',
    name: 'Xác suất và thống kê',
    plan: 'Sở hữu',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/statistics.svg`,
  },
  {
    id: 'geometry',
    name: 'Hình học và đo lường',
    plan: 'Chưa sở hữu',
    logo: `${CONFIG.assetsDir}/assets/icons/workspaces/geometry.svg`,
  },
];
