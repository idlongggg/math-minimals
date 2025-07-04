// Guide component for base conversion

import { BlockMath, InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export function BaseConversionGuide() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card>
        <CardHeader title="Hướng dẫn chuyển đổi cơ số" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6">Các hệ cơ số phổ biến:</Typography>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}
            >
              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Nhị phân (Base 2):</strong> Chỉ sử dụng các chữ số{' '}
                  <InlineMath math="\{0, 1\}" />
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  Ví dụ: <InlineMath math="1010_{(2)} = 10_{(10)}" />
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Bát phân (Base 8):</strong> Sử dụng các chữ số{' '}
                  <InlineMath math="\{0, 1, 2, 3, 4, 5, 6, 7\}" />
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  Ví dụ: <InlineMath math="377_{(8)} = 255_{(10)}" />
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Thập phân (Base 10):</strong> Sử dụng các chữ số{' '}
                  <InlineMath math="\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}" /> (hệ
                  thông thường)
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  Ví dụ: <InlineMath math="255_{(10)}" />
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Thập lục phân (Base 16):</strong> Sử dụng{' '}
                  <InlineMath math="\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F\}" />
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  Ví dụ: <InlineMath math="FF_{(16)} = 255_{(10)}" />
                </Typography>
              </Box>
            </Box>

            <ConversionFormulas />
            <DetailedExamples />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function ConversionFormulas() {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
        Công thức chuyển đổi:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}>
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>1. Từ hệ cơ số b sang thập phân:</strong>
          </Typography>
          <Box sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <BlockMath math="N_{(b)} = \sum_{i=0}^{n-1} d_i \times b^i" />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Trong đó: <InlineMath math="d_i" /> là chữ số thứ i từ phải sang
              trái, <InlineMath math="b" /> là cơ số
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>2. Từ thập phân sang hệ cơ số b:</strong>
          </Typography>
          <Box sx={{ ml: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Thuật toán chia liên tục:
            </Typography>
            <BlockMath math="N_{(10)} \div b = q_1 \text{ dư } r_1" />
            <BlockMath math="q_1 \div b = q_2 \text{ dư } r_2" />
            <BlockMath math="\vdots" />
            <BlockMath math="q_{n-1} \div b = 0 \text{ dư } r_n" />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Kết quả: <InlineMath math="r_n r_{n-1} \ldots r_2 r_1" />
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function DetailedExamples() {
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
          <strong>Chuyển đổi từ nhị phân sang thập phân:</strong>
        </Typography>
        <Box sx={{ ml: 2 }}>
          <BlockMath math="1101_{(2)} = 1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0" />
          <BlockMath math="= 1 \times 8 + 1 \times 4 + 0 \times 2 + 1 \times 1" />
          <BlockMath math="= 8 + 4 + 0 + 1 = 13_{(10)}" />
        </Box>

        <Typography variant="body1" gutterBottom sx={{ mt: 3 }}>
          <strong>Chuyển đổi từ thập phân sang nhị phân:</strong>
        </Typography>
        <Box sx={{ ml: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
            Chuyển 13₁₀ sang nhị phân:
          </Typography>
          <BlockMath math="13 \div 2 = 6 \text{ dư } 1" />
          <BlockMath math="6 \div 2 = 3 \text{ dư } 0" />
          <BlockMath math="3 \div 2 = 1 \text{ dư } 1" />
          <BlockMath math="1 \div 2 = 0 \text{ dư } 1" />
          <Typography variant="body2" color="primary.main" sx={{ mt: 1 }}>
            Đọc từ dưới lên: <InlineMath math="13_{(10)} = 1101_{(2)}" />
          </Typography>
        </Box>

        <Typography variant="body1" gutterBottom sx={{ mt: 3 }}>
          <strong>Chuyển đổi thập lục phân sang thập phân:</strong>
        </Typography>
        <Box sx={{ ml: 2 }}>
          <BlockMath math="2A3_{(16)} = 2 \times 16^2 + A \times 16^1 + 3 \times 16^0" />
          <BlockMath math="= 2 \times 256 + 10 \times 16 + 3 \times 1" />
          <BlockMath math="= 512 + 160 + 3 = 675_{(10)}" />
        </Box>
      </Box>
    </>
  );
}
