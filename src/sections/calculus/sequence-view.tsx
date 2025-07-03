import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

export function SequenceView({ sx, ...other }: BoxProps) {
  return (
    <DashboardPageLayout
      title="Dãy số"
      description="Công cụ phân tích dãy số, tính giới hạn dãy số và xét tính hội tụ."
    >
      <Box>
        <Typography variant="body1">
          Công cụ phân tích dãy số sẽ được phát triển tại đây.
        </Typography>
      </Box>
    </DashboardPageLayout>
  );
}
