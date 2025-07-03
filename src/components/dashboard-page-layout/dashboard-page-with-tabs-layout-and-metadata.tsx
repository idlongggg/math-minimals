'use client';

import type { ReactNode } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';

import { usePageInfo } from 'src/hooks/use-page-metadata';

import { DashboardPageContainer } from './dashboard-page-container';
import { DashboardPageWithTabsContent } from './dashboard-page-with-tabs-content';

// ----------------------------------------------------------------------

type Props = {
  pageKey: string;
  children: ReactNode;
  tabs: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  tabsSx?: SxProps<Theme>;
  // Override metadata if needed
  title?: string;
  description?: string;
};

export function DashboardPageWithTabsLayoutAndMetadata({
  pageKey,
  children,
  tabs,
  maxWidth = 'xl',
  sx,
  headerSx,
  contentSx,
  tabsSx,
  title: titleOverride,
  description: descriptionOverride,
}: Props) {
  const { title: metadataTitle, description: metadataDescription } =
    usePageInfo(pageKey);

  const title = titleOverride || metadataTitle;
  const description = descriptionOverride || metadataDescription;

  return (
    <DashboardPageContainer
      title={title}
      description={description}
      maxWidth={maxWidth}
      sx={sx}
      headerSx={headerSx}
    >
      <DashboardPageWithTabsContent
        tabs={tabs}
        tabsSx={tabsSx}
        contentSx={contentSx}
      >
        {children}
      </DashboardPageWithTabsContent>
    </DashboardPageContainer>
  );
}
