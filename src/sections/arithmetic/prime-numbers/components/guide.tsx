// Guide component for prime numbers

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { PRIME_FACTS } from '../constants';

export function PrimeGuide() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Hướng dẫn về số nguyên tố" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" gutterBottom>
              Số nguyên tố là gì?
            </Typography>

            <Typography variant="body1" paragraph>
              Số nguyên tố là số tự nhiên lớn hơn 1 và chỉ có đúng hai ước số dương: 1 và chính nó.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2 }}>
              <Typography variant="body1">
                • <strong>Ví dụ số nguyên tố:</strong> 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...
              </Typography>
              <Typography variant="body1">
                • <strong>Số 2:</strong> Là số nguyên tố duy nhất là số chẵn
              </Typography>
              <Typography variant="body1">
                • <strong>Số 1:</strong> Không được coi là số nguyên tố
              </Typography>
            </Box>

            <AlgorithmSection />
            <DetailedExample />
            <ApplicationsSection />
            <InterestingFacts />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function AlgorithmSection() {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
        Thuật toán kiểm tra số nguyên tố:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
        <Typography variant="body1">
          1. <strong>Kiểm tra đặc biệt:</strong> Nếu n ≤ 1 thì không phải số nguyên tố
        </Typography>
        <Typography variant="body1">
          2. <strong>Kiểm tra số 2:</strong> Nếu n = 2 thì là số nguyên tố
        </Typography>
        <Typography variant="body1">
          3. <strong>Kiểm tra số chẵn:</strong> Nếu n chẵn và n {'>'} 2 thì không phải số nguyên tố
        </Typography>
        <Typography variant="body1">
          4. <strong>Kiểm tra chia hết:</strong> Kiểm tra từ 3 đến √n, chỉ cần kiểm tra số lẻ
        </Typography>
      </Box>
    </>
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
          <strong>Kiểm tra 17 có phải số nguyên tố không?</strong>
        </Typography>
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1">
            <strong>Bước 1:</strong> 17 {'>'} 1 ✓
          </Typography>
          <Typography variant="body1">
            <strong>Bước 2:</strong> 17 ≠ 2, và 17 là số lẻ ✓
          </Typography>
          <Typography variant="body1">
            <strong>Bước 3:</strong> Kiểm tra từ 3 đến √17 ≈ 4.12
          </Typography>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body1">• 17 ÷ 3 = 5 dư 2 (không chia hết)</Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{ mt: 1, fontWeight: 'bold', color: 'success.main' }}
          >
            <strong>Kết luận:</strong> 17 là số nguyên tố
          </Typography>
        </Box>
      </Box>
    </>
  );
}

function ApplicationsSection() {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
        Ứng dụng của số nguyên tố:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
        <Typography variant="body1">
          • <strong>Mật mã học:</strong> RSA và các hệ mã hóa khác
        </Typography>
        <Typography variant="body1">
          • <strong>Toán học:</strong> Định lý cơ bản của số học
        </Typography>
        <Typography variant="body1">
          • <strong>Khoa học máy tính:</strong> Hash function, kiểm tra tính ngẫu nhiên
        </Typography>
        <Typography variant="body1">
          • <strong>Phân tích số:</strong> Phân tích thành thừa số nguyên tố
        </Typography>
      </Box>
    </>
  );
}

function InterestingFacts() {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
        Những sự thật thú vị:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
        {PRIME_FACTS.map((fact, index) => (
          <Typography key={index} variant="body1">
            • {fact}
          </Typography>
        ))}
      </Box>
    </>
  );
}
