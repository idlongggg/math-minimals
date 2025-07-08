import { HomeIcon, SettingsIcon, UserIcon } from 'src/assets/icons';

import type { AccountDrawerProps } from './components/account-drawer';

// ----------------------------------------------------------------------

export function getAccountData(t: (key: string) => string): AccountDrawerProps['data'] {
  return [
    { label: t('account.home'), href: '/', icon: <HomeIcon /> },
    {
      label: t('account.profile'),
      href: '/dashboard/user/profile',
      icon: <UserIcon />,
    },
    { 
      label: t('account.accountSettings'), 
      href: '/dashboard/user/account', 
      icon: <SettingsIcon /> 
    },
  ];
}
