'use client';

import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function ScientificCalculatorView() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isRadianMode, setIsRadianMode] = useState(true);
  const [history, setHistory] = useState<string[]>([]);

  const inputDigit = useCallback(
    (digit: string) => {
      if (waitingForOperand) {
        setDisplay(String(digit));
        setWaitingForOperand(false);
      } else {
        setDisplay(display === '0' ? String(digit) : display + digit);
      }
    },
    [display, waitingForOperand]
  );

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearAll = useCallback(() => {
    clear();
    setMemory(0);
    setHistory([]);
  }, [clear]);

  const addToHistory = useCallback((calculation: string) => {
    setHistory((prev) => [calculation, ...prev.slice(0, 9)]); // Keep last 10 calculations
  }, []);

  const performOperation = useCallback(
    (nextOperation: string) => {
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(inputValue);
      } else if (operation) {
        const currentValue = previousValue || 0;
        const newValue = calculate(currentValue, inputValue, operation);

        if (nextOperation === '=') {
          addToHistory(`${currentValue} ${operation} ${inputValue} = ${newValue}`);
        }

        setDisplay(String(newValue));
        setPreviousValue(newValue);
      }

      setWaitingForOperand(true);
      setOperation(nextOperation);
    },
    [display, previousValue, operation, addToHistory]
  );

  const performScientificOperation = useCallback(
    (func: string) => {
      const inputValue = parseFloat(display);
      let result: number;

      switch (func) {
        case 'sin':
          result = Math.sin(isRadianMode ? inputValue : (inputValue * Math.PI) / 180);
          addToHistory(`sin(${inputValue}) = ${result}`);
          break;
        case 'cos':
          result = Math.cos(isRadianMode ? inputValue : (inputValue * Math.PI) / 180);
          addToHistory(`cos(${inputValue}) = ${result}`);
          break;
        case 'tan':
          result = Math.tan(isRadianMode ? inputValue : (inputValue * Math.PI) / 180);
          addToHistory(`tan(${inputValue}) = ${result}`);
          break;
        case 'log':
          result = Math.log10(inputValue);
          addToHistory(`log(${inputValue}) = ${result}`);
          break;
        case 'ln':
          result = Math.log(inputValue);
          addToHistory(`ln(${inputValue}) = ${result}`);
          break;
        case 'sqrt':
          result = Math.sqrt(inputValue);
          addToHistory(`√(${inputValue}) = ${result}`);
          break;
        case 'square':
          result = inputValue * inputValue;
          addToHistory(`${inputValue}² = ${result}`);
          break;
        case 'factorial':
          result = factorial(inputValue);
          addToHistory(`${inputValue}! = ${result}`);
          break;
        case 'reciprocal':
          result = 1 / inputValue;
          addToHistory(`1/${inputValue} = ${result}`);
          break;
        case 'pi':
          result = Math.PI;
          addToHistory(`π = ${result}`);
          break;
        case 'e':
          result = Math.E;
          addToHistory(`e = ${result}`);
          break;
        case 'exp':
          result = Math.exp(inputValue);
          addToHistory(`e^${inputValue} = ${result}`);
          break;
        case 'power':
          if (previousValue !== null) {
            result = Math.pow(previousValue, inputValue);
            addToHistory(`${previousValue}^${inputValue} = ${result}`);
            setPreviousValue(null);
            setOperation(null);
          } else {
            result = inputValue;
          }
          break;
        default:
          result = inputValue;
      }

      setDisplay(isNaN(result) ? 'Error' : String(result));
      setWaitingForOperand(true);
    },
    [display, isRadianMode, previousValue, addToHistory]
  );

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case 'mod':
        return firstValue % secondValue;
      case '^':
        return Math.pow(firstValue, secondValue);
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleMemory = useCallback(
    (action: string) => {
      const currentValue = parseFloat(display);
      switch (action) {
        case 'MC':
          setMemory(0);
          break;
        case 'MR':
          setDisplay(String(memory));
          setWaitingForOperand(true);
          break;
        case 'MS':
          setMemory(currentValue);
          break;
        case 'M+':
          setMemory(memory + currentValue);
          break;
        case 'M-':
          setMemory(memory - currentValue);
          break;
      }
    },
    [display, memory]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      if (key >= '0' && key <= '9') {
        inputDigit(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === '%') {
        performOperation('mod');
      } else if (key === '^') {
        performOperation('^');
      } else if (key === 'Enter' || key === '=') {
        performOperation('=');
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      } else if (key === 'Backspace') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    },
    [display, inputDigit, inputDecimal, performOperation, clear]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const buttonStyle = {
    minHeight: 50,
    fontSize: '0.9rem',
    fontWeight: 600,
  };

  const operatorStyle = {
    ...buttonStyle,
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  };

  const scientificStyle = {
    ...buttonStyle,
    backgroundColor: 'secondary.main',
    color: 'secondary.contrastText',
    '&:hover': {
      backgroundColor: 'secondary.dark',
    },
  };

  const equalsStyle = {
    ...buttonStyle,
    backgroundColor: 'success.main',
    color: 'success.contrastText',
    '&:hover': {
      backgroundColor: 'success.dark',
    },
  };

  const clearStyle = {
    ...buttonStyle,
    backgroundColor: 'error.main',
    color: 'error.contrastText',
    '&:hover': {
      backgroundColor: 'error.dark',
    },
  };

  const memoryStyle = {
    ...buttonStyle,
    backgroundColor: 'info.main',
    color: 'info.contrastText',
    '&:hover': {
      backgroundColor: 'info.dark',
    },
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ mb: 3 }}>
        Máy tính khoa học
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Calculator */}
        <Card sx={{ p: 3 }}>
          {/* Mode and Memory Indicators */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              label={isRadianMode ? 'RAD' : 'DEG'}
              color={isRadianMode ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setIsRadianMode(!isRadianMode)}
              sx={{ cursor: 'pointer' }}
            />
            {memory !== 0 && (
              <Chip label={`M: ${memory}`} color="info" size="small" variant="outlined" />
            )}
          </Box>

          {/* Display */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              value={display}
              variant="outlined"
              InputProps={{
                readOnly: true,
                sx: {
                  fontSize: '1.5rem',
                  textAlign: 'right',
                  fontFamily: 'monospace',
                  backgroundColor: 'grey.100',
                  '& input': {
                    textAlign: 'right',
                    padding: '12px',
                  },
                },
              }}
            />
          </Box>

          {/* Scientific Functions Row 1 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, mb: 1 }}>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('sin')}
            >
              sin
            </Button>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('cos')}
            >
              cos
            </Button>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('tan')}
            >
              tan
            </Button>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('log')}
            >
              log
            </Button>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('ln')}
            >
              ln
            </Button>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('sqrt')}
            >
              √
            </Button>
          </Box>

          {/* Scientific Functions Row 2 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, mb: 1 }}>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('square')}
            >
              x²
            </Button>
            <Button variant="contained" sx={scientificStyle} onClick={() => performOperation('^')}>
              x^y
            </Button>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('exp')}
            >
              e^x
            </Button>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('factorial')}
            >
              x!
            </Button>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('reciprocal')}
            >
              1/x
            </Button>
            <Button variant="contained" sx={operatorStyle} onClick={() => performOperation('mod')}>
              mod
            </Button>
          </Box>

          {/* Constants Row */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, mb: 1 }}>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('pi')}
            >
              π
            </Button>
            <Button
              variant="contained"
              sx={scientificStyle}
              onClick={() => performScientificOperation('e')}
            >
              e
            </Button>
            <Button variant="contained" sx={memoryStyle} onClick={() => handleMemory('MC')}>
              MC
            </Button>
            <Button variant="contained" sx={memoryStyle} onClick={() => handleMemory('MR')}>
              MR
            </Button>
            <Button variant="contained" sx={memoryStyle} onClick={() => handleMemory('MS')}>
              MS
            </Button>
            <Button variant="contained" sx={memoryStyle} onClick={() => handleMemory('M+')}>
              M+
            </Button>
          </Box>

          {/* Main Calculator Buttons */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>
            {/* Row 1 */}
            <Button variant="contained" sx={clearStyle} onClick={clearAll}>
              AC
            </Button>
            <Button variant="contained" sx={clearStyle} onClick={clear}>
              C
            </Button>
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={() => {
                if (display.length > 1) {
                  setDisplay(display.slice(0, -1));
                } else {
                  setDisplay('0');
                }
              }}
            >
              ⌫
            </Button>
            <Button variant="contained" sx={memoryStyle} onClick={() => handleMemory('M-')}>
              M-
            </Button>
            <Button variant="contained" sx={operatorStyle} onClick={() => performOperation('÷')}>
              ÷
            </Button>

            {/* Row 2 */}
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('7')}>
              7
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('8')}>
              8
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('9')}>
              9
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('(')}>
              (
            </Button>
            <Button variant="contained" sx={operatorStyle} onClick={() => performOperation('×')}>
              ×
            </Button>

            {/* Row 3 */}
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('4')}>
              4
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('5')}>
              5
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('6')}>
              6
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit(')')}>
              )
            </Button>
            <Button variant="contained" sx={operatorStyle} onClick={() => performOperation('-')}>
              −
            </Button>

            {/* Row 4 */}
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('1')}>
              1
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('2')}>
              2
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={() => inputDigit('3')}>
              3
            </Button>
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={() => setDisplay(String(-parseFloat(display)))}
            >
              ±
            </Button>
            <Button variant="contained" sx={operatorStyle} onClick={() => performOperation('+')}>
              +
            </Button>

            {/* Row 5 */}
            <Button
              variant="outlined"
              sx={{ ...buttonStyle, gridColumn: 'span 2' }}
              onClick={() => inputDigit('0')}
            >
              0
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={inputDecimal}>
              .
            </Button>
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={() => setDisplay(String(Math.abs(parseFloat(display))))}
            >
              |x|
            </Button>
            <Button variant="contained" sx={equalsStyle} onClick={() => performOperation('=')}>
              =
            </Button>
          </Box>

          {/* Keyboard Instructions */}
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Hướng dẫn bàn phím:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Số 0-9: Nhập số • +, -, *, /, %, ^: Phép toán • Enter/=: Tính toán
              <br />• Escape/C: Xóa • Backspace: Xóa ký tự cuối • .: Dấu thập phân
            </Typography>
          </Box>
        </Card>

        {/* History Panel */}
        <Card sx={{ p: 3, maxHeight: '600px', overflow: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Lịch sử tính toán
          </Typography>

          {history.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Chưa có phép tính nào
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {history.map((calc, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    backgroundColor: 'grey.50',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'grey.100',
                    },
                  }}
                  onClick={() => {
                    const result = calc.split(' = ')[1];
                    if (result) {
                      setDisplay(result);
                      setWaitingForOperand(true);
                    }
                  }}
                >
                  {calc}
                </Box>
              ))}
            </Box>
          )}

          {history.length > 0 && (
            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 2, width: '100%' }}
              onClick={() => setHistory([])}
            >
              Xóa lịch sử
            </Button>
          )}
        </Card>
      </Box>
    </Container>
  );
}
