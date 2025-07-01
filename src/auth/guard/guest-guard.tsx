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

  const searchParams = useSearchParams();

  // Bảo tồn tất cả query parameters hoặc sử dụng redirectPath mặc định
  const getRedirectPath = () => {
    const returnTo = searchParams.get('returnTo');
    if (returnTo) {
      return returnTo;
    }

    // Nếu có query parameters khác, bảo tồn chúng với redirectPath
    const allParams = searchParams.toString();
    return allParams
      ? `${CONFIG.auth.redirectPath}?${allParams}`
      : CONFIG.auth.redirectPath;
  };

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    if (authenticated) {
      router.replace(getRedirectPath());
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
