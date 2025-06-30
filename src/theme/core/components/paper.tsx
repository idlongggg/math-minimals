import type { Theme, Components } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

const MuiPaper: Components<Theme>['MuiPaper'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { elevation: 0 },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      backgroundImage: 'none',
      // Windows 11 Fluent Design elevation styles
      ...(ownerState.elevation &&
        ownerState.elevation > 0 && {
          boxShadow: theme.shadows[ownerState.elevation],
          // Subtle border for better definition
          border: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          // Enhanced backdrop blur for elevated papers
          backdropFilter: 'blur(20px) saturate(1.1)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.1)',
        }),
    }),
    outlined: ({ theme }) => ({
      borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
      backgroundColor: varAlpha(theme.vars.palette.background.paperChannel, 0.9),
    }),
  },
};

// ----------------------------------------------------------------------

export const paper = { MuiPaper };
