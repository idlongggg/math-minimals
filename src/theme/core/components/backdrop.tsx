import type { Components, Theme } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

const MuiBackdrop: Components<Theme>['MuiBackdrop'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      // Material Design backdrop with blur
      backgroundColor: varAlpha(theme.vars.palette.grey['900Channel'], 0.32),
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
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
