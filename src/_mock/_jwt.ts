import { _mock } from './_mock';

// ----------------------------------------------------------------------

export interface MockJWTUser {
  id: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  role: string;
  access: string[];
  accessToken?: string;
}

// Mock JWT utilities
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Mock user accounts with different subject combinations
export const MOCK_JWT_USERS: MockJWTUser[] = [
  {
    id: 'user-1-algebra-statistics-geometry',
    displayName: _mock.fullName(0),
    email: _mock.email(0),
    photoURL: _mock.image.avatar(0),
    role: 'admin',
    access: ['algebra', 'statistics', 'geometry'],
  },
  {
    id: 'user-2-algebra-statistics',
    displayName: _mock.fullName(1),
    email: _mock.email(1),
    photoURL: _mock.image.avatar(1),
    role: 'user',
    access: ['algebra', 'statistics'],
  },
  {
    id: 'user-3-statistics-geometry',
    displayName: _mock.fullName(2),
    email: _mock.email(2),
    photoURL: _mock.image.avatar(2),
    role: 'user',
    access: ['statistics', 'geometry'],
  },
  {
    id: 'user-4-algebra-geometry',
    displayName: _mock.fullName(3),
    email: _mock.email(3),
    photoURL: _mock.image.avatar(3),
    role: 'user',
    access: ['algebra', 'geometry'],
  },
  {
    id: 'user-5-algebra-only',
    displayName: _mock.fullName(4),
    email: _mock.email(4),
    photoURL: _mock.image.avatar(4),
    role: 'user',
    access: ['algebra'],
  },
  {
    id: 'user-6-geometry-only',
    displayName: _mock.fullName(5),
    email: _mock.email(5),
    photoURL: _mock.image.avatar(5),
    role: 'user',
    access: ['geometry'],
  },
  {
    id: 'user-7-statistics-only',
    displayName: _mock.fullName(6),
    email: _mock.email(6),
    photoURL: _mock.image.avatar(6),
    role: 'user',
    access: ['statistics'],
  },
];

export function generateMockJWT(userIndex: number = 0): string {
  if (userIndex < 0 || userIndex >= MOCK_JWT_USERS.length) {
    throw new Error(`Invalid user index: ${userIndex}. Must be between 0 and ${MOCK_JWT_USERS.length - 1}`);
  }

  const user = MOCK_JWT_USERS[userIndex];
  
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    userId: user.id,
    access: user.access,
    iat: now,
    exp: now + (3 * 24 * 60 * 60), // 3 days
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  
  // For demo purposes, we'll use a simple signature
  const signature = base64UrlEncode(`mock-signature-${userIndex}`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function createMockUser(token: string): MockJWTUser {
  const decoded = jwtDecode(token);
  const mockUser = MOCK_JWT_USERS.find(user => user.id === decoded.userId);
  
  if (!mockUser) {
    throw new Error(`Mock user not found for ID: ${decoded.userId}`);
  }
  
  return {
    ...mockUser,
    accessToken: token,
  };
}

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

// Helper function to get all available mock users
export function getMockUsers(): MockJWTUser[] {
  return MOCK_JWT_USERS;
}

// Helper function to get user by access subjects
export function getUserByAccess(subjects: string[]): MockJWTUser | null {
  return MOCK_JWT_USERS.find(user => 
    user.access.length === subjects.length && 
    user.access.every(subject => subjects.includes(subject))
  ) || null;
}

// Helper function to generate tokens for all users
export function generateAllMockJWTs(): { [key: string]: string } {
  return MOCK_JWT_USERS.reduce((acc, user, index) => {
    acc[user.id] = generateMockJWT(index);
    return acc;
  }, {} as { [key: string]: string });
}
