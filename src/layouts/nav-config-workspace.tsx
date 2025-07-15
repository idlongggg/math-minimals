import { CONFIG } from 'src/global-config';

import type { WorkspacesPopoverProps } from './components/workspaces-popover';

// ----------------------------------------------------------------------

export function getWorkspacesData(t: (key: string) => string): WorkspacesPopoverProps['data'] {
    return [
        {
            id: 'all-tools',
            name: t('workspace.allTools'),
            logo: `${CONFIG.assetsDir}/assets/icons/workspaces/all-tools.svg`,
        },
        {
            id: 'algebra',
            name: t('workspace.algebra'),
            logo: `${CONFIG.assetsDir}/assets/icons/workspaces/algebra.svg`,
        },
        {
            id: 'statistics',
            name: t('workspace.statistics'),
            logo: `${CONFIG.assetsDir}/assets/icons/workspaces/statistics.svg`,
        },
        {
            id: 'geometry',
            name: t('workspace.geometry'),
            logo: `${CONFIG.assetsDir}/assets/icons/workspaces/geometry.svg`,
        },
    ];
}
