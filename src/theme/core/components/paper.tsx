import type { Components, Theme } from '@mui/material/styles';
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
      // Material Design elevation styles
      ...(ownerState.elevation &&
        ownerState.elevation > 0 && {
          boxShadow: theme.shadows[ownerState.elevation],
          border: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }),
    }),
    outlined: ({ theme }) => ({
      borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
      backgroundColor: varAlpha(
        theme.vars.palette.background.paperChannel,
        0.9
      ),
    }),
  },
};

// ----------------------------------------------------------------------

export const paper = { MuiPaper };
