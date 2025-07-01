'use client';

import 'katex/dist/katex.min.css';
import { useState, useCallback } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

// Các ví dụ nhanh
const QUICK_EXAMPLES = [
  { label: 'Số nhỏ', example: '12' },
  { label: 'Số nguyên tố', example: '17' },
  { label: 'Số chính phương', example: '36' },
  { label: 'Số lớn', example: '60' },
  { label: 'Số có nhiều ước', example: '120' },
  { label: 'Lũy thừa của 2', example: '64' },
];

// Các cặp số để tính GCD/LCM
const QUICK_PAIRS = [
  { label: 'Cặp đơn giản', a: '12', b: '18' },
  { label: 'Số nguyên tố cùng nhau', a: '15', b: '28' },
  { label: 'Một số bội của số kia', a: '24', b: '8' },
  { label: 'Hai số lớn', a: '48', b: '72' },
];

// ----------------------------------------------------------------------

interface DivisorResult {
  number: number;
  divisors: number[];
  divisorCount: number;
  divisorSum: number;
  isPrime: boolean;
  isPerfectSquare: boolean;
  isPerfectNumber: boolean;
  properDivisors: number[];
}

interface MultipleResult {
  number: number;
  multiples: number[];
  count: number;
  limit: number;
}

interface GcdLcmResult {
  a: number;
  b: number;
  gcd: number;
  lcm: number;
  steps: {
    step: number;
    description: string;
    calculation: string;
    result: string;
  }[];
}

