// Guide component for division with remainder

import { BlockMath, InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export function DivisionGuide() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Hướng dẫn phép chia có dư" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6">Khái niệm cơ bản:</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}>
              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Phép chia có dư</strong> là phép chia mà kết quả bao gồm{' '}
                  <strong>thương</strong> và <strong>số dư</strong>
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Công thức tổng quát:</strong>
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <BlockMath math="a = b \times q + r" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Trong đó:
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2">• a: số bị chia (dividend)</Typography>
                    <Typography variant="body2">• b: số chia (divisor)</Typography>
                    <Typography variant="body2">• q: thương (quotient)</Typography>
                    <Typography variant="body2">• r: số dư (remainder)</Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Điều kiện:</strong> <InlineMath math="0 \leq r < b" /> (số dư phải không
                  âm và nhỏ hơn số chia)
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Cách thực hiện phép chia có dư:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Bước 1:</strong> Xác định số bị chia (a) và số chia (b)
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Bước 2:</strong> Tính thương bằng cách làm tròn xuống
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <BlockMath math="q = \lfloor \frac{a}{b} \rfloor" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    (Lấy phần nguyên của phép chia)
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Bước 3:</strong> Tính số dư
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <BlockMath math="r = a - (q \times b)" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    hoặc sử dụng phép toán modulo: <InlineMath math="r = a \bmod b" />
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Bước 4:</strong> Kiểm tra kết quả
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <BlockMath math="q \times b + r = a" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Nếu đẳng thức đúng thì kết quả chính xác
                  </Typography>
                </Box>
              </Box>
            </Box>

            <DetailedExample />
            <PracticalApplications />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function DetailedExample() {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
        Ví dụ chi tiết:
      </Typography>

      <Box
        sx={{
          p: 3,
          bgcolor: 'action.hover',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body1" gutterBottom>
          <strong>Ví dụ 1:</strong> Chia 17 cho 5
        </Typography>
        <Box sx={{ ml: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Bước 1:</strong> a = 17, b = 5
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Bước 2:</strong> Tính thương
          </Typography>
          <BlockMath math="q = \lfloor \frac{17}{5} \rfloor = \lfloor 3.4 \rfloor = 3" />
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Bước 3:</strong> Tính số dư
          </Typography>
          <BlockMath math="r = 17 - (3 \times 5) = 17 - 15 = 2" />
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Bước 4:</strong> Kiểm tra
          </Typography>
          <BlockMath math="3 \times 5 + 2 = 15 + 2 = 17 \checkmark" />
          <Typography variant="body2" color="primary.main" sx={{ mt: 2, fontWeight: 'bold' }}>
            Kết quả: <InlineMath math="17 \div 5 = 3 \text{ dư } 2" />
          </Typography>
        </Box>
      </Box>
    </>
  );
}

function PracticalApplications() {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
        Ứng dụng thực tế:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2 }}>
        <Typography variant="body2">
          • <strong>Chia kẹo:</strong> 23 cái kẹo chia cho 7 bạn, mỗi bạn được bao nhiêu cái, thừa
          bao nhiêu cái?
        </Typography>
        <Typography variant="body2">
          • <strong>Xếp hàng:</strong> 50 học sinh xếp thành các hàng 8 người, có bao nhiêu hàng đầy
          và thừa bao nhiêu người?
        </Typography>
        <Typography variant="body2">
          • <strong>Đóng gói:</strong> 156 sản phẩm đóng vào các hộp 12 cái/hộp, cần bao nhiêu hộp
          và thừa bao nhiêu sản phẩm?
        </Typography>
      </Box>
    </>
  );
}
