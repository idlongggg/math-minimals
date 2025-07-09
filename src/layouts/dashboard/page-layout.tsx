'use client';

import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales/hooks';

import { Scrollbar } from 'src/components/scrollbar';

import { DashboardContent } from './content';

// ----------------------------------------------------------------------

export type PageLayoutProps = {
  children: ReactNode;
  pageKey: string;
};
export function PageLayout({ children, pageKey }: PageLayoutProps) {
  const { translate: t } = useLocales();

  const title = t(`pages.${pageKey}.title`);
  const description = t(`pages.${pageKey}.description`);

  return (
    <DashboardContent
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height:
          'calc(100vh - var(--layout-header-desktop-height) - var(--layout-dashboard-content-pt) - var(--layout-dashboard-content-pb))',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
            {description}
          </Typography>
        )}
      </Box>
      <Scrollbar sx={{ flex: 1, minHeight: 0 }}>{children}</Scrollbar>
    </DashboardContent>
  );
}
