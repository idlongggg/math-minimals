'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

/**
 * @deprecated Use useUrlParams() instead. This hook saves to settings state/cache.
 * The new approach only reads URL parameters without caching.
 */
export function useUrlSettings() {
    const settings = useSettingsContext();
    const searchParams = useSearchParams();

    useEffect(() => {
        // This hook is deprecated - implementation removed
        // Use useUrlParams() for reading URL parameters without caching
    }, [searchParams, settings]);

    return settings;
}
