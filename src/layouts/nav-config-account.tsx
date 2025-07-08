import { Iconify } from 'src/components/iconify';

import type { AccountDrawerProps } from './components/account-drawer';

// ----------------------------------------------------------------------

export const _account: AccountDrawerProps['data'] = [
  { label: 'Home', href: '/', icon: <Iconify icon="solar:home-angle-bold-duotone" /> },
  {
    label: 'Profile',
    href: '/dashboard/user/profile',
    icon: <Iconify icon="solar:user-rounded-bold" />,
  },
  { label: 'Account Settings', href: '/dashboard/user/account', icon: <Iconify icon="solar:settings-bold-duotone" /> },
];
