'use client';

import { useContext } from 'react';

import { LocalizationContext } from '../context';

// ----------------------------------------------------------------------

export function useLocales() {
    const context = useContext(LocalizationContext);

    if (!context) {
        throw new Error('useLocales must be used within LocalizationProvider');
    }

    return context;
}
