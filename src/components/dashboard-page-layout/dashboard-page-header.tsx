'use client';

import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  description?: string;
  sx?: SxProps<Theme>;
};

export function DashboardPageHeader({ title, description, sx }: Props) {
  return (
    <Box
      sx={[
        {
          flexShrink: 0,
          mb: 2,
          pt: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="h4" sx={{ mb: 1 }}>
        {title}
      </Typography>

      {description && (
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', fontStyle: 'italic' }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
