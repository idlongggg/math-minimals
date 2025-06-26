'use client';

import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import Box from '@mui/material/Box';

import { DashboardPageLayout } from './dashboard-page-layout';

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
    <DashboardPageLayout
      title={title}
      description={description}
      maxWidth={maxWidth}
      sx={sx}
      headerSx={headerSx}
      contentSx={contentSx}
    >
      {/* Fixed Tabs */}
      {tabs && (
        <Box
          sx={[
            {
              flexShrink: 0,
              mb: 3,
            },
            ...(Array.isArray(tabsSx) ? tabsSx : [tabsSx]),
          ]}
        >
          {tabs}
        </Box>
      )}

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </DashboardPageLayout>
  );
}
