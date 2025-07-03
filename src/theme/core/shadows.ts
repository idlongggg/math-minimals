import type { Shadows } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import { grey, common } from './palette';

import type { ThemeColorScheme } from '../types';

// ----------------------------------------------------------------------

function createShadows(colorChannel: string): Shadows {
  // Material Design shadow system
  const ambientShadow = varAlpha(colorChannel, 0.06);
  const keyShadow = varAlpha(colorChannel, 0.12);
  // const directionalShadow = varAlpha(colorChannel, 0.08);

  return [
    'none',
    // Elevation 1: Cards at rest
    `0 1px 2px 0 ${ambientShadow}, 0 1px 3px 1px ${keyShadow}`,
    // Elevation 2: Raised buttons, snackbars
    `0 1px 3px 0 ${ambientShadow}, 0 2px 6px 2px ${keyShadow}`,
    // Elevation 3: Refresh indicator, search bar (active state)
    `0 1px 4px 0 ${ambientShadow}, 0 4px 8px 3px ${keyShadow}`,
    // Elevation 4: App bar
    `0 2px 4px 0 ${ambientShadow}, 0 4px 12px 4px ${keyShadow}`,
    // Elevation 6: FAB (Resting state)
    `0 2px 6px 0 ${ambientShadow}, 0 6px 16px 4px ${keyShadow}`,
    // Elevation 8: Bottom sheets, navigation drawer
    `0 3px 8px 0 ${ambientShadow}, 0 8px 20px 6px ${keyShadow}`,
    // Elevation 9: FAB (Pressed state)
    `0 3px 9px 0 ${ambientShadow}, 0 9px 22px 6px ${keyShadow}`,
    // Elevation 12: Dialog
    `0 4px 12px 0 ${ambientShadow}, 0 12px 28px 8px ${keyShadow}`,
    // Elevation 16: Navigation drawer (modal)
    `0 5px 16px 0 ${ambientShadow}, 0 16px 32px 8px ${keyShadow}`,
    // Elevation 24: Date picker, time picker
    `0 6px 24px 0 ${ambientShadow}, 0 20px 40px 12px ${keyShadow}`,
    // Additional elevations
    `0 6px 20px 0 ${ambientShadow}, 0 16px 36px 8px ${keyShadow}`,
    `0 7px 24px 0 ${ambientShadow}, 0 20px 44px 12px ${keyShadow}`,
    `0 8px 28px 0 ${ambientShadow}, 0 24px 48px 12px ${keyShadow}`,
    `0 9px 32px 0 ${ambientShadow}, 0 28px 52px 16px ${keyShadow}`,
    `0 10px 36px 0 ${ambientShadow}, 0 32px 56px 16px ${keyShadow}`,
    `0 11px 40px 0 ${ambientShadow}, 0 36px 60px 20px ${keyShadow}`,
    `0 12px 44px 0 ${ambientShadow}, 0 40px 64px 20px ${keyShadow}`,
    `0 13px 48px 0 ${ambientShadow}, 0 44px 68px 24px ${keyShadow}`,
    `0 14px 52px 0 ${ambientShadow}, 0 48px 72px 24px ${keyShadow}`,
    `0 15px 56px 0 ${ambientShadow}, 0 52px 76px 28px ${keyShadow}`,
    `0 16px 60px 0 ${ambientShadow}, 0 56px 80px 28px ${keyShadow}`,
    `0 17px 64px 0 ${ambientShadow}, 0 60px 84px 32px ${keyShadow}`,
    `0 18px 68px 0 ${ambientShadow}, 0 64px 88px 32px ${keyShadow}`,
    `0 19px 72px 0 ${ambientShadow}, 0 68px 92px 36px ${keyShadow}`,
  ];
}

export const shadows: Record<ThemeColorScheme, Shadows> = {
  light: createShadows(grey['500Channel']),
  dark: createShadows(common.blackChannel),
};
