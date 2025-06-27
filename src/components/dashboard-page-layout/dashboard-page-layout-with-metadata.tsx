'use client';

import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { usePageInfo } from 'src/hooks/use-page-metadata';

import { DashboardPageContainer } from './dashboard-page-container';
import { DashboardPageContent } from './dashboard-page-content';

// ----------------------------------------------------------------------

type Props = {
  pageKey: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  // Override metadata if needed
  title?: string;
  description?: string;
};

export function DashboardPageLayoutWithMetadata({
  pageKey,
  children,
  maxWidth = 'xl',
  sx,
  headerSx,
  contentSx,
  title: titleOverride,
  description: descriptionOverride,
}: Props) {
  const { title: metadataTitle, description: metadataDescription } = usePageInfo(pageKey);

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
      <DashboardPageContent sx={contentSx}>
        {children}
      </DashboardPageContent>
    </DashboardPageContainer>
  );
}
