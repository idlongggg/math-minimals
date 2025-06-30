'use client';

import type { ReactNode } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';

import { DashboardPageContainer } from './dashboard-page-container';
import { DashboardPageWithTabsContent } from './dashboard-page-with-tabs-content';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  tabs: ReactNode;
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
    <DashboardPageContainer
      title={title}
      description={description}
      maxWidth={maxWidth}
      sx={sx}
      headerSx={headerSx}
    >
      <DashboardPageWithTabsContent tabs={tabs} tabsSx={tabsSx} contentSx={contentSx}>
        {children}
      </DashboardPageWithTabsContent>
    </DashboardPageContainer>
  );
}
