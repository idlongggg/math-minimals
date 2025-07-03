import type { Theme, Components } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

const MuiDrawer: Components<Theme>['MuiDrawer'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    paperAnchorRight: ({ ownerState, theme }) => ({
      ...(ownerState.variant === 'temporary' && {
        ...theme.mixins.paperStyles(theme),
        // Material Design shadow for right drawer
        boxShadow: theme.vars.customShadows.dialog,
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderLeft: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
      }),
    }),
    paperAnchorLeft: ({ ownerState, theme }) => ({
      ...(ownerState.variant === 'temporary' && {
        ...theme.mixins.paperStyles(theme),
        // Material Design shadow for left drawer
        boxShadow: theme.vars.customShadows.dialog,
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
      }),
    }),
  },
};

// ----------------------------------------------------------------------

export const drawer = { MuiDrawer };
