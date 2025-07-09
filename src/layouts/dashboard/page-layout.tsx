'use client';

import React, { type ReactNode } from 'react';

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

  // Responsive: hide title/description if viewport height is too small
  const [showHeader, setShowHeader] = React.useState(true);

  React.useEffect(() => {
    function handleResize() {
      setShowHeader(window.innerHeight > 500); // Hide if height <= 500px
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {showHeader && (
        <Box sx={{ pb: 1 }}>
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{ mt: 1, color: 'text.secondary', fontStyle: 'italic', fontSize: '0.95rem' }}
            >
              {description}
            </Typography>
          )}
        </Box>
      )}
      <Scrollbar sx={{ flex: 1, minHeight: 0, pt: 1, pb: 1, pr: 2 }}>{children}</Scrollbar>
    </DashboardContent>
  );
}
