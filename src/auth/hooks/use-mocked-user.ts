import { _mock } from 'src/_mock';

import { useAuthContext } from './use-auth-context';
import { AUTH_METHODS } from '../context/jwt/constant';
import { useCurrentAuthMethod } from './use-current-auth-method';

// To get the user from the <AuthContext/>, you can use

// Change:
// import { useMockedUser } from 'src/auth/hooks';
// const { user } = useMockedUser();

// To:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
    const { user: authUser } = useAuthContext();
    const currentAuthMethod = useCurrentAuthMethod();

    // Nếu đang sử dụng mock JWT và có user từ auth context, sử dụng user đó
    if (currentAuthMethod === AUTH_METHODS.MOCK_JWT && authUser) {
        return { user: authUser };
    }

    // Fallback user để backward compatibility
    const fallbackUser = {
        id: '8864c717-587d-472a-929a-8e5f298024da-0',
        displayName: 'Jaydon Frankie',
        email: 'demo@minimals.cc',
        photoURL: _mock.image.avatar(24),
        phoneNumber: _mock.phoneNumber(1),
        country: _mock.countryNames(1),
        address: '90210 Broadway Blvd',
        state: 'California',
        city: 'San Francisco',
        zipCode: '94116',
        about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
        role: 'admin',
        isPublic: true,
    };

    return { user: authUser || fallbackUser };
}
