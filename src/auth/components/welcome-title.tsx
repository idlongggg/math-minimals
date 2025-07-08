'use client';

import { useLocales } from 'src/locales/hooks';

// ----------------------------------------------------------------------

export function WelcomeTitle() {
  const { translate } = useLocales();

  return translate('auth.welcome');
}
