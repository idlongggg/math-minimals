'use client';

import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';


// ----------------------------------------------------------------------

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  tabs?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  tabsSx?: SxProps<Theme>;
};

export function DashboardPageWithTabsLayout({
  title,
  description,
  children,
  tabs,
  maxWidth = 'xl',
  sx,
  headerSx,
  contentSx,
  tabsSx,
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
              pt: 3,
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

        {/* Fixed Tabs */}
        {tabs && (
          <Box
            sx={[
              {
                flexShrink: 0,
                mb: 3,
                // Override CustomTabs padding to align with content
                '& .MuiTabs-root': {
                  marginLeft: '-8px',
                  marginRight: '-8px',
                },
              },
              ...(Array.isArray(tabsSx) ? tabsSx : [tabsSx]),
            ]}
          >
            {tabs}
          </Box>
        )}

        {/* Scrollable Content */}
        <Scrollbar
          spacing={6} // Add 6px spacing between scrollbar and content
          sx={[
            {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            },
            ...(Array.isArray(contentSx) ? contentSx : [contentSx]),
          ]}
          slotProps={{
            contentSx: {
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'auto',
              mt: 1, // Reduce margin top (8px)
              mb: 2, // Reduce margin bottom (16px)
            },
          }}
        >
          {children}
        </Scrollbar>
      </Box>
    </DashboardContent>
  );
}
