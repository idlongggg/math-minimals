'use client';

import type { ReactNode } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';

import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = {
  tabs: ReactNode;
  children: ReactNode;
  tabsSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
};

export function DashboardPageWithTabsContent({ tabs, children, tabsSx, contentSx }: Props) {
  return (
    <>
      {/* Fixed Tabs */}
      <Box
        sx={[
          {
            flexShrink: 0,
            mb: 2,
            // Override CustomTabs padding to align with content
            '& .MuiTabs-root': {
              marginLeft: '-8px',
              marginRight: '-8px',
            },
          },
          ...(Array.isArray(tabsSx) ? tabsSx : [tabsSx]),
        ]}
      >
        {tabs}
      </Box>

      {/* Scrollable Content */}
      <Scrollbar
        sx={[
          {
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            height: '100%',
          },
          ...(Array.isArray(contentSx) ? contentSx : [contentSx]),
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
    </>
  );
}
