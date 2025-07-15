export const JWT_STORAGE_KEY = 'jwt_access_token';

export const AUTH_METHOD_STORAGE_KEY = 'auth_method';

export const AUTH_METHODS = {
    JWT: 'jwt',
    MOCK_JWT: 'mock_jwt',
} as const;

export type AuthMethod = (typeof AUTH_METHODS)[keyof typeof AUTH_METHODS];
