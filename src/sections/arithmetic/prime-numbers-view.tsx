'use client';

import 'katex/dist/katex.min.css';
import { useCallback, useState } from 'react';
import { InlineMath } from 'react-katex';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const QUICK_CHECKS = [
  { label: 'Số nguyên tố nhỏ', example: '7' },
  { label: 'Số nguyên tố lớn', example: '97' },
  { label: 'Số hợp hợp', example: '15' },
  { label: 'Số nguyên tố lớn', example: '101' },
  { label: 'Số chẵn', example: '14' },
  { label: 'Số nguyên tố đặc biệt', example: '2' },
];

// Danh sách 100 số nguyên tố đầu tiên
const FIRST_100_PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
  101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193,
  197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307,
  311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421,
  431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547,
];

// ----------------------------------------------------------------------

export function PrimeNumbersView() {
  const [currentTab, setCurrentTab] = useState('checker');
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState<{
    number: number;
    isPrime: boolean;
    factors?: number[];
    explanation: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [primesInRange, setPrimesInRange] = useState<number[]>([]);
  const [history, setHistory] = useState<
    Array<{
      id: string;
      number: number;
      isPrime: boolean;
      timestamp: Date;
    }>
  >([]);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  // Kiểm tra số nguyên tố bằng thuật toán cơ bản
  const isPrime = useCallback((num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }, []);

  // Tìm tất cả ước số của một số
  const findFactors = useCallback((num: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  }, []);

  // Kiểm tra số nguyên tố và tạo giải thích
  const checkPrime = useCallback(
    (num: number) => {
      const primeResult = isPrime(num);
      let explanation = '';
      let factors: number[] = [];

      if (num < 2) {
        explanation = `Số ${num} không phải là số nguyên tố vì số nguyên tố phải lớn hơn hoặc bằng 2.`;
      } else if (num === 2) {
        explanation = 'Số 2 là số nguyên tố duy nhất là số chẵn.';
      } else if (primeResult) {
        explanation = `Số ${num} là số nguyên tố vì chỉ có 2 ước số: 1 và ${num}.`;
        factors = [1, num];
      } else {
        factors = findFactors(num);
        explanation = `Số ${num} không phải là số nguyên tố vì có ${factors.length} ước số: ${factors.join(', ')}.`;
      }

      return {
        number: num,
        isPrime: primeResult,
        factors: factors.length > 0 ? factors : undefined,
        explanation,
      };
    },
    [isPrime, findFactors]
  );

  // Xử lý kiểm tra số
  const handleCheck = useCallback(() => {
    setError('');
    setResult(null);

    const num = parseInt(inputNumber.trim());
    if (isNaN(num)) {
      setError('Vui lòng nhập một số nguyên hợp lệ');
      return;
    }

    if (num < 0) {
      setError('Vui lòng nhập số nguyên dương');
      return;
    }

    if (num > 1000000) {
      setError('Vui lòng nhập số nhỏ hơn 1,000,000 để tối ưu hiệu suất');
      return;
    }

    const checkResult = checkPrime(num);
    setResult(checkResult);

    // Thêm vào lịch sử
    const historyItem = {
      id: Date.now().toString(),
      number: num,
      isPrime: checkResult.isPrime,
      timestamp: new Date(),
    };
    setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
  }, [inputNumber, checkPrime]);

  // Tìm số nguyên tố trong khoảng
  const findPrimesInRange = useCallback(() => {
    setError('');
    setPrimesInRange([]);

    const start = parseInt(rangeStart.trim());
    const end = parseInt(rangeEnd.trim());

    if (isNaN(start) || isNaN(end)) {
      setError('Vui lòng nhập khoảng số hợp lệ');
      return;
    }

    if (start < 0 || end < 0) {
      setError('Vui lòng nhập số nguyên dương');
      return;
    }

    if (start > end) {
      setError('Số bắt đầu phải nhỏ hơn hoặc bằng số kết thúc');
      return;
    }

    if (end - start > 10000) {
      setError('Khoảng tìm kiếm quá lớn. Vui lòng giới hạn trong 10,000 số');
      return;
    }

    const primes: number[] = [];
    for (let i = start; i <= end; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }

    setPrimesInRange(primes);
  }, [rangeStart, rangeEnd, isPrime]);

  const handleReset = useCallback(() => {
    setInputNumber('');
    setResult(null);
    setError('');
  }, []);

  const handleQuickCheck = useCallback(
    (quickCheck: (typeof QUICK_CHECKS)[0]) => {
      setInputNumber(quickCheck.example);
      setCurrentTab('checker');

      // Tự động kiểm tra
      setTimeout(() => {
        const num = parseInt(quickCheck.example);
        const checkResult = checkPrime(num);
        setResult(checkResult);
        setError('');

        // Thêm vào lịch sử
        const historyItem = {
          id: Date.now().toString(),
          number: num,
          isPrime: checkResult.isPrime,
          timestamp: new Date(),
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      }, 100);
    },
    [checkPrime]
  );

  const handleHistoryItemClick = useCallback(
    (item: (typeof history)[0]) => {
      setInputNumber(item.number.toString());
      const checkResult = checkPrime(item.number);
      setResult(checkResult);
      setError('');
      setCurrentTab('checker');
    },
    [checkPrime]
  );

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const renderChecker = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Kiểm tra số nguyên tố" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Nhập số cần kiểm tra"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              placeholder="Ví dụ: 17"
              type="number"
              helperText="Nhập số nguyên dương để kiểm tra"
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCheck}
                startIcon={<Iconify icon="solar:shield-check-bold" />}
                sx={{ minWidth: 200 }}
              >
                Kiểm tra
              </Button>
              <Button variant="outlined" size="large" onClick={handleReset} sx={{ minWidth: 120 }}>
                Reset
              </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {result && (
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">Kết quả cho số {result.number}</Typography>
                      <Chip
                        label={result.isPrime ? 'Số nguyên tố' : 'Không phải số nguyên tố'}
                        color={result.isPrime ? 'success' : 'error'}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body1" paragraph>
                    {result.explanation}
                  </Typography>

                  {result.factors && result.factors.length > 2 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Phân tích thành thừa số nguyên tố:
                      </Typography>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="body1">
                          <InlineMath
                            math={`${result.number} = ${getPrimeFactorization(result.number)}`}
                          />
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {result.isPrime && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'success.lighter', borderRadius: 1 }}>
                      <Typography variant="body2" color="success.dark">
                        💡 <strong>Thông tin thêm:</strong> Số {result.number} là số nguyên tố thứ{' '}
                        {FIRST_100_PRIMES.indexOf(result.number) + 1 > 0
                          ? FIRST_100_PRIMES.indexOf(result.number) + 1
                          : '?'}{' '}
                        trong dãy số nguyên tố.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderRangeFinder = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Tìm số nguyên tố trong khoảng" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <TextField
                label="Từ số"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
                placeholder="0"
                type="number"
                sx={{ flex: 1 }}
              />
              <Typography variant="h6" sx={{ mx: 1 }}>
                đến
              </Typography>
              <TextField
                label="Đến số"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
                placeholder="100"
                type="number"
                sx={{ flex: 1 }}
              />
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={findPrimesInRange}
              startIcon={<Iconify icon="solar:list-bold" />}
              sx={{ alignSelf: 'center', minWidth: 200 }}
            >
              Tìm số nguyên tố
            </Button>

            {error && <Alert severity="error">{error}</Alert>}

            {primesInRange.length > 0 && (
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">
                        Tìm thấy {primesInRange.length} số nguyên tố
                      </Typography>
                      <Chip
                        label={`Từ ${rangeStart} đến ${rangeEnd}`}
                        color="primary"
                        size="small"
                      />
                    </Box>
                  }
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      maxHeight: 300,
                      overflow: 'auto',
                    }}
                  >
                    {primesInRange.map((prime) => (
                      <Chip
                        key={prime}
                        label={prime}
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setInputNumber(prime.toString());
                          setCurrentTab('checker');
                        }}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderQuickTools = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Typography variant="h6">Kiểm tra nhanh</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {QUICK_CHECKS.map((quickCheck, index) => (
          <Card
            key={index}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => theme.vars.customShadows.z8,
              },
            }}
            onClick={() => handleQuickCheck(quickCheck)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {quickCheck.label}
                </Typography>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Số:
                  </Typography>
                  <Typography variant="h6" color="primary.main" fontWeight="bold">
                    {quickCheck.example}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Iconify icon="eva:arrowhead-right-fill" sx={{ color: 'primary.main' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card>
        <CardHeader title="100 số nguyên tố đầu tiên" />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              maxHeight: 400,
              overflow: 'auto',
            }}
          >
            {FIRST_100_PRIMES.map((prime, index) => (
              <Chip
                key={prime}
                label={`${index + 1}. ${prime}`}
                variant="outlined"
                color="primary"
                onClick={() => {
                  setInputNumber(prime.toString());
                  setCurrentTab('checker');
                }}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderHistory = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Lịch sử kiểm tra</Typography>
        {history.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleClearHistory}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            Xóa lịch sử
          </Button>
        )}
      </Box>

      {history.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Iconify
              icon="solar:clock-circle-bold"
              sx={{ width: 64, height: 64, color: 'text.disabled', mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
              Chưa có lịch sử kiểm tra
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Thực hiện kiểm tra số nguyên tố để xem lịch sử tại đây
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {history.map((item) => (
            <Card
              key={item.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'primary.lighter',
                  borderColor: 'primary.main',
                },
              }}
              onClick={() => handleHistoryItemClick(item)}
            >
              <CardContent sx={{ py: 2 }}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                      {item.number}
                    </Typography>
                    <Chip
                      label={item.isPrime ? 'Số nguyên tố' : 'Hợp số'}
                      color={item.isPrime ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {item.timestamp.toLocaleTimeString('vi-VN')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );

  const renderGuide = () => (
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
                3. <strong>Kiểm tra số chẵn:</strong> Nếu n chẵn và n {'>'} 2 thì không phải số
                nguyên tố
              </Typography>
              <Typography variant="body1">
                4. <strong>Kiểm tra chia hết:</strong> Kiểm tra từ 3 đến √n, chỉ cần kiểm tra số lẻ
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Ví dụ chi tiết:
            </Typography>

            <Box
              sx={{
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
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
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  // Hàm phụ trợ để phân tích thành thừa số nguyên tố
  const getPrimeFactorization = (num: number): string => {
    if (num < 2) return num.toString();

    const factors: number[] = [];
    let temp = num;

    // Kiểm tra từ 2
    while (temp % 2 === 0) {
      factors.push(2);
      temp /= 2;
    }

    // Kiểm tra từ 3 trở đi (chỉ số lẻ)
    for (let i = 3; i <= Math.sqrt(temp); i += 2) {
      while (temp % i === 0) {
        factors.push(i);
        temp /= i;
      }
    }

    // Nếu temp > 2 thì temp là số nguyên tố
    if (temp > 2) {
      factors.push(temp);
    }

    if (factors.length === 1) {
      return factors[0].toString();
    }

    // Nhóm các thừa số giống nhau
    const factorCounts: { [key: number]: number } = {};
    factors.forEach((factor) => {
      factorCounts[factor] = (factorCounts[factor] || 0) + 1;
    });

    return Object.entries(factorCounts)
      .map(([factor, count]) => (count === 1 ? factor : `${factor}^{${count}}`))
      .join(' \\times ');
  };

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="checker"
        label="Kiểm tra"
        icon={<Iconify icon="solar:shield-check-bold" />}
      />
      <Tab
        value="range-finder"
        label="Tìm trong khoảng"
        icon={<Iconify icon="solar:list-bold" />}
      />
      <Tab
        value="quick-tools"
        label="Công cụ nhanh"
        icon={<Iconify icon="custom:flash-outline" />}
      />
      <Tab
        value="history"
        label={`Lịch sử (${history.length})`}
        icon={<Iconify icon="solar:clock-circle-bold" />}
      />
      <Tab
        value="guide"
        label="Hướng dẫn"
        icon={<Iconify icon="solar:notebook-bold-duotone" />}
      />
    </CustomTabs>
  );

  return (
    <DashboardPageWithTabsLayout 
      title="Số nguyên tố"
      description="Công cụ kiểm tra và tìm số nguyên tố với các thuật toán tối ưu."
      tabs={renderTabs()}
    >
      {currentTab === 'checker' && renderChecker()}
      {currentTab === 'range-finder' && renderRangeFinder()}
      {currentTab === 'quick-tools' && renderQuickTools()}
      {currentTab === 'history' && renderHistory()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayout>
  );
}
