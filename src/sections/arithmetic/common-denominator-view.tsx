'use client';

import 'katex/dist/katex.min.css';

import { InlineMath } from 'react-katex';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

const QUICK_EXAMPLES = [
  { fractions: ['1/2', '1/3'], description: 'Phân số đơn giản' },
  { fractions: ['2/3', '3/4'], description: 'Phân số cơ bản' },
  { fractions: ['1/4', '1/6', '1/8'], description: 'Ba phân số' },
  { fractions: ['3/5', '7/10'], description: 'Mẫu số có ước chung' },
  { fractions: ['1/12', '5/18', '7/24'], description: 'Phân số phức tạp' },
  { fractions: ['2/9', '5/12', '7/18'], description: 'Nhiều phân số' },
];

interface Fraction {
  numerator: number;
  denominator: number;
}

// ----------------------------------------------------------------------

export function CommonDenominatorView() {
  const [currentTab, setCurrentTab] = useState('calculator');
  const [fractionInputs, setFractionInputs] = useState(['', '']);
  const [result, setResult] = useState<{
    lcm: number;
    fractions: Fraction[];
    convertedFractions: Fraction[];
  } | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<
    Array<{
      id: string;
      inputFractions: string[];
      lcm: number;
      fractions: Fraction[];
      convertedFractions: Fraction[];
      timestamp: Date;
    }>
  >([]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  // Tính ước số chung lớn nhất (GCD)
  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Tính bội số chung nhỏ nhất (LCM)
  const lcm = (a: number, b: number): number => Math.abs(a * b) / gcd(a, b);

  // Tính LCM của nhiều số
  const lcmMultiple = (numbers: number[]): number =>
    numbers.reduce((acc, num) => lcm(acc, num), 1);

  // Parse phân số từ string
  const parseFraction = (input: string): Fraction | null => {
    const trimmed = input.trim();
    if (!trimmed) return null;

    // Xử lý số nguyên
    if (!/\//.test(trimmed)) {
      const num = parseInt(trimmed);
      if (isNaN(num)) return null;
      return { numerator: num, denominator: 1 };
    }

    const parts = trimmed.split('/');
    if (parts.length !== 2) return null;

    const numerator = parseInt(parts[0]);
    const denominator = parseInt(parts[1]);

    if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
      return null;
    }

    return { numerator, denominator };
  };

  // Rút gọn phân số
  const simplifyFraction = (fraction: Fraction): Fraction => {
    const divisor = gcd(
      Math.abs(fraction.numerator),
      Math.abs(fraction.denominator)
    );
    return {
      numerator: fraction.numerator / divisor,
      denominator: fraction.denominator / divisor,
    };
  };

  // Format phân số thành string
  // const formatFraction = (fraction: Fraction): string => {
  //   if (fraction.denominator === 1) {
  //     return fraction.numerator.toString();
  //   }
  //   return `${fraction.numerator}/${fraction.denominator}`;
  // };

  const handleCalculate = useCallback(() => {
    setError('');
    setResult(null);

    const validInputs = fractionInputs.filter((input) => input.trim() !== '');

    if (validInputs.length < 2) {
      setError('Vui lòng nhập ít nhất 2 phân số');
      return;
    }

    const fractions: Fraction[] = [];

    for (const input of validInputs) {
      const fraction = parseFraction(input);
      if (!fraction) {
        setError(
          `Phân số "${input}" không hợp lệ. Vui lòng nhập theo định dạng: tử/mẫu (ví dụ: 1/2)`
        );
        return;
      }
      fractions.push(simplifyFraction(fraction));
    }

    const denominators = fractions.map((f) => f.denominator);
    const commonDenominator = lcmMultiple(denominators);

    const convertedFractions = fractions.map((fraction) => ({
      numerator:
        fraction.numerator * (commonDenominator / fraction.denominator),
      denominator: commonDenominator,
    }));

    setResult({
      lcm: commonDenominator,
      fractions,
      convertedFractions,
    });

    // Add to history
    const historyItem = {
      id: Date.now().toString(),
      inputFractions: validInputs,
      lcm: commonDenominator,
      fractions,
      convertedFractions,
      timestamp: new Date(),
    };
    setHistory((prev) => [historyItem, ...prev.slice(0, 49)]); // Keep max 50 items
  }, [fractionInputs, lcmMultiple, simplifyFraction]);

  const handleReset = useCallback(() => {
    setFractionInputs(['', '']);
    setResult(null);
    setError('');
  }, []);

  const handleHistoryItemClick = useCallback((item: (typeof history)[0]) => {
    const newInputs = [...item.inputFractions];
    while (newInputs.length < 6) {
      newInputs.push('');
    }
    setFractionInputs(newInputs);
    setResult({
      lcm: item.lcm,
      fractions: item.fractions,
      convertedFractions: item.convertedFractions,
    });
    setError('');
    setCurrentTab('calculator');
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const handleQuickExample = useCallback(
    (example: (typeof QUICK_EXAMPLES)[0]) => {
      const newInputs = [...example.fractions];
      while (newInputs.length < 6) {
        newInputs.push('');
      }
      setFractionInputs(newInputs);
      setCurrentTab('calculator');

      // Calculate immediately
      setTimeout(() => {
        const fractions: Fraction[] = [];

        for (const input of example.fractions) {
          const fraction = parseFraction(input);
          if (fraction) {
            fractions.push(simplifyFraction(fraction));
          }
        }

        if (fractions.length >= 2) {
          const denominators = fractions.map((f) => f.denominator);
          const commonDenominator = lcmMultiple(denominators);

          const convertedFractions = fractions.map((fraction) => ({
            numerator:
              fraction.numerator * (commonDenominator / fraction.denominator),
            denominator: commonDenominator,
          }));

          setResult({
            lcm: commonDenominator,
            fractions,
            convertedFractions,
          });
          setError('');

          // Add to history
          const historyItem = {
            id: Date.now().toString(),
            inputFractions: example.fractions,
            lcm: commonDenominator,
            fractions,
            convertedFractions,
            timestamp: new Date(),
          };
          setHistory((prev) => [historyItem, ...prev.slice(0, 49)]); // Keep max 50 items
        }
      }, 100);
    },
    [lcmMultiple, simplifyFraction]
  );

  const addFractionInput = () => {
    if (fractionInputs.length < 6) {
      setFractionInputs([...fractionInputs, '']);
    }
  };

  const removeFractionInput = (index: number) => {
    if (fractionInputs.length > 2) {
      const newInputs = fractionInputs.filter((_, i) => i !== index);
      setFractionInputs(newInputs);
    }
  };

  const updateFractionInput = (index: number, value: string) => {
    const newInputs = [...fractionInputs];
    newInputs[index] = value;
    setFractionInputs(newInputs);
  };

  const renderCalculator = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Card>
        <CardHeader
          title="Nhập các phân số"
          action={
            <Button
              variant="outlined"
              size="small"
              onClick={addFractionInput}
              disabled={fractionInputs.length >= 6}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Thêm phân số
            </Button>
          }
        />
        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 2,
            }}
          >
            {fractionInputs.map((input, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}
              >
                <TextField
                  fullWidth
                  label={`Phân số ${index + 1}`}
                  value={input}
                  onChange={(e) => updateFractionInput(index, e.target.value)}
                  placeholder="Ví dụ: 1/2 hoặc 3"
                  helperText={index < 2 ? 'Bắt buộc' : 'Tùy chọn'}
                />
                {fractionInputs.length > 2 && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => removeFractionInput(index)}
                    sx={{
                      minWidth: 'auto',
                      px: 1,
                      mt: 1,
                      height: '40px',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon="mingcute:close-line" />
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleCalculate}
          startIcon={<Iconify icon="solar:restart-bold" />}
          sx={{ minWidth: 200 }}
        >
          Tìm mẫu số chung
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

      {result && (
        <Card>
          <CardHeader title="Kết quả" />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Mẫu số chung nhỏ nhất (LCM):
                  <Chip
                    label={result.lcm}
                    color="primary"
                    sx={{ ml: 1, fontWeight: 'bold', fontSize: '1rem' }}
                  />
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Chuyển đổi phân số:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {result.fractions.map((original, index) => (
                    <Box
                      key={index}
                      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                      <Box
                        sx={{
                          minWidth: 80,
                          textAlign: 'center',
                          fontSize: '1.2rem',
                          p: 1,
                          bgcolor: 'grey.100',
                          borderRadius: 1,
                        }}
                      >
                        <InlineMath
                          math={`\\frac{${original.numerator}}{${original.denominator}}`}
                        />
                      </Box>
                      <Iconify
                        icon="eva:arrowhead-right-fill"
                        sx={{ color: 'primary.main' }}
                      />
                      <Box
                        sx={{
                          minWidth: 100,
                          textAlign: 'center',
                          fontSize: '1.2rem',
                          p: 1,
                          bgcolor: 'primary.lighter',
                          borderRadius: 1,
                          fontWeight: 'bold',
                        }}
                      >
                        <InlineMath
                          math={`\\frac{${result.convertedFractions[index].numerator}}{${result.convertedFractions[index].denominator}}`}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        (nhân {result.lcm / original.denominator})
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  const renderQuickTools = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Typography variant="h6">Ví dụ nhanh</Typography>

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
                  {example.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {example.fractions.map((fraction, fractionIndex) => (
                    <Box
                      key={fractionIndex}
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <InlineMath
                        math={`\\frac{${fraction.split('/')[0]}}{${fraction.split('/')[1] || '1'}}`}
                      />
                      {index < example.fractions.length - 1 && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mx: 0.5 }}
                        >
                          ,
                        </Typography>
                      )}
                    </Box>
                  ))}
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

      <Card>
        <CardHeader title="Bảng mẫu số chung của một số phân số cơ bản" />
        <CardContent>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>
                    Phân số 1
                  </th>
                  <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>
                    Phân số 2
                  </th>
                  <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>
                    Mẫu số chung
                  </th>
                  <th style={{ padding: 8, borderBottom: '1px solid #ddd' }}>
                    Kết quả
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f1: '1/2', f2: '1/3', lcm: 6, r1: '3/6', r2: '2/6' },
                  { f1: '1/4', f2: '1/6', lcm: 12, r1: '3/12', r2: '2/12' },
                  { f1: '2/3', f2: '3/4', lcm: 12, r1: '8/12', r2: '9/12' },
                  { f1: '1/5', f2: '1/7', lcm: 35, r1: '7/35', r2: '5/35' },
                  { f1: '3/8', f2: '5/12', lcm: 24, r1: '9/24', r2: '10/24' },
                ].map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: 8, textAlign: 'center' }}>
                      <InlineMath
                        math={`\\frac{${row.f1.split('/')[0]}}{${row.f1.split('/')[1]}}`}
                      />
                    </td>
                    <td style={{ padding: 8, textAlign: 'center' }}>
                      <InlineMath
                        math={`\\frac{${row.f2.split('/')[0]}}{${row.f2.split('/')[1]}}`}
                      />
                    </td>
                    <td
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      <InlineMath math={row.lcm.toString()} />
                    </td>
                    <td style={{ padding: 8, textAlign: 'center' }}>
                      <InlineMath
                        math={`\\frac{${row.r1.split('/')[0]}}{${row.r1.split('/')[1]}}`}
                      />
                      ,{' '}
                      <InlineMath
                        math={`\\frac{${row.r2.split('/')[0]}}{${row.r2.split('/')[1]}}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
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
              Thực hiện tính toán mẫu số chung để xem lịch sử tại đây
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        {item.inputFractions.map((fraction, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <Box
                              component="span"
                              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                            >
                              <InlineMath
                                math={`\\frac{${item.fractions[index].numerator}}{${item.fractions[index].denominator}}`}
                              />
                            </Box>
                            {index < item.inputFractions.length - 1 && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                ,
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Box>
                      <Iconify
                        icon="eva:arrow-forward-fill"
                        sx={{ color: 'text.secondary', mx: 1 }}
                      />
                      <Chip
                        label={`LCM: ${item.lcm}`}
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {item.timestamp.toLocaleTimeString('vi-VN')}
                    </Typography>
                    <Iconify
                      icon="eva:arrow-forward-fill"
                      sx={{ color: 'text.disabled' }}
                    />
                  </Box>
                </Box>

                {/* Show converted fractions */}
                <Box
                  sx={{
                    mt: 2,
                    pt: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    Kết quả chuyển đổi:
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    {item.convertedFractions.map((converted, index) => (
                      <Box
                        key={index}
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <Box
                          component="span"
                          sx={{ fontWeight: 'bold', color: 'primary.main' }}
                        >
                          <InlineMath
                            math={`\\frac{${converted.numerator}}{${converted.denominator}}`}
                          />
                        </Box>
                        {index < item.convertedFractions.length - 1 && (
                          <Typography variant="body2" color="text.secondary">
                            ,
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
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
        <CardHeader title="Hướng dẫn tìm mẫu số chung" />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Mẫu số chung là gì?
          </Typography>

          <Typography variant="body1" paragraph>
            Mẫu số chung là một số mà tất cả các mẫu số của các phân số đều chia
            hết. Mẫu số chung nhỏ nhất (MSCNN) hay bội số chung nhỏ nhất (LCM)
            là số nhỏ nhất có thể làm mẫu số chung cho tất cả các phân số.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Tại sao cần tìm mẫu số chung?
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
            <Typography variant="body1">
              • <strong>Cộng/trừ phân số:</strong> Chỉ có thể cộng/trừ khi có
              cùng mẫu số
            </Typography>
            <Typography variant="body1">
              • <strong>So sánh phân số:</strong> Dễ dàng so sánh khi có cùng
              mẫu số
            </Typography>
            <Typography variant="body1">
              • <strong>Sắp xếp phân số:</strong> Xếp theo thứ tự tăng/giảm dần
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
            Các bước tìm mẫu số chung:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
            <Typography variant="body1">
              1. <strong>Liệt kê các mẫu số:</strong> Ghi ra tất cả mẫu số của
              các phân số
            </Typography>
            <Typography variant="body1">
              2. <strong>Phân tích thành thừa số nguyên tố:</strong> Mỗi mẫu số
              thành tích các số nguyên tố
            </Typography>
            <Typography variant="body1">
              3. <strong>Tìm LCM:</strong> Lấy tích của các thừa số nguyên tố
              với lũy thừa cao nhất
            </Typography>
            <Typography variant="body1">
              4. <strong>Chuyển đổi phân số:</strong> Nhân tử và mẫu với số
              thích hợp
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
            Ví dụ chi tiết:
          </Typography>

          <Box
            sx={{
              p: 3,
              bgcolor: 'primary.lighter',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'primary.main',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Tìm mẫu số chung nhỏ nhất của <InlineMath math="\frac{1}{6}" /> và{' '}
              <InlineMath math="\frac{1}{8}" />
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Bước 1:</strong> Phân tích các mẫu số thành thừa số nguyên
              tố
            </Typography>
            <Box sx={{ ml: 2, mb: 2 }}>
              <Typography variant="body1">
                <InlineMath math="6 = 2 \times 3" />
              </Typography>
              <Typography variant="body1">
                <InlineMath math="8 = 2^3" />
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Bước 2:</strong> Tìm LCM bằng cách lấy tích các thừa số
              với lũy thừa cao nhất
            </Typography>
            <Box sx={{ ml: 2, mb: 2 }}>
              <Typography variant="body1">
                <InlineMath math="\text{LCM} = 2^3 \times 3^1 = 8 \times 3 = 24" />
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Bước 3:</strong> Chuyển đổi các phân số về mẫu số chung
            </Typography>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1">
                <InlineMath math="\frac{1}{6} = \frac{1 \times 4}{6 \times 4} = \frac{4}{24}" />
              </Typography>
              <Typography variant="body1">
                <InlineMath math="\frac{1}{8} = \frac{1 \times 3}{8 \times 3} = \frac{3}{24}" />
              </Typography>
            </Box>

            <Box
              sx={{ mt: 2, p: 2, bgcolor: 'success.lighter', borderRadius: 1 }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', color: 'success.dark' }}
              >
                Kết quả: <InlineMath math="\frac{1}{6} = \frac{4}{24}" /> và{' '}
                <InlineMath math="\frac{1}{8} = \frac{3}{24}" />
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: 3,
              bgcolor: 'secondary.lighter',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'secondary.main',
              mt: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Ví dụ nâng cao: Tìm mẫu số chung của{' '}
              <InlineMath math="\frac{1}{4}" />,{' '}
              <InlineMath math="\frac{1}{6}" /> và{' '}
              <InlineMath math="\frac{1}{8}" />
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Bước 1:</strong> Phân tích các mẫu số
            </Typography>
            <Box sx={{ ml: 2, mb: 2 }}>
              <Typography variant="body1">
                <InlineMath math="4 = 2^2" />
              </Typography>
              <Typography variant="body1">
                <InlineMath math="6 = 2 \times 3" />
              </Typography>
              <Typography variant="body1">
                <InlineMath math="8 = 2^3" />
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Bước 2:</strong> Tìm LCM
            </Typography>
            <Box sx={{ ml: 2, mb: 2 }}>
              <Typography variant="body1">
                <InlineMath math="\text{LCM} = 2^3 \times 3^1 = 8 \times 3 = 24" />
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Bước 3:</strong> Chuyển đổi tất cả phân số
            </Typography>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1">
                <InlineMath math="\frac{1}{4} = \frac{6}{24}" />,{' '}
                <InlineMath math="\frac{1}{6} = \frac{4}{24}" />,{' '}
                <InlineMath math="\frac{1}{8} = \frac{3}{24}" />
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
            Mẹo nhanh:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
            <Typography variant="body1">
              • Nếu một mẫu số chia hết cho mẫu số khác, mẫu số lớn hơn chính là
              MSCNN
            </Typography>
            <Typography variant="body1">
              • Với 2 số nguyên tố, MSCNN = tích của 2 số đó
            </Typography>
            <Typography variant="body1">
              • Có thể sử dụng công thức:{' '}
              <InlineMath math="\text{LCM}(a,b) = \frac{a \times b}{\text{GCD}(a,b)}" />
            </Typography>
            <Typography variant="body1">
              • Với nhiều số:{' '}
              <InlineMath math="\text{LCM}(a,b,c) = \text{LCM}(\text{LCM}(a,b),c)" />
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="calculator"
        label="Tính toán"
        icon={<Iconify icon="solar:restart-bold" />}
      />
      <Tab
        value="quick-tools"
        label="Ví dụ nhanh"
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
      title="Tìm mẫu số chung"
      description="Công cụ tìm mẫu số chung nhỏ nhất (BCNN) và chuyển đổi phân số về cùng mẫu số."
      tabs={renderTabs()}
    >
      {currentTab === 'calculator' && renderCalculator()}
      {currentTab === 'quick-tools' && renderQuickTools()}
      {currentTab === 'history' && renderHistory()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayout>
  );
}
