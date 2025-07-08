'use client';

import { GuestGuard } from 'src/auth/guard';
import { AuthSplitLayout } from 'src/layouts/auth-split';
import { useLocales } from 'src/locales/hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { translate } = useLocales();

  return (
    <GuestGuard>
      <AuthSplitLayout
        slotProps={{
          section: { title: translate('auth.welcome') },
        }}
      >
        {children}
      </AuthSplitLayout>
    </GuestGuard>
  );
}
