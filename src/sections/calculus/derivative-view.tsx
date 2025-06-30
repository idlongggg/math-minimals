import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

export function DerivativeView({ sx, ...other }: BoxProps) {
  return (
    <DashboardPageLayout
      title="Đạo hàm"
      description="Công cụ tính đạo hàm, phân tích và vẽ đồ thị đạo hàm của các hàm số."
    >
      <Box>
        <Typography variant="body1">Công cụ tính đạo hàm sẽ được phát triển tại đây.</Typography>
      </Box>
    </DashboardPageLayout>
  );
}
