'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { loading, authenticated } = useAuthContext();
  const urlSearchParams = useSearchParams();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Xác định đường dẫn chuyển hướng khi đã đăng nhập
  const getRedirectPathForAuthenticatedUser = () => {
    const returnTo = urlSearchParams.get('returnTo');
    if (returnTo) {
      return returnTo;
    }

    // Nếu có query parameters khác, bảo tồn chúng với defaultRedirectPath
    const allParams = urlSearchParams.toString();
    return allParams
      ? `${CONFIG.authentication.defaultRedirectPath}?${allParams}`
      : CONFIG.authentication.defaultRedirectPath;
  };

  const checkAuthenticationStatus = async (): Promise<void> => {
    if (loading) {
      return;
    }

    if (authenticated) {
      router.replace(getRedirectPathForAuthenticatedUser());
      return;
    }

    setIsCheckingAuth(false);
  };

  useEffect(() => {
    checkAuthenticationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isCheckingAuth) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
