'use client';

import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Scrollbar } from 'src/components/scrollbar';

import { useSettingsContext } from 'src/components/settings';
import { useLocales } from 'src/locales/hooks';

import { DashboardContent } from './content';

// ----------------------------------------------------------------------


export type PageLayoutProps = {
  children: ReactNode;
  pageKey: string;
  sx?: any;
  headerSx?: any;
  contentSx?: any;
  title?: string;
  description?: string;
};

export function PageLayout({
  children,
  pageKey,
  sx,
  headerSx,
  contentSx,
  title: titleOverride,
  description: descriptionOverride,
}: PageLayoutProps) {
  const { translate: t } = useLocales();
  const settings = useSettingsContext();

  const metaTitle = t(`pages.${pageKey}.title`);
  const metaDescription = t(`pages.${pageKey}.description`);
  const title = titleOverride || metaTitle;
  const description = descriptionOverride || metaDescription;

  const isNavHorizontal = settings.state.navLayout === 'horizontal';
  return (
    <DashboardContent
      maxWidth="xl"
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
      {/* Fixed Header Section */}
      <Box
        sx={[
          {
            flexShrink: 0,
          },
          headerSx,
        ]}
      >
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
            {description}
          </Typography>
        )}
      </Box>
      {/* Scrollable Content Section */}
      <Scrollbar
        sx={[
          { flex: 1, minHeight: 0 },
          contentSx,
        ]}
      >
        {children}
      </Scrollbar>
    </DashboardContent>
  );
}
