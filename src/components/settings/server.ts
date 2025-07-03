import { cookies } from 'next/headers';

import { defaultSettings, SETTINGS_STORAGE_KEY } from './settings-config';
import {
  cleanSettings,
  removeDeprecatedProperties,
} from './utils/clean-settings';

import type { SettingsState } from './types';

// ----------------------------------------------------------------------

export async function detectSettings(
  storageKey: string = SETTINGS_STORAGE_KEY
): Promise<SettingsState> {
  const cookieStore = await cookies();

  const settingsStore = cookieStore.get(storageKey);

  if (settingsStore) {
    try {
      const parsedSettings = JSON.parse(settingsStore.value);
      // Làm sạch settings để loại bỏ các properties deprecated
      return cleanSettings(removeDeprecatedProperties(parsedSettings));
    } catch {
      return cleanSettings(defaultSettings);
    }
  }

  return cleanSettings(defaultSettings);
}
