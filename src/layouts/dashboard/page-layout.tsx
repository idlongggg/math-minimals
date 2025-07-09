'use client';

import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales/hooks';

// ----------------------------------------------------------------------

export type PageLayoutProps = {
  children: ReactNode;
  pageKey: string;
  sx?: any;
};

export function PageLayout({ children, pageKey, sx }: PageLayoutProps) {
  const { translate: t } = useLocales();

  const title = t(`pages.${pageKey}.title`);
  const description = t(`pages.${pageKey}.description`);

  return (
    <Container maxWidth="xl" sx={{ py: 3, ...sx }}>
      <Stack spacing={3}>
        {/* Header Section */}
        <Stack spacing={1}>
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Stack>

        {/* Content Section */}
        <Box>{children}</Box>
      </Stack>
    </Container>
  );
}
