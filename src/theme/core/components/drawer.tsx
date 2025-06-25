import type { Components, Theme } from '@mui/material/styles';

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
        // Windows 11 Fluent Design shadow for right drawer
        boxShadow: theme.vars.customShadows.dialog,
        backdropFilter: 'blur(40px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
        // Subtle border for better definition
        borderLeft: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
      }),
    }),
    paperAnchorLeft: ({ ownerState, theme }) => ({
      ...(ownerState.variant === 'temporary' && {
        ...theme.mixins.paperStyles(theme),
        // Windows 11 Fluent Design shadow for left drawer
        boxShadow: theme.vars.customShadows.dialog,
        backdropFilter: 'blur(40px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
        // Subtle border for better definition
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
      }),
    }),
  },
};

// ----------------------------------------------------------------------

export const drawer = { MuiDrawer };
