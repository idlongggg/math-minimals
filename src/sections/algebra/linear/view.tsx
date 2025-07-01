import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function LinearAlgebraView({ sx, ...other }: BoxProps) {
  const tools = [
    {
      title: 'Máy tính ma trận',
      description: 'Tính toán với ma trận: cộng, trừ, nhân, định thức',
      path: paths.dashboard.algebra.linear.matrix,
    },
    {
      title: 'Hệ phương trình',
      description: 'Giải hệ phương trình tuyến tính',
      path: paths.dashboard.algebra.linear.system,
    },
  ];

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 4 }}>
          Đại số tuyến tính
        </Typography>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
        >
          {tools.map((tool) => (
            <Card key={tool.title} sx={{ height: 1 }}>
              <CardContent
                sx={{ height: 1, display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {tool.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flexGrow: 1 }}
                >
                  {tool.description}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    component={RouterLink}
                    href={tool.path}
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    Sử dụng
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </DashboardContent>
  );
}
