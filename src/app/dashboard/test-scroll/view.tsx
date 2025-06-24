'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function TestScrollView() {
  const renderLongContent = () => {
    const items = [];
    for (let i = 1; i <= 50; i++) {
      items.push(
        <Card key={i} sx={{ mb: 2 }}>
          <CardHeader title={`Card ${i}`} />
          <CardContent>
            <Typography>
              Đây là nội dung của card số {i}. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur.
            </Typography>
            <Box
              sx={{
                mt: 2,
                height: 100,
                bgcolor: 'grey.100',
                border: 1,
                borderColor: 'grey.300',
                borderRadius: 1,
              }}
            >
              <Typography variant="caption" sx={{ p: 1 }}>
                Box nội dung bổ sung {i}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      );
    }
    return items;
  };

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Test Scroll Layout
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Trang này được tạo để test layout scroll. Page sẽ có nhiều nội dung và không được vượt quá
        chiều cao màn hình. Thay vào đó, nội dung sẽ scroll trong container.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>{renderLongContent()}</Box>
    </DashboardContent>
  );
}
