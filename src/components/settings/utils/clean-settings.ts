import type { SettingsState } from '../types';

// ----------------------------------------------------------------------

/**
 * Làm sạch settings object để loại bỏ các properties không hợp lệ
 * Chỉ giữ lại những properties được định nghĩa trong SettingsState type
 */
export function cleanSettings(settings: any): SettingsState {
  const validKeys: (keyof SettingsState)[] = [
    'version',
    'fontSize',
    'fontFamily',
    'compactLayout',
    'direction',
    'colorScheme',
    'contrast',
    'navColor',
    'navLayout',
    'primaryColor',
  ];

  const cleanedSettings: Partial<SettingsState> = {};

  validKeys.forEach((key) => {
    if (key in settings && settings[key] !== undefined) {
      cleanedSettings[key] = settings[key];
    }
  });

  return cleanedSettings as SettingsState;
}

/**
 * Loại bỏ các properties deprecated như hideMenu, hideAvatar khỏi settings
 */
export function removeDeprecatedProperties(settings: any): any {
  const { hideMenu, hideAvatar, ...cleanSettings } = settings || {};
  return cleanSettings;
}
