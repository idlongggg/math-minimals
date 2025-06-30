import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

export function SystemEquationView({ sx, ...other }: BoxProps) {
  return (
    <DashboardPageLayout
      title="Hệ phương trình"
      description="Công cụ giải hệ phương trình tuyến tính bằng các phương pháp khử Gauss, Cramer và ma trận."
    >
      <Box>
        <Typography variant="body1">
          Công cụ giải hệ phương trình tuyến tính sẽ được phát triển tại đây.
        </Typography>
      </Box>
    </DashboardPageLayout>
  );
}
