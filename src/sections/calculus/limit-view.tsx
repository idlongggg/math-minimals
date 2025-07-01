import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

export function LimitView({ sx, ...other }: BoxProps) {
  return (
    <DashboardPageLayout
      title="Giới hạn"
      description="Công cụ tính giới hạn của hàm số, phân tích tính liên tục và các dạng vô định."
    >
      <Box>
        <Typography variant="body1">
          Công cụ tính giới hạn sẽ được phát triển tại đây.
        </Typography>
      </Box>
    </DashboardPageLayout>
  );
}
