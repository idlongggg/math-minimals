'use client';

import type { IconifyProps } from 'src/components/iconify';

import { forwardRef } from 'react';

import { useTabColorSafe } from 'src/contexts/tab-color-context';
import { getTabColorValue, type TabColorKey } from 'src/theme/tab-colors';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface TabColorIconProps extends Omit<IconifyProps, 'sx'> {
  /** Use tab color from context (default: true) */
  useTabColorContext?: boolean;
  /** Manual tab color key (when useTabColorContext is false) */
  tabColorKey?: TabColorKey | string;
  /** Color variant to use from tab color */
  colorVariant?: 'main' | 'light' | 'dark';
  /** Custom sx props */
  sx?: Record<string, any>;
}

export const TabColorIcon = forwardRef<SVGSVGElement, TabColorIconProps>(
  ({
    useTabColorContext = true,
    tabColorKey,
    colorVariant = 'main',
    sx,
    ...other
  }, ref) => {
    // Always call hooks at the top level - no conditional calls
    const contextColor = useTabColorSafe();

    // Get the color value
    const colorValue = (useTabColorContext && contextColor)
      ? contextColor.getColor(colorVariant)
      : getTabColorValue(tabColorKey || 'overview', colorVariant);

    return (
      <Iconify
        ref={ref}
        sx={{
          color: colorValue,
          transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...sx,
        }}
        {...other}
      />
    );
  }
);

TabColorIcon.displayName = 'TabColorIcon';
