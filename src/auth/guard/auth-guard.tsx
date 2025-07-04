'use client';

import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

/**
 * Auth Guard - Bảo vệ các route cần xác thực
 * Chuyển hướng đến trang đăng nhập nếu chưa xác thực
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const currentPathname = usePathname();
  const { authenticated, loading } = useAuthContext();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const createSignInRedirectPath = (signInPath: string) => {
    const returnToParam = new URLSearchParams({
      returnTo: currentPathname,
    }).toString();
    return `${signInPath}?${returnToParam}`;
  };

  const checkAuthenticationStatus = async (): Promise<void> => {
    if (loading) {
      return;
    }

    // Kiểm tra xem có bỏ qua xác thực không (cho development)
    if (CONFIG.authentication.skipAuthCompletely) {
      setIsCheckingAuth(false);
      return;
    }

    if (!authenticated) {
      const signInRedirectPath = createSignInRedirectPath(
        paths.auth.jwt.signIn
      );
      router.replace(signInRedirectPath);
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
