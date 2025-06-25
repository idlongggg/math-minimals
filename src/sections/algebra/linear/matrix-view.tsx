import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function MatrixCalculatorView({ sx, ...other }: BoxProps) {
  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 4 }}>
          Máy tính ma trận
        </Typography>
        <Box>
          <Typography variant="body1">
            Công cụ tính toán ma trận sẽ được phát triển tại đây.
          </Typography>
        </Box>
      </Container>
    </DashboardContent>
  );
}
