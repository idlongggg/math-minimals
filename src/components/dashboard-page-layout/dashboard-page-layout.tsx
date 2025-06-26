'use client';

import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
};

export function DashboardPageLayout({
  title,
  description,
  children,
  maxWidth = 'xl',
  sx,
  headerSx,
  contentSx,
}: Props) {
  return (
    <DashboardContent maxWidth={maxWidth} sx={sx}>
      <Box
        sx={[
          {
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - var(--layout-dashboard-content-pt) - var(--layout-dashboard-content-pb))',
            minHeight: 600,
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {/* Fixed Header */}
        <Box
          sx={[
            {
              flexShrink: 0,
              mb: 3,
              p: 3,
              pb: 0,
            },
            ...(Array.isArray(headerSx) ? headerSx : [headerSx]),
          ]}
        >
          <Typography variant="h4">{title}</Typography>
          
          {description && (
            <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
              {description}
            </Typography>
          )}
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={[
            {
              flex: 1,
              overflow: 'auto',
              px: 3,
              pb: 3,
              display: 'flex',
              flexDirection: 'column',
            },
            ...(Array.isArray(contentSx) ? contentSx : [contentSx]),
          ]}
        >
          {children}
        </Box>
      </Box>
    </DashboardContent>
  );
}
