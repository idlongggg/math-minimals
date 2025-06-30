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

import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

const QUICK_FACTORIZATIONS = [
  { label: 'Số nhỏ', example: '12' },
  { label: 'Số nguyên tố', example: '17' },
  { label: 'Lũy thừa hoàn hảo', example: '64' },
  { label: 'Số lớn', example: '360' },
  { label: 'Số có nhiều thừa số', example: '120' },
  { label: 'Số chính phương', example: '144' },
];

const QUICK_GCD_LCM = [
  { label: 'Hai số đơn giản', a: '12', b: '18' },
  { label: 'Hai số nguyên tố cùng nhau', a: '15', b: '28' },
  { label: 'Một số là bội của số kia', a: '24', b: '8' },
  { label: 'Hai số lớn', a: '48', b: '72' },
];

const COMMON_IRRATIONALS = [
  {
    name: 'π (Pi)',
    value: Math.PI,
    latex: '\\pi',
    description: 'Tỉ số chu vi và đường kính hình tròn',
  },
  { name: 'e (Euler)', value: Math.E, latex: 'e', description: 'Cơ số logarit tự nhiên' },
  { name: '√2', value: Math.sqrt(2), latex: '\\sqrt{2}', description: 'Căn bậc hai của 2' },
  { name: '√3', value: Math.sqrt(3), latex: '\\sqrt{3}', description: 'Căn bậc hai của 3' },
  { name: '√5', value: Math.sqrt(5), latex: '\\sqrt{5}', description: 'Căn bậc hai của 5' },
  {
    name: 'φ (Golden ratio)',
    value: (1 + Math.sqrt(5)) / 2,
    latex: '\\phi = \\frac{1 + \\sqrt{5}}{2}',
    description: 'Tỉ lệ vàng',
  },
  {
    name: '√π',
    value: Math.sqrt(Math.PI),
    latex: '\\sqrt{\\pi}',
    description: 'Căn bậc hai của π',
  },
  { name: 'ln(2)', value: Math.log(2), latex: '\\ln(2)', description: 'Logarit tự nhiên của 2' },
];

// ----------------------------------------------------------------------

