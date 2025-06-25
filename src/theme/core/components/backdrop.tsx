import type { Components, Theme } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

const MuiBackdrop: Components<Theme>['MuiBackdrop'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      // Windows 11 Fluent Design backdrop with subtle blur
      backgroundColor: varAlpha(theme.vars.palette.grey['900Channel'], 0.32),
      backdropFilter: 'blur(8px) saturate(1.1)',
      WebkitBackdropFilter: 'blur(8px) saturate(1.1)',
    }),
    invisible: {
      background: 'transparent',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
    },
  },
};

// ----------------------------------------------------------------------

export const backdrop = { MuiBackdrop };
