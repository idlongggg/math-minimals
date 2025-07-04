import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export function InstructionsPanel() {
  const theme = useTheme();

  const cardStyle = {
    p: 3,
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
  };

  return (
    <Card sx={cardStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Hướng dẫn sử dụng
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <strong>Hàm số hỗ trợ:</strong>
        <br />
        • Cơ bản: +, -, *, /, ^
        <br />
        • Lượng giác: sin, cos, tan
        <br />
        • Logarit: log (log₁₀), ln (logₑ)
        <br />
        • Khác: sqrt, abs, pi, e
        <br />
        <br />
        <strong>Thao tác:</strong>
        <br />
        • Di chuột trên đồ thị để xem tọa độ
        <br />
        • Sử dụng zoom để phóng to/thu nhỏ
        <br />
        • Bật/tắt hiển thị lưới
        <br />• Thêm nhiều hàm để so sánh
      </Typography>
    </Card>
  );
}
