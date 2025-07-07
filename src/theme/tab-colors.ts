import type { PaletteOptions } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Predefined tab colors for different tab types
 */
export const TAB_COLORS = {
  overview: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  topics: {
    main: '#388e3c',
    light: '#66bb6a',
    dark: '#2e7d32',
    contrastText: '#ffffff',
  },
  practice: {
    main: '#f57c00',
    light: '#ffb74d',
    dark: '#ef6c00',
    contrastText: '#ffffff',
  },
  guide: {
    main: '#7b1fa2',
    light: '#ab47bc',
    dark: '#6a1b9a',
    contrastText: '#ffffff',
  },
  tools: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#ffffff',
  },
  exercises: {
    main: '#00796b',
    light: '#26a69a',
    dark: '#00695c',
    contrastText: '#ffffff',
  },
  theory: {
    main: '#5d4037',
    light: '#8d6e63',
    dark: '#4e342e',
    contrastText: '#ffffff',
  },
  examples: {
    main: '#455a64',
    light: '#78909c',
    dark: '#37474f',
    contrastText: '#ffffff',
  },
} as const;

/**
 * Tab color configuration interface
 */
export interface TabColorConfig {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

/**
 * Tab color keys type
 */
export type TabColorKey = keyof typeof TAB_COLORS;

/**
 * Get tab color configuration by key
 */
export function getTabColor(key: TabColorKey | string): TabColorConfig {
  return TAB_COLORS[key as TabColorKey] || TAB_COLORS.overview;
}

/**
 * Get tab color by key with fallback
 */
export function getTabColorValue(key: TabColorKey | string, variant: keyof TabColorConfig = 'main'): string {
  const colorConfig = getTabColor(key);
  return colorConfig[variant];
}

/**
 * Check if a color key exists in tab colors
 */
export function isValidTabColorKey(key: string): key is TabColorKey {
  return key in TAB_COLORS;
}

/**
 * Get all available tab color keys
 */
export function getTabColorKeys(): TabColorKey[] {
  return Object.keys(TAB_COLORS) as TabColorKey[];
}

/**
 * Generate alpha color from tab color
 */
export function getTabColorAlpha(key: TabColorKey | string, alpha: number = 0.1): string {
  const colorConfig = getTabColor(key);
  const color = colorConfig.main;
  
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Create tab color variants for MUI theme
 */
export function createTabColorVariants(): Record<string, PaletteOptions['primary']> {
  const variants: Record<string, PaletteOptions['primary']> = {};
  
  Object.entries(TAB_COLORS).forEach(([key, color]) => {
    variants[key] = {
      main: color.main,
      light: color.light,
      dark: color.dark,
      contrastText: color.contrastText,
    };
  });
  
  return variants;
}

/**
 * Default tab color mapping for different tab types
 */
export const DEFAULT_TAB_COLOR_MAPPING = {
  overview: 'overview',
  topics: 'topics',
  practice: 'practice',
  guide: 'guide',
  tools: 'tools',
  exercises: 'exercises',
  theory: 'theory',
  examples: 'examples',
} as const;
