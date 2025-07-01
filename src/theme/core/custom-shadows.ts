import { varAlpha } from 'minimal-shared/utils';

import {
    common,
    error,
    grey,
    info,
    primary,
    secondary,
    success,
    warning,
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
}

// ----------------------------------------------------------------------

export function createShadowColor(colorChannel: string): string {
  return `0 4px 16px 0 ${varAlpha(colorChannel, 0.16)}, 0 8px 32px 0 ${varAlpha(colorChannel, 0.08)}`;
}

function createCustomShadows(colorChannel: string): CustomShadows {
  // Material Design elevation shadows
  const ambientShadow = varAlpha(colorChannel, 0.06);
  const keyShadow = varAlpha(colorChannel, 0.12);
  const subtleShadow = varAlpha(colorChannel, 0.08);

  return {
    // Basic elevation shadows
    z1: `0 1px 2px 0 ${ambientShadow}, 0 1px 3px 1px ${subtleShadow}`,
    z4: `0 2px 4px 0 ${ambientShadow}, 0 4px 12px 4px ${keyShadow}`,
    z8: `0 3px 8px 0 ${ambientShadow}, 0 8px 20px 6px ${keyShadow}`,
    z12: `0 4px 12px 0 ${ambientShadow}, 0 12px 28px 8px ${keyShadow}`,
    z16: `0 5px 16px 0 ${ambientShadow}, 0 16px 32px 8px ${keyShadow}`,
    z20: `0 6px 20px 0 ${ambientShadow}, 0 20px 40px 12px ${keyShadow}`,
    z24: `0 6px 24px 0 ${ambientShadow}, 0 24px 48px 16px ${keyShadow}`,
    /********/
    dialog: `0 8px 32px 0 ${varAlpha(common.blackChannel, 0.12)}, 0 32px 64px 0 ${varAlpha(common.blackChannel, 0.08)}`,
    card: `0 1px 3px 0 ${varAlpha(colorChannel, 0.06)}, 0 4px 8px 3px ${varAlpha(colorChannel, 0.08)}`,
    dropdown: `0 4px 16px 0 ${varAlpha(colorChannel, 0.12)}, 0 8px 32px 8px ${varAlpha(colorChannel, 0.08)}`,
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
