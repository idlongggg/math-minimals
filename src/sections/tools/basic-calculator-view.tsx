'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

export function BasicCalculatorView() {
  const theme = useTheme();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

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

  const performOperation = useCallback(
    (nextOperation: string) => {
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(inputValue);
      } else if (operation) {
        const currentValue = previousValue || 0;
        const newValue = calculate(currentValue, inputValue, operation);

        setDisplay(String(newValue));
        setPreviousValue(newValue);
      }

      setWaitingForOperand(true);
      setOperation(nextOperation);
    },
    [display, previousValue, operation]
  );

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
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

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
    minHeight: 60,
    fontSize: '1.2rem',
    fontWeight: 600,
    borderRadius: 2,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
    },
  };

  const operatorStyle = {
    ...buttonStyle,
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'primary.dark',
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

  return (
    <DashboardPageLayout
      title="Máy tính cơ bản"
      description="Máy tính đơn giản với các phép toán cơ bản: cộng, trừ, nhân, chia."
      maxWidth="sm"
    >
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
        }}
      >
        {/* Display */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            value={display}
            variant="outlined"
            InputProps={{
              readOnly: true,
              sx: {
                fontSize: '2rem',
                textAlign: 'right',
                fontFamily: 'monospace',
                backgroundColor: 'grey.100',
                '& input': {
                  textAlign: 'right',
                  padding: '16px',
                },
              },
            }}
          />
        </Box>

        {/* Calculator Buttons */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          {/* Row 1 */}
          <Button variant="contained" sx={{ ...clearStyle, gridColumn: 'span 2' }} onClick={clear}>
            Clear
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
          <Button variant="contained" sx={equalsStyle} onClick={() => performOperation('=')}>
            =
          </Button>
        </Box>
      </Card>
    </DashboardPageLayout>
  );
}
