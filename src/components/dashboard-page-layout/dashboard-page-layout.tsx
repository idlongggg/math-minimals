'use client';

import type { ReactNode } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';

import { DashboardPageContent } from './dashboard-page-content';
import { DashboardPageContainer } from './dashboard-page-container';

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
    <DashboardPageContainer
      title={title}
      description={description}
      maxWidth={maxWidth}
      sx={sx}
      headerSx={headerSx}
    >
      <DashboardPageContent sx={contentSx}>{children}</DashboardPageContent>
    </DashboardPageContainer>
  );
}
