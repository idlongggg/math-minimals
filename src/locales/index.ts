import en from './en.json';
import vi from './vi.json';
import zh from './zh.json';

export const locales = {
  vi,
  en,
  zh,
} as const;

export type LocaleKey = keyof typeof locales;

export const defaultLocale: LocaleKey = 'en';

export const allLocales: LocaleKey[] = ['vi', 'en', 'zh'];

// Re-export hooks and context
export { LocalizationContext, LocalizationProvider } from './context';
export { useLocales } from './hooks';

