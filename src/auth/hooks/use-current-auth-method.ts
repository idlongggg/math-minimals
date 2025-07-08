import { useState, useEffect } from 'react';

import { getCurrentAuthMethod } from '../context/jwt/utils';

import type { AuthMethod } from '../context/jwt/constant';

// ----------------------------------------------------------------------

export function useCurrentAuthMethod() {
  const [currentAuthMethod, setCurrentAuthMethod] = useState<AuthMethod>(getCurrentAuthMethod());

  useEffect(() => {
    const checkAuthMethod = () => {
      const method = getCurrentAuthMethod();
      setCurrentAuthMethod(method);
    };

    // Check immediately
    checkAuthMethod();

    // Listen for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'auth_method') {
        checkAuthMethod();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return currentAuthMethod;
}
