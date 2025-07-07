'use client';

import { useSetState } from 'minimal-shared/hooks';
import { useCallback, useEffect, useMemo } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { debugUserInfo, getEnhancedUser } from '../../utils';
import { AuthContext } from '../auth-context';
import { AUTH_METHOD_STORAGE_KEY, AUTH_METHODS, JWT_STORAGE_KEY } from './constant';
import { createMockUser, isValidToken, setSession } from './utils';

import type { AuthState } from '../../types';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);
      const authMethod = sessionStorage.getItem(AUTH_METHOD_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        if (authMethod === AUTH_METHODS.MOCK_JWT) {
          // Sử dụng mock JWT - lấy thông tin user từ token
          const mockUser = createMockUser(accessToken);
          const enhancedUser = getEnhancedUser(mockUser);
          debugUserInfo(enhancedUser, 'Mock JWT User');
          setState({ user: enhancedUser, loading: false });
        } else {
          // Sử dụng real JWT - gọi API để lấy thông tin user
          try {
            const res = await axios.get(endpoints.auth.me);
            const { user } = res.data;
            const enhancedUser = getEnhancedUser({ ...user, accessToken });
            debugUserInfo(enhancedUser, 'Real JWT User');
            setState({ user: enhancedUser, loading: false });
          } catch (error) {
            console.error('Error getting user info from API:', error);
            // Nếu API lỗi, thử decode token để lấy thông tin cơ bản
            try {
              const decodedToken = createMockUser(accessToken);
              const enhancedUser = getEnhancedUser(decodedToken);
              debugUserInfo(enhancedUser, 'Fallback JWT User');
              setState({ user: enhancedUser, loading: false });
            } catch (decodeError) {
              console.error('Error decoding token:', decodeError);
              setState({ user: null, loading: false });
            }
          }
        }
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error('Error during session check:', error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'admin' } : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
