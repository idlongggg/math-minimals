'use client';

import { isEqual } from 'es-toolkit';
import { getCookie, getStorage } from 'minimal-shared/utils';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useCookies, useLocalStorage } from 'minimal-shared/hooks';

import { SettingsContext } from './settings-context';
import { SETTINGS_STORAGE_KEY } from '../settings-config';
import { cleanSettings, removeDeprecatedProperties } from '../utils/clean-settings';

import type { SettingsState, SettingsProviderProps } from '../types';

// ----------------------------------------------------------------------

export function SettingsProvider({
    children,
    cookieSettings,
    defaultSettings,
    storageKey = SETTINGS_STORAGE_KEY,
}: SettingsProviderProps) {
    const isCookieEnabled = !!cookieSettings;
    const useStorage = isCookieEnabled ? useCookies : useLocalStorage;

    // Làm sạch initialSettings để loại bỏ các properties deprecated
    const cleanedCookieSettings = cookieSettings ? cleanSettings(removeDeprecatedProperties(cookieSettings)) : undefined;
    const cleanedDefaultSettings = cleanSettings(defaultSettings);

    const initialSettings = isCookieEnabled ? cleanedCookieSettings : cleanedDefaultSettings;
    const getStorageValue = isCookieEnabled ? getCookie : getStorage;

    const { state, setState, resetState, setField } = useStorage<SettingsState>(
        storageKey,
        initialSettings
    );

    const [openDrawer, setOpenDrawer] = useState(false);

    const onToggleDrawer = useCallback(() => {
        setOpenDrawer((prev) => !prev);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setOpenDrawer(false);
    }, []);

    const canReset = !isEqual(cleanSettings(state), cleanedDefaultSettings);

    const onReset = useCallback(() => {
        resetState(cleanedDefaultSettings);
    }, [cleanedDefaultSettings, resetState]);

    // Version check and reset handling
    useEffect(() => {
        const storedValue = getStorageValue<SettingsState>(storageKey);

        if (storedValue) {
            try {
                // Làm sạch storedValue để loại bỏ các properties deprecated
                const cleanedStoredValue = cleanSettings(removeDeprecatedProperties(storedValue));

                if (!cleanedStoredValue.version || cleanedStoredValue.version !== cleanedDefaultSettings.version) {
                    onReset();
                } else {
                    // Nếu có deprecated properties, cập nhật state với version đã làm sạch
                    const hasDeprecatedProps = 'hideMenu' in storedValue || 'hideAvatar' in storedValue;
                    if (hasDeprecatedProps) {
                        setState(cleanedStoredValue);
                    }
                }
            } catch {
                onReset();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const memoizedValue = useMemo(
        () => ({
            canReset,
            onReset,
            openDrawer,
            onCloseDrawer,
            onToggleDrawer,
            state,
            setState,
            setField,
        }),
        [canReset, onReset, openDrawer, onCloseDrawer, onToggleDrawer, state, setField, setState]
    );

    return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
