'use client';

import axios, { endpoints } from 'src/lib/axios';

import { MOCK_JWT_USERS } from 'src/_mock/_jwt';

import { AUTH_METHOD_STORAGE_KEY, AUTH_METHODS } from './constant';
import { generateMockJWT, setSession } from './utils';

import type { AuthMethod } from './constant';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
  authMethod?: AuthMethod;
  mockUserIndex?: number;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password, authMethod = AUTH_METHODS.JWT, mockUserIndex = 0 }: SignInParams): Promise<void> => {
  try {
    // Store auth method
    sessionStorage.setItem(AUTH_METHOD_STORAGE_KEY, authMethod);

    if (authMethod === AUTH_METHODS.MOCK_JWT) {
      // Mock JWT sign in with validation
      const selectedUser = MOCK_JWT_USERS[mockUserIndex];
      
      if (!selectedUser) {
        throw new Error('Invalid user selection');
      }

      // Validate email
      if (email !== selectedUser.email) {
        throw new Error('Invalid email address');
      }

      // Validate password - for mock, we accept multiple options:
      // 1. 'mock-password' (default)
      // 2. The same password as real JWT demo '@2Minimal'
      // 3. Simple password 'password'
      const validPasswords = ['mock-password', '@2Minimal', 'password'];
      if (!validPasswords.includes(password)) {
        throw new Error('Invalid password. Try: mock-password, @2Minimal, or password');
      }

      const mockToken = generateMockJWT(mockUserIndex);
      await setSession(mockToken);
      
      return;
    }

    // Original JWT sign in
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    // Set default auth method for sign up
    sessionStorage.setItem(AUTH_METHOD_STORAGE_KEY, AUTH_METHODS.JWT);

    const res = await axios.post(endpoints.auth.signUp, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    await setSession(accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
    sessionStorage.removeItem(AUTH_METHOD_STORAGE_KEY);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
