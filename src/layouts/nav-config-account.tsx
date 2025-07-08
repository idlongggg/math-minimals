import { HomeIcon, UserIcon, SettingsIcon } from 'src/assets/icons';

import type { AccountDrawerProps } from './components/account-drawer';

// ----------------------------------------------------------------------

export const _account: AccountDrawerProps['data'] = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  {
    label: 'Profile',
    href: '/dashboard/user/profile',
    icon: <UserIcon />,
  },
  { label: 'Account Settings', href: '/dashboard/user/account', icon: <SettingsIcon /> },
];
