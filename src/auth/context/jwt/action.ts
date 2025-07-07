'use client';

import axios, { endpoints } from 'src/lib/axios';

import { AUTH_METHOD_STORAGE_KEY, AUTH_METHODS, JWT_STORAGE_KEY } from './constant';
import { createMockUser, generateMockJWT, setSession } from './utils';

import type { AuthMethod } from './constant';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
  authMethod?: AuthMethod;
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
export const signInWithPassword = async ({ email, password, authMethod = AUTH_METHODS.JWT }: SignInParams): Promise<void> => {
  try {
    // Store auth method
    sessionStorage.setItem(AUTH_METHOD_STORAGE_KEY, authMethod);

    if (authMethod === AUTH_METHODS.MOCK_JWT) {
      // Mock JWT sign in
      const mockToken = generateMockJWT();
      await setSession(mockToken);
      
      // Store mock user data
      const mockUser = createMockUser(mockToken);
      sessionStorage.setItem('mock_user', JSON.stringify(mockUser));
      
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
    const res = await axios.post(endpoints.auth.signUp, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);
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
    sessionStorage.removeItem('mock_user');
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
