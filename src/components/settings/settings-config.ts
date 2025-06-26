import { CONFIG } from 'src/global-config';
import { themeConfig } from 'src/theme/theme-config';

import type { SettingsState } from './types';

// ----------------------------------------------------------------------

export const SETTINGS_STORAGE_KEY: string = 'app-settings';

export const defaultSettings: SettingsState = {
  colorScheme: themeConfig.defaultMode,
  contrast: 'hight',
  navLayout: 'vertical',
  primaryColor: 'preset1',
  navColor: 'apparent',
  hideMenu: false,
  version: CONFIG.appVersion,
};
