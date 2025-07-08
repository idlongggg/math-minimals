'use client';

import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { authenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const createRedirectPath = (currentPath: string) => {
    const params = new URLSearchParams({ returnTo: pathname });

    // Preserve workspace parameter from current URL
    const currentParams = new URLSearchParams(window.location.search);
    const workspaceParam = currentParams.get('workspace');
    if (workspaceParam) {
      params.set('workspace', workspaceParam);
    }

    return `${currentPath}?${params.toString()}`;
  };

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    if (!authenticated) {
      // Only JWT auth is supported
      const signInPath = paths.auth.jwt.signIn;
      const redirectPath = createRedirectPath(signInPath);

      router.replace(redirectPath);

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
