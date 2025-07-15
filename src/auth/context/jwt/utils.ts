import { paths } from 'src/routes/paths';

import axios from 'src/lib/axios';
import { createMockUser, generateMockJWT, jwtDecode as mockJwtDecode } from 'src/_mock/_jwt';

import { AUTH_METHODS, JWT_STORAGE_KEY, AUTH_METHOD_STORAGE_KEY } from './constant';

import type { AuthMethod } from './constant';

// ----------------------------------------------------------------------

// Re-export the mock JWT utilities
export { createMockUser, generateMockJWT };

export function jwtDecode(token: string) {
    return mockJwtDecode(token);
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
