import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function KeyboardInstructions() {
  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        backgroundColor: 'action.hover',
        borderRadius: 1,
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Hướng dẫn bàn phím:
      </Typography>
      <Typography variant="body2" color="text.secondary">
        • Số 0-9: Nhập số • +, -, *, /, %, ^: Phép toán • Enter/=: Tính toán
        <br />• Escape/C: Xóa • Backspace: Xóa ký tự cuối • .: Dấu thập phân
      </Typography>
    </Box>
  );
}
