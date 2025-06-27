import { Card, CardContent, Typography } from '@mui/material';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

export function TestLayoutPage() {
  return (
    <DashboardPageLayout
      title="Test Layout"
      description="Đây là page test để kiểm tra layout có hoạt động đúng không. Title và description này phải cố định, không bị scroll."
    >
      {/* Tạo nhiều nội dung để test scroll */}
      {Array.from({ length: 20 }, (_, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Card {i + 1}
            </Typography>
            <Typography variant="body1">
              Đây là nội dung của card {i + 1}. Phần này phải có thể scroll được trong khi title và description ở trên cố định.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </DashboardPageLayout>
  );
}
