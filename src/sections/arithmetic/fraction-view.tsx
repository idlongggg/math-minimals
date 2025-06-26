'use client';

import 'katex/dist/katex.min.css';
import { useCallback, useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface Fraction {
  numerator: number;
  denominator: number;
}

const QUICK_OPERATIONS = [
  {
    label: '1/2 + 1/3',
    operation: 'add',
    fractions: [
      { numerator: 1, denominator: 2 },
      { numerator: 1, denominator: 3 },
    ],
  },
  {
    label: '3/4 - 1/6',
    operation: 'subtract',
    fractions: [
      { numerator: 3, denominator: 4 },
      { numerator: 1, denominator: 6 },
    ],
  },
  {
    label: '2/3 × 3/5',
    operation: 'multiply',
    fractions: [
      { numerator: 2, denominator: 3 },
      { numerator: 3, denominator: 5 },
    ],
  },
  {
    label: '5/8 ÷ 2/3',
    operation: 'divide',
    fractions: [
      { numerator: 5, denominator: 8 },
      { numerator: 2, denominator: 3 },
    ],
  },
  { label: '3/4 ⇄ 0.75', operation: 'convert', fractions: [{ numerator: 3, denominator: 4 }] },
  { label: '1/5 ⇄ 20%', operation: 'convert', fractions: [{ numerator: 1, denominator: 5 }] },
];

const CONVERSION_TYPES = {
  fraction: 'Phân số',
  decimal: 'Số thập phân',
  percentage: 'Phần trăm',
};

// ----------------------------------------------------------------------

export function FractionView() {
  const [currentTab, setCurrentTab] = useState('converter');

  // Converter state
  const [numerator1, setNumerator1] = useState('');
  const [denominator1, setDenominator1] = useState('');
  const [decimalInput, setDecimalInput] = useState('');
  const [percentageInput, setPercentageInput] = useState('');
  const [conversionType, setConversionType] = useState('fraction');
  const [conversionResult, setConversionResult] = useState('');

  // Calculator state
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('add');
  const [calculatorResult, setCalculatorResult] = useState<Fraction | null>(null);

  const [error, setError] = useState('');
  const [history, setHistory] = useState<
    Array<{
      id: string;
      expression: string;
      result: string;
      timestamp: Date;
      type: string;
    }>
  >([]);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  // Helper functions
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const simplifyFraction = (fraction: Fraction): Fraction => {
    if (fraction.denominator === 0) {
      throw new Error('Mẫu số không thể bằng 0');
    }

    const divisor = gcd(fraction.numerator, fraction.denominator);
    let numerator = fraction.numerator / divisor;
    let denominator = fraction.denominator / divisor;

    // Ensure denominator is positive
    if (denominator < 0) {
      numerator = -numerator;
      denominator = -denominator;
    }

    return { numerator, denominator };
  };

  const fractionToDecimal = (fraction: Fraction): number => {
    return fraction.numerator / fraction.denominator;
  };

  const decimalToFraction = (decimal: number): Fraction => {
    // Convert decimal to fraction using continued fractions algorithm
    let sign = decimal < 0 ? -1 : 1;
    decimal = Math.abs(decimal);

    // Handle integers
    if (decimal % 1 === 0) {
      return { numerator: sign * decimal, denominator: 1 };
    }

    // Simple method for common decimals
    const tolerance = 1e-6;
    for (let denominator = 1; denominator <= 10000; denominator++) {
      const numerator = Math.round(decimal * denominator);
      if (Math.abs(decimal - numerator / denominator) < tolerance) {
        return simplifyFraction({ numerator: sign * numerator, denominator });
      }
    }

    // Fallback: use string method
    const str = decimal.toString();
    const decimalPlaces = str.split('.')[1]?.length || 0;
    const denominator = Math.pow(10, decimalPlaces);
    const numerator = decimal * denominator;

    return simplifyFraction({ numerator: sign * Math.round(numerator), denominator });
  };

  const addFractions = (f1: Fraction, f2: Fraction): Fraction => {
    const numerator = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
    const denominator = f1.denominator * f2.denominator;
    return simplifyFraction({ numerator, denominator });
  };

  const subtractFractions = (f1: Fraction, f2: Fraction): Fraction => {
    const numerator = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
    const denominator = f1.denominator * f2.denominator;
    return simplifyFraction({ numerator, denominator });
  };

  const multiplyFractions = (f1: Fraction, f2: Fraction): Fraction => {
    const numerator = f1.numerator * f2.numerator;
    const denominator = f1.denominator * f2.denominator;
    return simplifyFraction({ numerator, denominator });
  };

  const divideFractions = (f1: Fraction, f2: Fraction): Fraction => {
    if (f2.numerator === 0) {
      throw new Error('Không thể chia cho 0');
    }
    const numerator = f1.numerator * f2.denominator;
    const denominator = f1.denominator * f2.numerator;
    return simplifyFraction({ numerator, denominator });
  };

  const formatFraction = (fraction: Fraction): string => {
    if (fraction.denominator === 1) {
      return fraction.numerator.toString();
    }
    return `\\frac{${fraction.numerator}}{${fraction.denominator}}`;
  };

  // Conversion handlers
  const handleConversion = useCallback(() => {
    setError('');
    setConversionResult('');

    try {
      let result = '';

      if (conversionType === 'fraction') {
        if (!numerator1 || !denominator1) {
          setError('Vui lòng nhập tử số và mẫu số');
          return;
        }

        const num = parseInt(numerator1);
        const den = parseInt(denominator1);

        if (isNaN(num) || isNaN(den) || den === 0) {
          setError('Tử số và mẫu số phải là số nguyên, mẫu số khác 0');
          return;
        }

        const fraction = simplifyFraction({ numerator: num, denominator: den });
        const decimal = fractionToDecimal(fraction);
        const percentage = decimal * 100;

        result =
          `Phân số: $${formatFraction(fraction)}$\\n` +
          `Số thập phân: ${decimal}\\n` +
          `Phần trăm: ${percentage}%`;

        // Add to history
        const historyItem = {
          id: Date.now().toString(),
          expression: `${formatFraction({ numerator: num, denominator: den })}`,
          result: `${formatFraction(fraction)} = ${decimal} = ${percentage}%`,
          timestamp: new Date(),
          type: 'conversion',
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      } else if (conversionType === 'decimal') {
        if (!decimalInput) {
          setError('Vui lòng nhập số thập phân');
          return;
        }

        const decimal = parseFloat(decimalInput);

        if (isNaN(decimal)) {
          setError('Số thập phân không hợp lệ');
          return;
        }

        const fraction = decimalToFraction(decimal);
        const percentage = decimal * 100;

        result =
          `Số thập phân: ${decimal}\\n` +
          `Phân số: $${formatFraction(fraction)}$\\n` +
          `Phần trăm: ${percentage}%`;

        // Add to history
        const historyItem = {
          id: Date.now().toString(),
          expression: decimal.toString(),
          result: `${decimal} = ${formatFraction(fraction)} = ${percentage}%`,
          timestamp: new Date(),
          type: 'conversion',
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      } else if (conversionType === 'percentage') {
        if (!percentageInput) {
          setError('Vui lòng nhập phần trăm');
          return;
        }

        const percentage = parseFloat(percentageInput);

        if (isNaN(percentage)) {
          setError('Phần trăm không hợp lệ');
          return;
        }

        const decimal = percentage / 100;
        const fraction = decimalToFraction(decimal);

        result =
          `Phần trăm: ${percentage}%\\n` +
          `Số thập phân: ${decimal}\\n` +
          `Phân số: $${formatFraction(fraction)}$`;

        // Add to history
        const historyItem = {
          id: Date.now().toString(),
          expression: `${percentage}%`,
          result: `${percentage}% = ${decimal} = ${formatFraction(fraction)}`,
          timestamp: new Date(),
          type: 'conversion',
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      }

      setConversionResult(result);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi chuyển đổi');
    }
  }, [conversionType, numerator1, denominator1, decimalInput, percentageInput]);

  // Calculator handlers
  const handleCalculate = useCallback(() => {
    setError('');
    setCalculatorResult(null);

    if (!num1 || !den1 || !num2 || !den2) {
      setError('Vui lòng nhập đầy đủ các phân số');
      return;
    }

    try {
      const n1 = parseInt(num1);
      const d1 = parseInt(den1);
      const n2 = parseInt(num2);
      const d2 = parseInt(den2);

      if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
        setError('Tử số và mẫu số phải là số nguyên, mẫu số khác 0');
        return;
      }

      const fraction1 = { numerator: n1, denominator: d1 };
      const fraction2 = { numerator: n2, denominator: d2 };
      let result: Fraction;
      let operationSymbol = '';

      switch (operation) {
        case 'add':
          result = addFractions(fraction1, fraction2);
          operationSymbol = '+';
          break;
        case 'subtract':
          result = subtractFractions(fraction1, fraction2);
          operationSymbol = '-';
          break;
        case 'multiply':
          result = multiplyFractions(fraction1, fraction2);
          operationSymbol = '\\times';
          break;
        case 'divide':
          result = divideFractions(fraction1, fraction2);
          operationSymbol = '\\div';
          break;
        default:
          throw new Error('Phép toán không hợp lệ');
      }

      setCalculatorResult(result);

      // Add to history
      const historyItem = {
        id: Date.now().toString(),
        expression: `${formatFraction(fraction1)} ${operationSymbol} ${formatFraction(fraction2)}`,
        result: formatFraction(result),
        timestamp: new Date(),
        type: 'calculation',
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi tính toán');
    }
  }, [num1, den1, num2, den2, operation]);

  const handleReset = useCallback(() => {
    setNumerator1('');
    setDenominator1('');
    setDecimalInput('');
    setPercentageInput('');
    setNum1('');
    setDen1('');
    setNum2('');
    setDen2('');
    setConversionResult('');
    setCalculatorResult(null);
    setError('');
  }, []);

  const handleHistoryItemClick = useCallback((item: (typeof history)[0]) => {
    setError('');
    if (item.type === 'conversion') {
      setCurrentTab('converter');
    } else {
      setCurrentTab('calculator');
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const handleQuickOperation = useCallback((quickOp: (typeof QUICK_OPERATIONS)[0]) => {
    if (quickOp.operation === 'convert') {
      const fraction = quickOp.fractions[0];
      setNumerator1(fraction.numerator.toString());
      setDenominator1(fraction.denominator.toString());
      setConversionType('fraction');
      setCurrentTab('converter');
      setTimeout(() => {
        const decimal = fractionToDecimal(fraction);
        const percentage = decimal * 100;

        const result =
          `Phân số: $${formatFraction(fraction)}$\\n` +
          `Số thập phân: ${decimal}\\n` +
          `Phần trăm: ${percentage}%`;
        setConversionResult(result);

        const historyItem = {
          id: Date.now().toString(),
          expression: formatFraction(fraction),
          result: `${formatFraction(fraction)} = ${decimal} = ${percentage}%`,
          timestamp: new Date(),
          type: 'conversion',
        };
        setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      }, 100);
    } else {
      const [f1, f2] = quickOp.fractions;
      setNum1(f1.numerator.toString());
      setDen1(f1.denominator.toString());
      setNum2(f2.numerator.toString());
      setDen2(f2.denominator.toString());
      setOperation(quickOp.operation);
      setCurrentTab('calculator');

      setTimeout(() => {
        try {
          let result: Fraction;
          let operationSymbol = '';

          switch (quickOp.operation) {
            case 'add':
              result = addFractions(f1, f2);
              operationSymbol = '+';
              break;
            case 'subtract':
              result = subtractFractions(f1, f2);
              operationSymbol = '-';
              break;
            case 'multiply':
              result = multiplyFractions(f1, f2);
              operationSymbol = '\\times';
              break;
            case 'divide':
              result = divideFractions(f1, f2);
              operationSymbol = '\\div';
              break;
            default:
              return;
          }

          setCalculatorResult(result);

          const historyItem = {
            id: Date.now().toString(),
            expression: `${formatFraction(f1)} ${operationSymbol} ${formatFraction(f2)}`,
            result: formatFraction(result),
            timestamp: new Date(),
            type: 'calculation',
          };
          setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
        } catch (err) {
          setError('Có lỗi xảy ra khi tính toán');
        }
      }, 100);
    }
  }, []);

  const renderConverter = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Nhập liệu" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Loại chuyển đổi</InputLabel>
                  <Select
                    value={conversionType}
                    label="Loại chuyển đổi"
                    onChange={(e) => setConversionType(e.target.value)}
                  >
                    {Object.entries(CONVERSION_TYPES).map(([type, name]) => (
                      <MenuItem key={type} value={type}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {conversionType === 'fraction' && (
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                      label="Tử số"
                      value={numerator1}
                      onChange={(e) => setNumerator1(e.target.value)}
                      type="number"
                      sx={{ flex: 1 }}
                    />
                    <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                      /
                    </Typography>
                    <TextField
                      label="Mẫu số"
                      value={denominator1}
                      onChange={(e) => setDenominator1(e.target.value)}
                      type="number"
                      sx={{ flex: 1 }}
                    />
                  </Box>
                )}

                {conversionType === 'decimal' && (
                  <TextField
                    fullWidth
                    label="Số thập phân"
                    value={decimalInput}
                    onChange={(e) => setDecimalInput(e.target.value)}
                    type="number"
                    placeholder="Ví dụ: 0.75"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Chip label="Decimal" size="small" />
                        </InputAdornment>
                      ),
                    }}
                    slotProps={{
                      htmlInput: {
                        step: 'any',
                      },
                    }}
                  />
                )}

                {conversionType === 'percentage' && (
                  <TextField
                    fullWidth
                    label="Phần trăm"
                    value={percentageInput}
                    onChange={(e) => setPercentageInput(e.target.value)}
                    type="number"
                    placeholder="Ví dụ: 75"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Chip label="%" size="small" />
                        </InputAdornment>
                      ),
                    }}
                    slotProps={{
                      htmlInput: {
                        step: 'any',
                      },
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Kết quả chuyển đổi" />
            <CardContent>
              {conversionResult ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {conversionResult.split('\\n').map((line, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        bgcolor: 'primary.lighter',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'primary.main',
                        textAlign: 'center',
                      }}
                    >
                      {line.includes('$') ? (
                        <InlineMath math={line.replace(/\$/g, '')} />
                      ) : (
                        <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                          {line}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    color: 'text.secondary',
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                  }}
                >
                  <Iconify icon="mingcute:dot-grid-fill" sx={{ width: 48, height: 48, mb: 2 }} />
                  <Typography variant="body2">
                    Nhập dữ liệu và nhấn "Chuyển đổi" để xem kết quả
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleConversion}
          startIcon={<Iconify icon="solar:restart-bold" />}
          sx={{ minWidth: 200 }}
        >
          Chuyển đổi
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={handleReset}
          startIcon={<Iconify icon="solar:eraser-bold" />}
          sx={{ minWidth: 120 }}
        >
          Reset
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );

  const renderCalculator = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Phân số thứ nhất" />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  label="Tử số"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  type="number"
                  sx={{ flex: 1 }}
                />
                <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                  /
                </Typography>
                <TextField
                  label="Mẫu số"
                  value={den1}
                  onChange={(e) => setDen1(e.target.value)}
                  type="number"
                  sx={{ flex: 1 }}
                />
              </Box>
              {num1 && den1 && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <InlineMath
                    math={formatFraction({
                      numerator: parseInt(num1) || 0,
                      denominator: parseInt(den1) || 1,
                    })}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Phép toán</InputLabel>
            <Select
              value={operation}
              label="Phép toán"
              onChange={(e) => setOperation(e.target.value)}
            >
              <MenuItem value="add">+ (Cộng)</MenuItem>
              <MenuItem value="subtract">- (Trừ)</MenuItem>
              <MenuItem value="multiply">× (Nhân)</MenuItem>
              <MenuItem value="divide">÷ (Chia)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card>
            <CardHeader title="Phân số thứ hai" />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  label="Tử số"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  type="number"
                  sx={{ flex: 1 }}
                />
                <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                  /
                </Typography>
                <TextField
                  label="Mẫu số"
                  value={den2}
                  onChange={(e) => setDen2(e.target.value)}
                  type="number"
                  sx={{ flex: 1 }}
                />
              </Box>
              {num2 && den2 && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <InlineMath
                    math={formatFraction({
                      numerator: parseInt(num2) || 0,
                      denominator: parseInt(den2) || 1,
                    })}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {calculatorResult && (
        <Card>
          <CardHeader title="Kết quả" />
          <CardContent>
            <Box
              sx={{
                p: 3,
                bgcolor: 'success.lighter',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'success.main',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                <InlineMath
                  math={`${formatFraction({ numerator: parseInt(num1) || 0, denominator: parseInt(den1) || 1 })} ${
                    operation === 'add'
                      ? '+'
                      : operation === 'subtract'
                        ? '-'
                        : operation === 'multiply'
                          ? '\\times'
                          : '\\div'
                  } ${formatFraction({ numerator: parseInt(num2) || 0, denominator: parseInt(den2) || 1 })} = ${formatFraction(calculatorResult)}`}
                />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thập phân: {fractionToDecimal(calculatorResult).toFixed(6)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleCalculate}
          startIcon={<Iconify icon="mingcute:dot-grid-fill" />}
          sx={{ minWidth: 200 }}
        >
          Tính toán
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={handleReset}
          startIcon={<Iconify icon="solar:eraser-bold" />}
          sx={{ minWidth: 120 }}
        >
          Reset
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );

  const renderQuickTools = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <Typography variant="h6">Công cụ nhanh</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {QUICK_OPERATIONS.map((quickOp, index) => (
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
            onClick={() => handleQuickOperation(quickOp)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {quickOp.label}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Iconify icon="eva:arrowhead-right-fill" sx={{ color: 'primary.main' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card>
        <CardHeader title="Bảng phân số cơ bản" />
        <CardContent>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd', textAlign: 'center' }}>
                    Phân số
                  </th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd', textAlign: 'center' }}>
                    Thập phân
                  </th>
                  <th style={{ padding: 12, borderBottom: '2px solid #ddd', textAlign: 'center' }}>
                    Phần trăm
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: 1, d: 2 },
                  { n: 1, d: 3 },
                  { n: 1, d: 4 },
                  { n: 1, d: 5 },
                  { n: 1, d: 8 },
                  { n: 2, d: 3 },
                  { n: 3, d: 4 },
                  { n: 3, d: 5 },
                ].map((fraction, i) => {
                  const decimal = fraction.n / fraction.d;
                  const percentage = decimal * 100;
                  return (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
                      <td style={{ padding: 8, textAlign: 'center' }}>
                        <InlineMath
                          math={formatFraction({ numerator: fraction.n, denominator: fraction.d })}
                        />
                      </td>
                      <td
                        style={{
                          padding: 8,
                          textAlign: 'center',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                        }}
                      >
                        {decimal.toFixed(4)}
                      </td>
                      <td
                        style={{
                          padding: 8,
                          textAlign: 'center',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                        }}
                      >
                        {percentage.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
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
              Thực hiện tính toán để xem lịch sử tại đây
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
                      label={item.type === 'conversion' ? 'Chuyển đổi' : 'Tính toán'}
                      size="small"
                      color={item.type === 'conversion' ? 'info' : 'primary'}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <InlineMath math={item.expression} />
                      {item.type === 'calculation' && (
                        <>
                          <Iconify icon="eva:arrow-forward-fill" sx={{ color: 'text.secondary' }} />
                          <InlineMath math={item.result} />
                        </>
                      )}
                    </Box>
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
        <CardHeader title="Hướng dẫn về phân số" />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6">Khái niệm phân số:</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}>
              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Phân số</strong> là một số có dạng <InlineMath math="\frac{a}{b}" /> với{' '}
                  <InlineMath math="a, b \in \mathbb{Z}" /> và <InlineMath math="b \neq 0" />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  - <InlineMath math="a" />: Tử số (numerator)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  - <InlineMath math="b" />: Mẫu số (denominator)
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" component="div">
                  • <strong>Phân số tối giản:</strong> <InlineMath math="\gcd(a, b) = 1" />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Ví dụ: <InlineMath math="\frac{6}{8} = \frac{3}{4}" /> (tối giản)
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Các phép toán với phân số:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>1. Phép cộng:</strong>
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <BlockMath math="\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Ví dụ:{' '}
                    <InlineMath math="\frac{1}{3} + \frac{1}{4} = \frac{1 \times 4 + 1 \times 3}{3 \times 4} = \frac{7}{12}" />
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>2. Phép trừ:</strong>
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <BlockMath math="\frac{a}{b} - \frac{c}{d} = \frac{ad - bc}{bd}" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Ví dụ:{' '}
                    <InlineMath math="\frac{3}{4} - \frac{1}{6} = \frac{3 \times 6 - 1 \times 4}{4 \times 6} = \frac{14}{24} = \frac{7}{12}" />
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>3. Phép nhân:</strong>
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <BlockMath math="\frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd}" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Ví dụ:{' '}
                    <InlineMath math="\frac{2}{3} \times \frac{3}{5} = \frac{2 \times 3}{3 \times 5} = \frac{6}{15} = \frac{2}{5}" />
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>4. Phép chia:</strong>
                </Typography>
                <Box sx={{ ml: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <BlockMath math="\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{ad}{bc}" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Ví dụ:{' '}
                    <InlineMath math="\frac{5}{8} \div \frac{2}{3} = \frac{5}{8} \times \frac{3}{2} = \frac{15}{16}" />
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Chuyển đổi giữa các dạng:
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
                <strong>Phân số ↔ Số thập phân:</strong>
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Phân số → Thập phân: <InlineMath math="\frac{a}{b} = a \div b" />
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Thập phân → Phân số: Dùng thuật toán phân số liên tục
                </Typography>
                <Typography variant="body2" color="primary.main">
                  Ví dụ: <InlineMath math="\frac{3}{4} = 0.75 = 75\%" />
                </Typography>
              </Box>

              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                <strong>Phân số ↔ Phần trăm:</strong>
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Phân số → Phần trăm: <InlineMath math="\frac{a}{b} \times 100\%" />
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Phần trăm → Phân số: <InlineMath math="x\% = \frac{x}{100}" />
                </Typography>
                <Typography variant="body2" color="primary.main">
                  Ví dụ: <InlineMath math="\frac{1}{5} = 20\% = 0.2" />
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="converter"
        label="Chuyển đổi"
        icon={<Iconify icon="solar:restart-bold" />}
      />
      <Tab
        value="calculator"
        label="Tính toán"
        icon={<Iconify icon="mingcute:dot-grid-fill" />}
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
      title="Phân số"
      description="Công cụ chuyển đổi và tính toán với phân số, số thập phân và phần trăm."
      tabs={renderTabs()}
    >
      {currentTab === 'converter' && renderConverter()}
      {currentTab === 'calculator' && renderCalculator()}
      {currentTab === 'quick-tools' && renderQuickTools()}
      {currentTab === 'history' && renderHistory()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayout>
  );
}