export function DivisorsMultiplesView() {
  const [currentTab, setCurrentTab] = useState('divisors');

  // Divisors tab
  const [divisorInput, setDivisorInput] = useState('');
  const [divisorResult, setDivisorResult] = useState<DivisorResult | null>(
    null
  );

  // Multiples tab
  const [multipleInput, setMultipleInput] = useState('');
  const [multipleLimit, setMultipleLimit] = useState('10');
  const [multipleResult, setMultipleResult] = useState<MultipleResult | null>(
    null
  );

  // GCD/LCM tab
  const [gcdLcmInputA, setGcdLcmInputA] = useState('');
  const [gcdLcmInputB, setGcdLcmInputB] = useState('');
  const [gcdLcmResult, setGcdLcmResult] = useState<GcdLcmResult | null>(null);

  const [error, setError] = useState('');
  const [history, setHistory] = useState<
    Array<{
      id: string;
      type: 'divisor' | 'multiple' | 'gcd-lcm';
      data: any;
      timestamp: Date;
    }>
  >([]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  // Tìm tất cả ước số của một số
  const findAllDivisors = useCallback((num: number): number[] => {
    const divisors: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        divisors.push(i);
        if (i !== Math.sqrt(num)) {
          divisors.push(num / i);
        }
      }
    }
    return divisors.sort((a, b) => a - b);
  }, []);

  // Kiểm tra số nguyên tố
  const isPrime = useCallback((num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }, []);

  // Kiểm tra số chính phương
  const isPerfectSquare = useCallback((num: number): boolean => {
    const sqrt = Math.sqrt(num);
    return sqrt === Math.floor(sqrt);
  }, []);

  // Kiểm tra số hoàn hảo
  const isPerfectNumber = useCallback(
    (num: number): boolean => {
      const divisors = findAllDivisors(num);
      const properDivisors = divisors.filter((d) => d !== num);
      const sum = properDivisors.reduce((acc, d) => acc + d, 0);
      return sum === num;
    },
    [findAllDivisors]
  );

  // Tìm bội số
  const findMultiples = useCallback((num: number, limit: number): number[] => {
    const multiples: number[] = [];
    for (let i = 1; i <= limit; i++) {
      multiples.push(num * i);
    }
    return multiples;
  }, []);

  // Tính GCD bằng thuật toán Euclid
  const calculateGcd = useCallback(
    (a: number, b: number): { gcd: number; steps: any[] } => {
      const steps = [];
      let x = a,
        y = b;
      let stepCount = 1;

      while (y !== 0) {
        const quotient = Math.floor(x / y);
        const remainder = x % y;

        steps.push({
          step: stepCount,
          description:
            stepCount === 1
              ? 'Áp dụng thuật toán Euclid'
              : 'Tiếp tục thuật toán',
          calculation: `${x} = ${y} \\times ${quotient} + ${remainder}`,
          result:
            remainder === 0 ? `GCD = ${y}` : `Tiếp tục với ${y}, ${remainder}`,
        });

        x = y;
        y = remainder;
        stepCount++;
      }

      return { gcd: x, steps };
    },
    []
  );

  // Tính LCM
  const calculateLcm = useCallback(
    (a: number, b: number, gcd: number): number => Math.abs(a * b) / gcd,
    []
  );

  // Xử lý tìm ước số
  const handleFindDivisors = useCallback(() => {
    setError('');
    setDivisorResult(null);

    const num = parseInt(divisorInput.trim());
    if (isNaN(num) || num <= 0) {
      setError('Vui lòng nhập một số nguyên dương');
      return;
    }

    if (num > 1000000) {
      setError('Vui lòng nhập số nhỏ hơn 1,000,000 để tối ưu hiệu suất');
      return;
    }

    const divisors = findAllDivisors(num);
    const properDivisors = divisors.filter((d) => d !== num);

    const result: DivisorResult = {
      number: num,
      divisors,
      divisorCount: divisors.length,
      divisorSum: divisors.reduce((sum, d) => sum + d, 0),
      isPrime: isPrime(num),
      isPerfectSquare: isPerfectSquare(num),
      isPerfectNumber: isPerfectNumber(num),
      properDivisors,
    };

    setDivisorResult(result);

    // Thêm vào lịch sử
    const historyItem = {
      id: Date.now().toString(),
      type: 'divisor' as const,
      data: result,
      timestamp: new Date(),
    };
    setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
  }, [
    divisorInput,
    findAllDivisors,
    isPrime,
    isPerfectSquare,
    isPerfectNumber,
  ]);

  // Xử lý tìm bội số
  const handleFindMultiples = useCallback(() => {
    setError('');
    setMultipleResult(null);

    const num = parseInt(multipleInput.trim());
    const limit = parseInt(multipleLimit.trim());

    if (isNaN(num) || num <= 0) {
      setError('Vui lòng nhập một số nguyên dương');
      return;
    }

    if (isNaN(limit) || limit <= 0 || limit > 50) {
      setError('Vui lòng nhập số lượng bội từ 1 đến 50');
      return;
    }

    const multiples = findMultiples(num, limit);

    const result: MultipleResult = {
      number: num,
      multiples,
      count: limit,
      limit: multiples[multiples.length - 1],
    };

    setMultipleResult(result);

    // Thêm vào lịch sử
    const historyItem = {
      id: Date.now().toString(),
      type: 'multiple' as const,
      data: result,
      timestamp: new Date(),
    };
    setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
  }, [multipleInput, multipleLimit, findMultiples]);

  // Xử lý tính GCD và LCM
  const handleCalculateGcdLcm = useCallback(() => {
    setError('');
    setGcdLcmResult(null);

    const a = parseInt(gcdLcmInputA.trim());
    const b = parseInt(gcdLcmInputB.trim());

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      setError('Vui lòng nhập hai số nguyên dương');
      return;
    }

    if (a > 1000000 || b > 1000000) {
      setError('Vui lòng nhập số nhỏ hơn 1,000,000');
      return;
    }

    const { gcd, steps } = calculateGcd(a, b);
    const lcm = calculateLcm(a, b, gcd);

    const result: GcdLcmResult = {
      a,
      b,
      gcd,
      lcm,
      steps,
    };

    setGcdLcmResult(result);

    // Thêm vào lịch sử
    const historyItem = {
      id: Date.now().toString(),
      type: 'gcd-lcm' as const,
      data: result,
      timestamp: new Date(),
    };
    setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
  }, [gcdLcmInputA, gcdLcmInputB, calculateGcd, calculateLcm]);

  const handleReset = useCallback(() => {
    setDivisorInput('');
    setMultipleInput('');
    setMultipleLimit('10');
    setGcdLcmInputA('');
    setGcdLcmInputB('');
    setDivisorResult(null);
    setMultipleResult(null);
    setGcdLcmResult(null);
    setError('');
  }, []);

  const handleQuickExample = useCallback(
    (example: (typeof QUICK_EXAMPLES)[0]) => {
      setDivisorInput(example.example);
      setCurrentTab('divisors');

      // Tự động tính
      setTimeout(() => {
        const num = parseInt(example.example);
        const divisors = findAllDivisors(num);
        const properDivisors = divisors.filter((d) => d !== num);

        const result: DivisorResult = {
          number: num,
          divisors,
          divisorCount: divisors.length,
          divisorSum: divisors.reduce((sum, d) => sum + d, 0),
          isPrime: isPrime(num),
          isPerfectSquare: isPerfectSquare(num),
          isPerfectNumber: isPerfectNumber(num),
          properDivisors,
        };

        setDivisorResult(result);
        setError('');

        const historyItem = {
          id: Date.now().toString(),
          type: 'divisor' as const,
          data: result,
          timestamp: new Date(),
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      }, 100);
    },
    [findAllDivisors, isPrime, isPerfectSquare, isPerfectNumber]
  );

  const handleQuickPair = useCallback(
    (pair: (typeof QUICK_PAIRS)[0]) => {
      setGcdLcmInputA(pair.a);
      setGcdLcmInputB(pair.b);
      setCurrentTab('gcd-lcm');

      // Tự động tính
      setTimeout(() => {
        const a = parseInt(pair.a);
        const b = parseInt(pair.b);
        const { gcd, steps } = calculateGcd(a, b);
        const lcm = calculateLcm(a, b, gcd);

        const result: GcdLcmResult = {
          a,
          b,
          gcd,
          lcm,
          steps,
        };

        setGcdLcmResult(result);
        setError('');

        const historyItem = {
          id: Date.now().toString(),
          type: 'gcd-lcm' as const,
          data: result,
          timestamp: new Date(),
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      }, 100);
    },
    [calculateGcd, calculateLcm]
  );

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const handleHistoryItemClick = useCallback((item: (typeof history)[0]) => {
    if (item.type === 'divisor') {
      setDivisorInput(item.data.number.toString());
      setDivisorResult(item.data);
      setCurrentTab('divisors');
    } else if (item.type === 'multiple') {
      setMultipleInput(item.data.number.toString());
      setMultipleLimit(item.data.count.toString());
      setMultipleResult(item.data);
      setCurrentTab('multiples');
    } else if (item.type === 'gcd-lcm') {
      setGcdLcmInputA(item.data.a.toString());
      setGcdLcmInputB(item.data.b.toString());
      setGcdLcmResult(item.data);
      setCurrentTab('gcd-lcm');
    }
    setError('');
  }, []);

  const renderDivisors = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Tìm ước số" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Nhập số cần tìm ước"
              value={divisorInput}
              onChange={(e) => setDivisorInput(e.target.value)}
              placeholder="Ví dụ: 12"
              type="number"
              inputProps={{ min: 1, step: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Chip label="n" size="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleFindDivisors}
                startIcon={<Iconify icon="solar:restart-bold" />}
                sx={{ minWidth: 200 }}
              >
                Tìm ước số
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleReset}
                sx={{ minWidth: 120 }}
              >
                Reset
              </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {divisorResult && (
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">
                        Ước số của {divisorResult.number}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {divisorResult.isPrime && (
                          <Chip
                            label="Số nguyên tố"
                            color="success"
                            size="small"
                          />
                        )}
                        {divisorResult.isPerfectSquare && (
                          <Chip
                            label="Số chính phương"
                            color="info"
                            size="small"
                          />
                        )}
                        {divisorResult.isPerfectNumber && (
                          <Chip
                            label="Số hoàn hảo"
                            color="warning"
                            size="small"
                          />
                        )}
                      </Box>
                    </Box>
                  }
                />
                <CardContent>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                  >
                    {/* Tất cả ước số */}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Tất cả ước số ({divisorResult.divisorCount} ước):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          p: 2,
                          bgcolor: 'grey.50',
                          borderRadius: 1,
                        }}
                      >
                        {divisorResult.divisors.map((divisor) => (
                          <Chip
                            key={divisor}
                            label={divisor}
                            variant="outlined"
                            color="primary"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>

                    <Divider />

                    {/* Thông tin bổ sung */}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Thông tin chi tiết:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                        }}
                      >
                        <Typography variant="body1">
                          • <strong>Số lượng ước số:</strong>{' '}
                          {divisorResult.divisorCount}
                        </Typography>
                        <Typography variant="body1">
                          • <strong>Tổng tất cả ước số:</strong>{' '}
                          {divisorResult.divisorSum}
                        </Typography>
                        <Typography variant="body1">
                          • <strong>Tổng ước thực sự:</strong>{' '}
                          {divisorResult.properDivisors.reduce(
                            (sum, d) => sum + d,
                            0
                          )}{' '}
                          (trừ chính số đó)
                        </Typography>
                        <Typography variant="body1">
                          • <strong>Loại số:</strong>{' '}
                          {divisorResult.isPrime
                            ? 'Số nguyên tố'
                            : divisorResult.isPerfectSquare
                              ? 'Số chính phương'
                              : divisorResult.isPerfectNumber
                                ? 'Số hoàn hảo'
                                : 'Hợp số'}
                        </Typography>
                        {divisorResult.isPerfectSquare && (
                          <Typography variant="body1">
                            • <strong>Căn bậc hai:</strong> √
                            {divisorResult.number} ={' '}
                            {Math.sqrt(divisorResult.number)}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Box
                      sx={{ p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}
                    >
                      <Typography variant="body2" color="info.dark">
                        💡 <strong>Giải thích:</strong> Ước số của n là những số
                        nguyên dương chia hết cho n.
                        {divisorResult.isPrime &&
                          ' Số nguyên tố chỉ có 2 ước số: 1 và chính nó.'}
                        {divisorResult.isPerfectNumber &&
                          ' Số hoàn hảo là số bằng tổng các ước thực sự của nó.'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderMultiples = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Tìm bội số" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Nhập số cần tìm bội"
                value={multipleInput}
                onChange={(e) => setMultipleInput(e.target.value)}
                placeholder="Ví dụ: 3"
                type="number"
                inputProps={{ min: 1, step: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Chip label="n" size="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Số lượng bội"
                value={multipleLimit}
                onChange={(e) => setMultipleLimit(e.target.value)}
                placeholder="10"
                type="number"
                inputProps={{ min: 1, max: 50, step: 1 }}
                sx={{ minWidth: 150 }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleFindMultiples}
                startIcon={<Iconify icon="solar:restart-bold" />}
                sx={{ minWidth: 200 }}
              >
                Tìm bội số
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleReset}
                sx={{ minWidth: 120 }}
              >
                Reset
              </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {multipleResult && (
              <Card>
                <CardHeader
                  title={`${multipleResult.count} bội số đầu tiên của ${multipleResult.number}`}
                />
                <CardContent>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Dãy bội số:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          p: 2,
                          bgcolor: 'grey.50',
                          borderRadius: 1,
                        }}
                      >
                        {multipleResult.multiples.map((multiple, index) => (
                          <Chip
                            key={index}
                            label={multiple}
                            variant="outlined"
                            color="secondary"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Thông tin:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                        }}
                      >
                        <Typography variant="body1">
                          • <strong>Số gốc:</strong> {multipleResult.number}
                        </Typography>
                        <Typography variant="body1">
                          • <strong>Số lượng bội:</strong>{' '}
                          {multipleResult.count}
                        </Typography>
                        <Typography variant="body1">
                          • <strong>Bội lớn nhất:</strong>{' '}
                          {multipleResult.limit}
                        </Typography>
                        <Typography variant="body1">
                          • <strong>Công thức:</strong>{' '}
                          <InlineMath
                            math={`${multipleResult.number} \\times k`}
                          />{' '}
                          với k = 1, 2, 3, ...
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{ p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}
                    >
                      <Typography variant="body2" color="info.dark">
                        💡 <strong>Giải thích:</strong> Bội số của n là những số
                        có thể chia hết cho n. Bội số của n có dạng n × k với k
                        là số nguyên dương.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderGcdLcm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Tính ước chung lớn nhất (GCD) và bội chung nhỏ nhất (LCM)" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <TextField
                label="Số thứ nhất"
                value={gcdLcmInputA}
                onChange={(e) => setGcdLcmInputA(e.target.value)}
                placeholder="12"
                type="number"
                sx={{ flex: 1 }}
              />
              <Typography variant="h6" sx={{ mx: 1 }}>
                và
              </Typography>
              <TextField
                label="Số thứ hai"
                value={gcdLcmInputB}
                onChange={(e) => setGcdLcmInputB(e.target.value)}
                placeholder="18"
                type="number"
                sx={{ flex: 1 }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCalculateGcdLcm}
                startIcon={<Iconify icon="solar:restart-bold" />}
                sx={{ minWidth: 200 }}
              >
                Tính GCD và LCM
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleReset}
                sx={{ minWidth: 120 }}
              >
                Reset
              </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {gcdLcmResult && (
              <Card>
                <CardHeader
                  title={`GCD và LCM của ${gcdLcmResult.a} và ${gcdLcmResult.b}`}
                />
                <CardContent>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                  >
                    {/* Kết quả */}
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 3,
                      }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          bgcolor: 'success.lighter',
                          borderRadius: 2,
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="success.dark"
                          gutterBottom
                        >
                          Ước chung lớn nhất (GCD)
                        </Typography>
                        <Typography variant="h3" color="success.main">
                          {gcdLcmResult.gcd}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          <InlineMath
                            math={`\\gcd(${gcdLcmResult.a}, ${gcdLcmResult.b}) = ${gcdLcmResult.gcd}`}
                          />
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          p: 3,
                          bgcolor: 'primary.lighter',
                          borderRadius: 2,
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="primary.dark"
                          gutterBottom
                        >
                          Bội chung nhỏ nhất (LCM)
                        </Typography>
                        <Typography variant="h3" color="primary.main">
                          {gcdLcmResult.lcm}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          <InlineMath
                            math={`\\text{lcm}(${gcdLcmResult.a}, ${gcdLcmResult.b}) = ${gcdLcmResult.lcm}`}
                          />
                        </Typography>
                      </Box>
                    </Box>

                    <Divider />

                    {/* Chi tiết thuật toán Euclid */}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Chi tiết thuật toán Euclid tìm GCD:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}
                      >
                        {gcdLcmResult.steps.map((step, index) => (
                          <Box
                            key={index}
                            sx={{
                              p: 2,
                              bgcolor:
                                index === gcdLcmResult.steps.length - 1
                                  ? 'success.lighter'
                                  : 'grey.50',
                              borderRadius: 1,
                              border: '1px solid',
                              borderColor:
                                index === gcdLcmResult.steps.length - 1
                                  ? 'success.main'
                                  : 'grey.200',
                            }}
                          >
                            <Typography variant="subtitle2" gutterBottom>
                              Bước {step.step}: {step.description}
                            </Typography>
                            <Box
                              component="div"
                              sx={{ fontSize: '1.1rem', mb: 1 }}
                            >
                              <BlockMath math={step.calculation} />
                            </Box>
                            <Typography
                              variant="body2"
                              color={
                                index === gcdLcmResult.steps.length - 1
                                  ? 'success.dark'
                                  : 'text.secondary'
                              }
                              sx={{
                                fontWeight:
                                  index === gcdLcmResult.steps.length - 1
                                    ? 'bold'
                                    : 'normal',
                              }}
                            >
                              {step.result}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* Công thức LCM */}
                    <Box
                      sx={{ p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}
                    >
                      <Typography variant="body1" gutterBottom>
                        <strong>Công thức tính LCM:</strong>
                      </Typography>
                      <BlockMath
                        math={`\\text{LCM}(a,b) = \\frac{a \\times b}{\\gcd(a,b)} = \\frac{${gcdLcmResult.a} \\times ${gcdLcmResult.b}}{${gcdLcmResult.gcd}} = \\frac{${gcdLcmResult.a * gcdLcmResult.b}}{${gcdLcmResult.gcd}} = ${gcdLcmResult.lcm}`}
                      />
                    </Box>

                    <Box
                      sx={{ p: 2, bgcolor: 'warning.lighter', borderRadius: 1 }}
                    >
                      <Typography variant="body2" color="warning.dark">
                        💡 <strong>Quan hệ:</strong> GCD × LCM = tích của hai số
                        ban đầu
                        <br />
                        <InlineMath
                          math={`${gcdLcmResult.gcd} \\times ${gcdLcmResult.lcm} = ${gcdLcmResult.gcd * gcdLcmResult.lcm} = ${gcdLcmResult.a} \\times ${gcdLcmResult.b}`}
                        />
                      </Typography>
                    </Box>
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
      <Typography variant="h6">Ví dụ nhanh - Tìm ước số</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {QUICK_EXAMPLES.map((example, index) => (
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
            onClick={() => handleQuickExample(example)}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {example.label}
                </Typography>
                <Typography variant="h4" color="primary.main">
                  {example.example}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Iconify
                    icon="eva:arrowhead-right-fill"
                    sx={{ color: 'primary.main' }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider />

      <Typography variant="h6">Ví dụ nhanh - Tính GCD/LCM</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 2,
        }}
      >
        {QUICK_PAIRS.map((pair, index) => (
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
            onClick={() => handleQuickPair(pair)}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {pair.label}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography variant="h5" color="primary.main">
                    {pair.a}
                  </Typography>
                  <Typography variant="body1">và</Typography>
                  <Typography variant="h5" color="primary.main">
                    {pair.b}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Iconify
                    icon="eva:arrowhead-right-fill"
                    sx={{ color: 'primary.main' }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );

  const renderHistory = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Lịch sử tính toán</Typography>
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
              Chưa có lịch sử tính toán
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Thực hiện các phép tính để xem lịch sử tại đây
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
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {item.type === 'divisor' &&
                        `Ước số của ${item.data.number}`}
                      {item.type === 'multiple' &&
                        `${item.data.count} bội của ${item.data.number}`}
                      {item.type === 'gcd-lcm' &&
                        `GCD/LCM của ${item.data.a} và ${item.data.b}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.type === 'divisor' &&
                        `${item.data.divisorCount} ước số`}
                      {item.type === 'multiple' &&
                        `Lớn nhất: ${item.data.limit}`}
                      {item.type === 'gcd-lcm' &&
                        `GCD: ${item.data.gcd}, LCM: ${item.data.lcm}`}
                    </Typography>
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
        <CardHeader title="Hướng dẫn về ước số và bội số" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" gutterBottom>
              1. Ước số
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Ước số</strong> của một số tự nhiên n là những số tự nhiên
              chia hết cho n.
            </Typography>

            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" paragraph>
                • <strong>Ví dụ:</strong> Ước số của 12 là: 1, 2, 3, 4, 6, 12
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Cách tìm:</strong> Kiểm tra tất cả số từ 1 đến √n
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Tính chất:</strong> Số 1 và chính nó luôn là ước số
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              2. Bội số
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Bội số</strong> của một số tự nhiên n là những số chia hết
              cho n.
            </Typography>

            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" paragraph>
                • <strong>Ví dụ:</strong> Bội số của 3 là: 3, 6, 9, 12, 15, 18,
                ...
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Công thức:</strong> Bội số của n có dạng n × k (k = 1,
                2, 3, ...)
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Tính chất:</strong> Có vô số bội số của một số
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              3. Ước chung lớn nhất (GCD) và Bội chung nhỏ nhất (LCM)
            </Typography>

            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" paragraph>
                • <strong>GCD(a,b):</strong> Số lớn nhất chia hết cho cả a và b
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>LCM(a,b):</strong> Số nhỏ nhất chia hết cho cả a và b
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Thuật toán Euclid:</strong> Tìm GCD bằng phép chia
                liên tiếp
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Công thức:</strong> GCD(a,b) × LCM(a,b) = a × b
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              4. Các loại số đặc biệt
            </Typography>

            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" paragraph>
                • <strong>Số nguyên tố:</strong> Chỉ có 2 ước số: 1 và chính nó
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Số chính phương:</strong> Là bình phương của một số
                nguyên
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Số hoàn hảo:</strong> Bằng tổng tất cả ước thực sự của
                nó
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Ví dụ số hoàn hảo:</strong> 6 = 1 + 2 + 3, 28 = 1 + 2
                + 4 + 7 + 14
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              5. Ứng dụng thực tế
            </Typography>

            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" paragraph>
                • <strong>Chia kẹo:</strong> Tìm cách chia đều không dư
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Xếp hàng:</strong> Tìm cách xếp thành hình chữ nhật
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Lập lịch:</strong> Tìm chu kỳ chung của các sự kiện
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Rút gọn phân số:</strong> Sử dụng GCD để rút gọn
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="divisors"
        label="Tìm ước số"
        icon={<Iconify icon="solar:restart-bold" />}
      />
      <Tab
        value="multiples"
        label="Tìm bội số"
        icon={<Iconify icon="solar:list-bold" />}
      />
      <Tab
        value="gcd-lcm"
        label="GCD & LCM"
        icon={<Iconify icon="solar:forward-bold" />}
      />
      <Tab
        value="quick-tools"
        label="Công cụ nhanh"
        icon={<Iconify icon="solar:settings-bold" />}
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
      title="Ước số và bội số"
      description="Công cụ tìm ước số, bội số và tính toán GCD/LCM với giải thích chi tiết và ví dụ minh họa."
      tabs={renderTabs()}
    >
      {currentTab === 'divisors' && renderDivisors()}
      {currentTab === 'multiples' && renderMultiples()}
      {currentTab === 'gcd-lcm' && renderGcdLcm()}
      {currentTab === 'quick-tools' && renderQuickTools()}
      {currentTab === 'history' && renderHistory()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayout>
  );
}
