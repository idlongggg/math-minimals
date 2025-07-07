import { paths } from 'src/routes/paths';

import axios from 'src/lib/axios';

import { AUTH_METHOD_STORAGE_KEY, AUTH_METHODS, JWT_STORAGE_KEY } from './constant';

import type { AuthMethod } from './constant';

// ----------------------------------------------------------------------

// Mock JWT utilities
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export function generateMockJWT(): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    userId: '8864c717-587d-472a-929a-8e5f298024da-0',
    access: ['algebra', 'statistics'],
    iat: now,
    exp: now + (3 * 24 * 60 * 60), // 3 days
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  
  // For demo purposes, we'll use a simple signature
  const signature = base64UrlEncode('mock-signature-for-demo');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function createMockUser(token: string) {
  const decoded = jwtDecode(token);
  
  return {
    id: decoded.userId,
    displayName: 'Mock User',
    email: 'mock@example.com',
    photoURL: null,
    role: 'admin',
    access: decoded.access,
    accessToken: token,
  };
}

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || !('exp' in decoded)) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    try {
      alert('Token expired!');
      sessionStorage.removeItem(JWT_STORAGE_KEY);
      window.location.href = paths.auth.jwt.signIn;
    } catch (error) {
      console.error('Error during token expiration:', error);
      throw error;
    }
  }, timeLeft);
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null) {
  try {
    if (accessToken) {
      sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const decodedToken = jwtDecode(accessToken); // ~3 days by minimals server

      if (decodedToken && 'exp' in decodedToken) {
        tokenExpired(decodedToken.exp);
      } else {
        throw new Error('Invalid access token!');
      }
    } else {
      sessionStorage.removeItem(JWT_STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function getCurrentAuthMethod(): AuthMethod {
  if (typeof window !== 'undefined') {
    return (sessionStorage.getItem(AUTH_METHOD_STORAGE_KEY) as AuthMethod) || AUTH_METHODS.JWT;
  }
  return AUTH_METHODS.JWT;
}

export function setAuthMethod(method: AuthMethod): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(AUTH_METHOD_STORAGE_KEY, method);
  }
}

// ----------------------------------------------------------------------
