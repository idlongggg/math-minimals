'use client';

import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { DashboardContent } from 'src/layouts/dashboard';
import { DashboardPageHeader } from './dashboard-page-header';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
};

export function DashboardPageContainer({
  title,
  description,
  children,
  maxWidth = 'xl',
  sx,
  headerSx,
}: Props) {
  return (
    <DashboardContent 
      maxWidth={maxWidth} 
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - var(--layout-header-desktop-height) - var(--layout-dashboard-content-pt) - var(--layout-dashboard-content-pb))',
          minHeight: 0,
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Fixed Header */}
      <DashboardPageHeader title={title} description={description} sx={headerSx} />
      
      {/* Dynamic Content */}
      {children}
    </DashboardContent>
  );
}
