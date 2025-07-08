'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { defaultLocale, locales } from '../index';

import type { LocaleKey } from '../index';

// ----------------------------------------------------------------------

type LocalizationContextValue = {
  locale: LocaleKey;
  translate: (key: string, ...args: any[]) => string;
  changeLocale: (newLocale: LocaleKey) => void;
};

export const LocalizationContext = createContext<LocalizationContextValue | undefined>(undefined);

// ----------------------------------------------------------------------

type LocalizationProviderProps = {
  children: ReactNode;
};

export function LocalizationProvider({ children }: LocalizationProviderProps) {
  const [locale, setLocale] = useState<LocaleKey>(defaultLocale);

  const translate = useCallback(
    (key: string, ...args: any[]): string => {
      const keys = key.split('.');
      let value: any = locales[locale];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Fallback to English if translation not found
          let fallbackValue: any = locales.en;
          for (const fk of keys) {
            if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
              fallbackValue = fallbackValue[fk];
            } else {
              return key; // Return key if no translation found
            }
          }
          value = fallbackValue;
          break;
        }
      }

      if (typeof value === 'string') {
        // Simple string interpolation
        return args.reduce((str, arg, index) => {
          return str.replace(new RegExp(`\\{${index}\\}`, 'g'), String(arg));
        }, value);
      }

      return key; // Return key if translation is not a string
    },
    [locale]
  );

  const changeLocale = useCallback((newLocale: LocaleKey) => {
    setLocale(newLocale);
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  }, []);

  // Load from localStorage on initialization
  const contextValue = useMemo(() => {
    return {
      locale,
      translate,
      changeLocale,
    };
  }, [locale, translate, changeLocale]);

  // Effect to load from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as LocaleKey;
      if (savedLocale && savedLocale !== locale) {
        setLocale(savedLocale);
      }
    }
  }, []);

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
}