export function FactorsIrrationalsView() {
  const [currentTab, setCurrentTab] = useState('factors');
  const [inputNumber, setInputNumber] = useState('');
  const [factorResult, setFactorResult] = useState<{
    number: number;
    factors: number[];
    primeFactorization: { [key: number]: number };
    isPerfectSquare: boolean;
    isPrime: boolean;
  } | null>(null);
  const [gcdLcmInputA, setGcdLcmInputA] = useState('');
  const [gcdLcmInputB, setGcdLcmInputB] = useState('');
  const [gcdLcmResult, setGcdLcmResult] = useState<{
    a: number;
    b: number;
    gcd: number;
    lcm: number;
  } | null>(null);
  const [irationalInput, setIrationalInput] = useState('');
  const [irationalResult, setIrationalResult] = useState<{
    number: number;
    isRational: boolean;
    simplifiedFraction?: { numerator: number; denominator: number };
    explanation: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<
    Array<{
      id: string;
      type: 'factor' | 'gcd-lcm' | 'irrational';
      data: any;
      timestamp: Date;
    }>
  >([]);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  // Tìm tất cả ước số của một số
  const findAllFactors = useCallback((num: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== Math.sqrt(num)) {
          factors.push(num / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  }, []);

  // Phân tích thành thừa số nguyên tố
  const primeFactorization = useCallback((num: number): { [key: number]: number } => {
    const factors: { [key: number]: number } = {};
    let temp = num;

    // Kiểm tra từ 2
    while (temp % 2 === 0) {
      factors[2] = (factors[2] || 0) + 1;
      temp /= 2;
    }

    // Kiểm tra từ 3 trở đi (chỉ số lẻ)
    for (let i = 3; i <= Math.sqrt(temp); i += 2) {
      while (temp % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        temp /= i;
      }
    }

    // Nếu temp > 2 thì temp là số nguyên tố
    if (temp > 2) {
      factors[temp] = 1;
    }

    return factors;
  }, []);

  // Kiểm tra số chính phương
  const isPerfectSquare = useCallback((num: number): boolean => {
    const sqrt = Math.sqrt(num);
    return sqrt === Math.floor(sqrt);
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

  // Tìm ước chung lớn nhất (GCD)
  const gcd = useCallback((a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }, []);

  // Tìm bội chung nhỏ nhất (LCM)
  const lcm = useCallback((a: number, b: number): number => Math.abs(a * b) / gcd(a, b), [gcd]);

  // Xử lý tìm ước số và phân tích thành thừa số
  const handleFactorAnalysis = useCallback(() => {
    setError('');
    setFactorResult(null);

    const num = parseInt(inputNumber.trim());
    if (isNaN(num) || num <= 0) {
      setError('Vui lòng nhập một số nguyên dương');
      return;
    }

    if (num > 1000000) {
      setError('Vui lòng nhập số nhỏ hơn 1,000,000 để tối ưu hiệu suất');
      return;
    }

    const factors = findAllFactors(num);
    const primeFactors = primeFactorization(num);
    const isSquare = isPerfectSquare(num);
    const isPrimeNum = isPrime(num);

    const result = {
      number: num,
      factors,
      primeFactorization: primeFactors,
      isPerfectSquare: isSquare,
      isPrime: isPrimeNum,
    };

    setFactorResult(result);

    // Thêm vào lịch sử
    const historyItem = {
      id: Date.now().toString(),
      type: 'factor' as const,
      data: result,
      timestamp: new Date(),
    };
    setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
  }, [inputNumber, findAllFactors, primeFactorization, isPerfectSquare, isPrime]);

  // Xử lý tính GCD và LCM
  const handleGcdLcm = useCallback(() => {
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

    const gcdResult = gcd(a, b);
    const lcmResult = lcm(a, b);

    const result = {
      a,
      b,
      gcd: gcdResult,
      lcm: lcmResult,
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
  }, [gcdLcmInputA, gcdLcmInputB, gcd, lcm]);

  // Kiểm tra số hữu tỷ/vô tỷ
  const handleIrrationalCheck = useCallback(() => {
    setError('');
    setIrationalResult(null);

    const num = parseFloat(irationalInput.trim());
    if (isNaN(num)) {
      setError('Vui lòng nhập một số hợp lệ');
      return;
    }

    // Kiểm tra nếu là số nguyên
    if (Number.isInteger(num)) {
      const result = {
        number: num,
        isRational: true,
        simplifiedFraction: { numerator: num, denominator: 1 },
        explanation: `${num} là số nguyên, do đó là số hữu tỷ (có thể biểu diễn dưới dạng ${num}/1).`,
      };
      setIrationalResult(result);
      return;
    }

    // Thử chuyển đổi thành phân số với độ chính xác cao
    const tolerance = 1e-10;
    let numerator = 1;
    let denominator = 1;
    let found = false;

    // Thuật toán tìm phân số gần đúng
    for (let d = 1; d <= 10000 && !found; d++) {
      const n = Math.round(num * d);
      if (Math.abs(n / d - num) < tolerance) {
        numerator = n;
        denominator = d;
        found = true;
      }
    }

    let explanation = '';
    let isRational = false;

    if (found && Math.abs(numerator / denominator - num) < tolerance) {
      // Rút gọn phân số
      const gcdValue = gcd(Math.abs(numerator), denominator);
      numerator /= gcdValue;
      denominator /= gcdValue;

      isRational = true;
      explanation = `${num} có thể biểu diễn dưới dạng phân số ${numerator}/${denominator}, do đó là số hữu tỷ.`;
    } else {
      explanation = `${num} không thể biểu diễn chính xác dưới dạng phân số với mẫu số nhỏ, có thể là số vô tỷ.`;
    }

    const result = {
      number: num,
      isRational,
      simplifiedFraction: found ? { numerator, denominator } : undefined,
      explanation,
    };

    setIrationalResult(result);

    // Thêm vào lịch sử
    const historyItem = {
      id: Date.now().toString(),
      type: 'irrational' as const,
      data: result,
      timestamp: new Date(),
    };
    setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
  }, [irationalInput, gcd]);

  const handleReset = useCallback(() => {
    setInputNumber('');
    setGcdLcmInputA('');
    setGcdLcmInputB('');
    setIrationalInput('');
    setFactorResult(null);
    setGcdLcmResult(null);
    setIrationalResult(null);
    setError('');
  }, []);

  const handleQuickFactorization = useCallback(
    (quickFactor: (typeof QUICK_FACTORIZATIONS)[0]) => {
      setInputNumber(quickFactor.example);
      setCurrentTab('factors');

      // Tự động phân tích
      setTimeout(() => {
        const num = parseInt(quickFactor.example);
        const factors = findAllFactors(num);
        const primeFactors = primeFactorization(num);
        const isSquare = isPerfectSquare(num);
        const isPrimeNum = isPrime(num);

        const result = {
          number: num,
          factors,
          primeFactorization: primeFactors,
          isPerfectSquare: isSquare,
          isPrime: isPrimeNum,
        };

        setFactorResult(result);
        setError('');

        // Thêm vào lịch sử
        const historyItem = {
          id: Date.now().toString(),
          type: 'factor' as const,
          data: result,
          timestamp: new Date(),
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      }, 100);
    },
    [findAllFactors, primeFactorization, isPerfectSquare, isPrime]
  );

  const handleQuickGcdLcm = useCallback(
    (quickGcdLcm: (typeof QUICK_GCD_LCM)[0]) => {
      setGcdLcmInputA(quickGcdLcm.a);
      setGcdLcmInputB(quickGcdLcm.b);
      setCurrentTab('gcd-lcm');

      // Tự động tính
      setTimeout(() => {
        const a = parseInt(quickGcdLcm.a);
        const b = parseInt(quickGcdLcm.b);
        const gcdResult = gcd(a, b);
        const lcmResult = lcm(a, b);

        const result = {
          a,
          b,
          gcd: gcdResult,
          lcm: lcmResult,
        };

        setGcdLcmResult(result);
        setError('');

        // Thêm vào lịch sử
        const historyItem = {
          id: Date.now().toString(),
          type: 'gcd-lcm' as const,
          data: result,
          timestamp: new Date(),
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      }, 100);
    },
    [gcd, lcm]
  );

  const handleHistoryItemClick = useCallback((item: (typeof history)[0]) => {
    if (item.type === 'factor') {
      setInputNumber(item.data.number.toString());
      setFactorResult(item.data);
      setCurrentTab('factors');
    } else if (item.type === 'gcd-lcm') {
      setGcdLcmInputA(item.data.a.toString());
      setGcdLcmInputB(item.data.b.toString());
      setGcdLcmResult(item.data);
      setCurrentTab('gcd-lcm');
    } else if (item.type === 'irrational') {
      setIrationalInput(item.data.number.toString());
      setIrationalResult(item.data);
      setCurrentTab('irrational');
    }
    setError('');
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const renderFactors = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Tìm ước số và phân tích thành thừa số nguyên tố" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Nhập số cần phân tích"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              placeholder="Ví dụ: 60"
              type="number"
              helperText="Nhập số nguyên dương để tìm ước số và phân tích thành thừa số nguyên tố"
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleFactorAnalysis}
                startIcon={<Iconify icon="solar:restart-bold" />}
                sx={{ minWidth: 200 }}
              >
                Phân tích
              </Button>
              <Button variant="outlined" size="large" onClick={handleReset} sx={{ minWidth: 120 }}>
                Reset
              </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {factorResult && (
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">
                        Kết quả phân tích số {factorResult.number}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {factorResult.isPrime && (
                          <Chip label="Số nguyên tố" color="success" size="small" />
                        )}
                        {factorResult.isPerfectSquare && (
                          <Chip label="Số chính phương" color="info" size="small" />
                        )}
                      </Box>
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Tất cả ước số */}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Tất cả ước số ({factorResult.factors.length} ước):
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
                        {factorResult.factors.map((factor) => (
                          <Chip
                            key={factor}
                            label={factor}
                            variant="outlined"
                            color="primary"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>

                    <Divider />

                    {/* Phân tích thành thừa số nguyên tố */}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Phân tích thành thừa số nguyên tố:
                      </Typography>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="body1" gutterBottom>
                          <InlineMath
                            math={`${factorResult.number} = ${Object.entries(
                              factorResult.primeFactorization
                            )
                              .map(([prime, count]) =>
                                count === 1 ? prime : `${prime}^{${count}}`
                              )
                              .join(' \\times ')}`}
                          />
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                          {Object.entries(factorResult.primeFactorization).map(([prime, count]) => (
                            <Chip
                              key={prime}
                              label={count === 1 ? prime : `${prime}^${count}`}
                              color="secondary"
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>

                    {/* Thông tin bổ sung */}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Thông tin bổ sung:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2">
                          • <strong>Tổng tất cả ước số:</strong>{' '}
                          {factorResult.factors.reduce((sum, factor) => sum + factor, 0)}
                        </Typography>
                        <Typography variant="body2">
                          • <strong>Số lượng ước số:</strong> {factorResult.factors.length}
                        </Typography>
                        {factorResult.isPerfectSquare && (
                          <Typography variant="body2">
                            • <strong>Căn bậc hai:</strong> √{factorResult.number} ={' '}
                            {Math.sqrt(factorResult.number)}
                          </Typography>
                        )}
                        <Typography variant="body2">
                          • <strong>Loại số:</strong>{' '}
                          {factorResult.isPrime
                            ? 'Số nguyên tố'
                            : factorResult.isPerfectSquare
                              ? 'Số chính phương'
                              : 'Hợp số'}
                        </Typography>
                      </Box>
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

            <Button
              variant="contained"
              size="large"
              onClick={handleGcdLcm}
              startIcon={<Iconify icon="solar:restart-bold" />}
              sx={{ alignSelf: 'center', minWidth: 200 }}
            >
              Tính GCD và LCM
            </Button>

            {error && <Alert severity="error">{error}</Alert>}

            {gcdLcmResult && (
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      Kết quả cho {gcdLcmResult.a} và {gcdLcmResult.b}
                    </Typography>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}
                    >
                      <Box>
                        <Typography variant="h4" color="primary.main" fontWeight="bold">
                          {gcdLcmResult.gcd}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          GCD (Ước chung lớn nhất)
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h4" color="secondary.main" fontWeight="bold">
                          {gcdLcmResult.lcm}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          LCM (Bội chung nhỏ nhất)
                        </Typography>
                      </Box>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Công thức toán học:
                      </Typography>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="body1" gutterBottom>
                          <BlockMath
                            math={`\\text{GCD}(${gcdLcmResult.a}, ${gcdLcmResult.b}) = ${gcdLcmResult.gcd}`}
                          />
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          <BlockMath
                            math={`\\text{LCM}(${gcdLcmResult.a}, ${gcdLcmResult.b}) = ${gcdLcmResult.lcm}`}
                          />
                        </Typography>
                        <Typography variant="body1">
                          <BlockMath
                            math={`\\text{GCD} \\times \\text{LCM} = ${gcdLcmResult.gcd} \\times ${gcdLcmResult.lcm} = ${gcdLcmResult.gcd * gcdLcmResult.lcm} = ${gcdLcmResult.a} \\times ${gcdLcmResult.b}`}
                          />
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}>
                      <Typography variant="body2" color="info.dark">
                        💡 <strong>Quan hệ:</strong> GCD × LCM = tích của hai số ban đầu
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

  const renderIrrational = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader title="Kiểm tra số hữu tỷ / vô tỷ" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Nhập số cần kiểm tra"
              value={irationalInput}
              onChange={(e) => setIrationalInput(e.target.value)}
              placeholder="Ví dụ: 1.414213562"
              type="number"
              helperText="Nhập số để kiểm tra tính hữu tỷ hoặc vô tỷ"
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleIrrationalCheck}
              startIcon={<Iconify icon="solar:restart-bold" />}
              sx={{ alignSelf: 'center', minWidth: 200 }}
            >
              Kiểm tra
            </Button>

            {error && <Alert severity="error">{error}</Alert>}

            {irationalResult && (
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">Kết quả cho số {irationalResult.number}</Typography>
                      <Chip
                        label={irationalResult.isRational ? 'Số hữu tỷ' : 'Có thể là số vô tỷ'}
                        color={irationalResult.isRational ? 'success' : 'warning'}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body1" paragraph>
                    {irationalResult.explanation}
                  </Typography>

                  {irationalResult.simplifiedFraction && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'success.lighter', borderRadius: 1 }}>
                      <Typography variant="body1">
                        <strong>Biểu diễn phân số:</strong>{' '}
                        <InlineMath
                          math={`\\frac{${irationalResult.simplifiedFraction.numerator}}{${irationalResult.simplifiedFraction.denominator}}`}
                        />
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Danh sách số vô tỷ thông dụng */}
      <Card>
        <CardHeader title="Các số vô tỷ thông dụng" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {COMMON_IRRATIONALS.map((irrational, index) => (
              <Card key={index} variant="outlined">
                <CardContent sx={{ py: 2 }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        <InlineMath math={irrational.latex} /> = {irrational.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {irrational.description}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 1 }}>
                        ≈ {irrational.value.toFixed(10)}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setIrationalInput(irrational.value.toString());
                        setCurrentTab('irrational');
                      }}
                    >
                      Kiểm tra
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderQuickTools = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Typography variant="h6">Phân tích nhanh thừa số</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {QUICK_FACTORIZATIONS.map((quickFactor, index) => (
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
            onClick={() => handleQuickFactorization(quickFactor)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {quickFactor.label}
                </Typography>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Số:
                  </Typography>
                  <Typography variant="h6" color="primary.main" fontWeight="bold">
                    {quickFactor.example}
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

      <Typography variant="h6" sx={{ mt: 2 }}>
        GCD & LCM nhanh
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 2,
        }}
      >
        {QUICK_GCD_LCM.map((quickGcdLcm, index) => (
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
            onClick={() => handleQuickGcdLcm(quickGcdLcm)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {quickGcdLcm.label}
                </Typography>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                >
                  <Typography variant="h6" color="primary.main" fontWeight="bold">
                    {quickGcdLcm.a}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    và
                  </Typography>
                  <Typography variant="h6" color="primary.main" fontWeight="bold">
                    {quickGcdLcm.b}
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
    </Box>
  );

  const renderHistory = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip
                      label={
                        item.type === 'factor'
                          ? 'Thừa số'
                          : item.type === 'gcd-lcm'
                            ? 'GCD/LCM'
                            : 'Vô tỷ'
                      }
                      color="primary"
                      size="small"
                    />
                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                      {item.type === 'factor' && item.data.number}
                      {item.type === 'gcd-lcm' && `${item.data.a}, ${item.data.b}`}
                      {item.type === 'irrational' && item.data.number}
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
        <CardHeader title="Hướng dẫn về thừa số và số vô tỷ" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" gutterBottom>
              1. Ước số và thừa số
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Ước số</strong> của một số tự nhiên n là những số tự nhiên chia hết cho n.
            </Typography>

            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" paragraph>
                • <strong>Ví dụ:</strong> Ước số của 12 là: 1, 2, 3, 4, 6, 12
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Cách tìm:</strong> Kiểm tra tất cả số từ 1 đến √n
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              2. Phân tích thành thừa số nguyên tố
            </Typography>

            <Typography variant="body1" paragraph>
              Mọi số tự nhiên lớn hơn 1 đều có thể phân tích duy nhất thành tích các thừa số nguyên
              tố.
            </Typography>

            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Ví dụ:</strong> 60 = 2² × 3 × 5
              </Typography>
              <Typography variant="body1">
                <strong>Cách làm:</strong> Chia liên tiếp cho các số nguyên tố 2, 3, 5, 7, ...
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
                • <strong>Công thức:</strong> GCD(a,b) × LCM(a,b) = a × b
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              4. Số hữu tỷ và số vô tỷ
            </Typography>

            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" paragraph>
                • <strong>Số hữu tỷ:</strong> Số có thể biểu diễn dưới dạng phân số a/b (b ≠ 0)
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Số vô tỷ:</strong> Số không thể biểu diễn dưới dạng phân số
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Ví dụ số vô tỷ:</strong> π, e, √2, √3, φ (tỉ lệ vàng)
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              5. Ứng dụng thực tế
            </Typography>

            <Box sx={{ ml: 2 }}>
              <Typography variant="body1" paragraph>
                • <strong>Mật mã học:</strong> Phân tích thành thừa số nguyên tố trong RSA
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Âm nhạc:</strong> Tỉ số tần số trong hòa âm
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Thiết kế:</strong> Tỉ lệ vàng trong kiến trúc và nghệ thuật
              </Typography>
              <Typography variant="body1" paragraph>
                • <strong>Khoa học:</strong> Hằng số π trong hình học, e trong vi tích phân
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab value="factors" label="Ước số & thừa số" icon={<Iconify icon="solar:restart-bold" />} />
      <Tab value="gcd-lcm" label="GCD & LCM" icon={<Iconify icon="solar:forward-bold" />} />
      <Tab value="irrational" label="Số vô tỷ" icon={<Iconify icon="solar:settings-bold" />} />
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
      <Tab value="guide" label="Hướng dẫn" icon={<Iconify icon="solar:notebook-bold-duotone" />} />
    </CustomTabs>
  );

  return (
    <DashboardPageWithTabsLayout
      title="Thừa số và số vô tỷ"
      description="Công cụ phân tích thừa số nguyên tố, tính GCD/LCM và kiểm tra tính chất hữu tỷ/vô tỷ của số."
      tabs={renderTabs()}
    >
      {currentTab === 'factors' && renderFactors()}
      {currentTab === 'gcd-lcm' && renderGcdLcm()}
      {currentTab === 'irrational' && renderIrrational()}
      {currentTab === 'quick-tools' && renderQuickTools()}
      {currentTab === 'history' && renderHistory()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayout>
  );
}
