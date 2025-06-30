import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

export function MatrixCalculatorView({ sx, ...other }: BoxProps) {
  return (
    <DashboardPageLayout
      title="Máy tính ma trận"
      description="Công cụ tính toán ma trận: cộng, trừ, nhân, định thức, ma trận nghịch đảo và các phép biến đổi."
    >
      <Box>
        <Typography variant="body1">
          Công cụ tính toán ma trận sẽ được phát triển tại đây.
        </Typography>
      </Box>
    </DashboardPageLayout>
  );
}
