import { varAlpha } from 'minimal-shared/utils';

import {
  grey,
  info,
  error,
  common,
  primary,
  success,
  warning,
  secondary,
} from './palette';

import type { ThemeColorScheme } from '../types';

// ----------------------------------------------------------------------

/**
 * TypeScript (type definition and extension)
 * @to {@link file://./../extend-theme-types.d.ts}
 */

export interface CustomShadows {
  z1?: string;
  z4?: string;
  z8?: string;
  z12?: string;
  z16?: string;
  z20?: string;
  z24?: string;
  primary?: string;
  secondary?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  card?: string;
  dialog?: string;
  dropdown?: string;
  acrylic?: string; // Windows 11 Fluent Design acrylic shadow
  flyout?: string; // Windows 11 Fluent Design flyout shadow
}

// ----------------------------------------------------------------------

export function createShadowColor(colorChannel: string): string {
  // Windows 11 Fluent Design colored shadows - softer and more natural
  return `0 4px 16px 0 ${varAlpha(colorChannel, 0.16)}, 0 8px 32px 0 ${varAlpha(colorChannel, 0.08)}`;
}

function createCustomShadows(colorChannel: string): CustomShadows {
  // Windows 11 Fluent Design custom shadows
  // Uses layered approach with ambient and key light shadows
  const ambientShadow = varAlpha(colorChannel, 0.06);
  const keyLight = varAlpha(colorChannel, 0.12);
  const subtleShadow = varAlpha(colorChannel, 0.08);

  return {
    // Basic elevation shadows - Windows 11 style
    z1: `0 1px 2px 0 ${ambientShadow}, 0 1px 3px 1px ${subtleShadow}`,
    z4: `0 2px 4px 0 ${ambientShadow}, 0 4px 12px 4px ${keyLight}`,
    z8: `0 3px 8px 0 ${ambientShadow}, 0 8px 20px 6px ${keyLight}`,
    z12: `0 4px 12px 0 ${ambientShadow}, 0 12px 28px 8px ${keyLight}`,
    z16: `0 5px 16px 0 ${ambientShadow}, 0 16px 32px 8px ${keyLight}`,
    z20: `0 6px 20px 0 ${ambientShadow}, 0 20px 40px 12px ${keyLight}`,
    z24: `0 6px 24px 0 ${ambientShadow}, 0 24px 48px 16px ${keyLight}`,
    /********/
    // Special Windows 11 Fluent Design shadows
    dialog: `0 8px 32px 0 ${varAlpha(common.blackChannel, 0.12)}, 0 32px 64px 0 ${varAlpha(common.blackChannel, 0.08)}`,
    card: `0 1px 3px 0 ${varAlpha(colorChannel, 0.06)}, 0 4px 8px 3px ${varAlpha(colorChannel, 0.08)}`,
    dropdown: `0 4px 16px 0 ${varAlpha(colorChannel, 0.12)}, 0 8px 32px 8px ${varAlpha(colorChannel, 0.08)}`,
    // Acrylic-style shadow for floating elements
    acrylic: `0 8px 32px 0 ${varAlpha(colorChannel, 0.14)}, 0 0 0 1px ${varAlpha(colorChannel, 0.06)}`,
    // Flyout shadow (like context menus in Windows 11)
    flyout: `0 8px 16px 0 ${varAlpha(colorChannel, 0.14)}, 0 16px 32px 0 ${varAlpha(colorChannel, 0.1)}`,
    /********/
    primary: createShadowColor(primary.mainChannel),
    secondary: createShadowColor(secondary.mainChannel),
    info: createShadowColor(info.mainChannel),
    success: createShadowColor(success.mainChannel),
    warning: createShadowColor(warning.mainChannel),
    error: createShadowColor(error.mainChannel),
  };
}

export const customShadows: Record<ThemeColorScheme, CustomShadows> = {
  light: createCustomShadows(grey['500Channel']),
  dark: createCustomShadows(common.blackChannel),
};
