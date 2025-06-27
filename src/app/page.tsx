'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Bảo tồn query parameters khi redirect
        const queryString = searchParams.toString();
        const redirectPath = queryString
            ? `${CONFIG.auth.redirectPath}?${queryString}`
            : CONFIG.auth.redirectPath;

        router.push(redirectPath);
    }, [router, searchParams]);

    return null;
}
