'use client';

import type { ButtonProps } from '@mui/material/Button';

import { forwardRef } from 'react';

import Button from '@mui/material/Button';

import { useTabColorSafe, useTabColorStandalone } from 'src/contexts/tab-color-context';
import { getTabColorValue, type TabColorKey } from 'src/theme/tab-colors';

// ----------------------------------------------------------------------

interface TabColorButtonProps extends Omit<ButtonProps, 'color'> {
  /** Use tab color from context (default: true) */
  useTabColorContext?: boolean;
  /** Manual tab color key (when useTabColorContext is false) */
  tabColorKey?: TabColorKey | string;
  /** Color variant to use from tab color */
  colorVariant?: 'main' | 'light' | 'dark';
  /** Use alpha background (for soft variant) */
  useAlpha?: boolean;
  /** Alpha value for background */
  alphaValue?: number;
}

export const TabColorButton = forwardRef<HTMLButtonElement, TabColorButtonProps>(
  ({
    useTabColorContext = true,
    tabColorKey,
    colorVariant = 'main',
    useAlpha = false,
    alphaValue = 0.1,
    variant = 'contained',
    sx,
    children,
    ...other
  }, ref) => {
    // Always call hooks at the top level - no conditional calls
    const contextColor = useTabColorSafe();
    const standaloneColor = useTabColorStandalone(tabColorKey || 'overview');
    
    // Choose which color source to use based on props
    const colorSource = (useTabColorContext && contextColor) ? contextColor : standaloneColor;
    const { getColor, getAlphaColor } = colorSource;

    // Get the color value
    const colorValue = (useTabColorContext && contextColor)
      ? getColor(colorVariant) 
      : getTabColorValue(tabColorKey || 'overview', colorVariant);

    // Get alpha color if needed
    const alphaColor = (useTabColorContext && contextColor)
      ? getAlphaColor(alphaValue) 
      : getTabColorValue(tabColorKey || 'overview', 'main');

    // Generate styles based on variant
    const getVariantStyles = () => {
      switch (variant) {
        case 'contained':
          return {
            backgroundColor: colorValue,
            color: useTabColorContext && contextColor
              ? getColor('contrastText') 
              : getTabColorValue(tabColorKey || 'overview', 'contrastText'),
            '&:hover': {
              backgroundColor: useTabColorContext && contextColor
                ? getColor('dark') 
                : getTabColorValue(tabColorKey || 'overview', 'dark'),
            },
            '&:active': {
              backgroundColor: useTabColorContext && contextColor
                ? getColor('dark') 
                : getTabColorValue(tabColorKey || 'overview', 'dark'),
            },
          };
        
        case 'outlined':
          return {
            color: colorValue,
            borderColor: colorValue,
            '&:hover': {
              backgroundColor: useAlpha ? alphaColor : `${colorValue}08`,
              borderColor: colorValue,
            },
          };
        
        case 'text':
          return {
            color: colorValue,
            '&:hover': {
              backgroundColor: useAlpha ? alphaColor : `${colorValue}08`,
            },
          };
        
        default:
          return {
            color: colorValue,
          };
      }
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        sx={{
          ...getVariantStyles(),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...sx,
        }}
        {...other}
      >
        {children}
      </Button>
    );
  }
);

TabColorButton.displayName = 'TabColorButton';
