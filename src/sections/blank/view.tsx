'use client';

import type { SxProps, Theme } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';

import { DashboardPageLayoutWithMetadata } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  description?: string;
  sx?: SxProps<Theme>;
};

export function BlankView({ title = 'Blank', description, sx }: Props) {
  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 1,
          border: `dashed 1px ${theme.vars.palette.divider}`,
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );

  return (
    <DashboardPageLayoutWithMetadata 
      pageKey="default" 
      title={title} 
      description={description}
    >
      {renderContent()}
    </DashboardPageLayoutWithMetadata>
  );
}
