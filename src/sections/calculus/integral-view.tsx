import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

export function IntegralView({ sx, ...other }: BoxProps) {
  return (
    <DashboardPageLayout
      title="Tích phân"
      description="Công cụ tính tích phân xác định và không xác định, vẽ đồ thị và phân tích diện tích."
    >
      <Box>
        <Typography variant="body1">
          Công cụ tính tích phân sẽ được phát triển tại đây.
        </Typography>
      </Box>
    </DashboardPageLayout>
  );
}
