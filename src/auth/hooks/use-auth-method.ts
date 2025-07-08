import { useState, useEffect } from 'react';

import { setAuthMethod, getCurrentAuthMethod } from '../context/jwt/utils';

import type { AuthMethod } from '../context/jwt/constant';

// ----------------------------------------------------------------------

export function useAuthMethod() {
  const [authMethod, setAuthMethodState] = useState<AuthMethod>(getCurrentAuthMethod());

  useEffect(() => {
    setAuthMethodState(getCurrentAuthMethod());
  }, []);

  const updateAuthMethod = (method: AuthMethod) => {
    setAuthMethod(method);
    setAuthMethodState(method);
  };

  return {
    authMethod,
    setAuthMethod: updateAuthMethod,
  };
}
