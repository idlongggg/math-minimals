'use client';

import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';


import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function DashboardPageContent({ children, sx }: Props) {
  return (
    <Scrollbar
      sx={[
        {
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          height: '100%',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      slotProps={{
        contentSx: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          py: 1,
        },
      }}
    >
      {children}
    </Scrollbar>
  );
}
