import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { BUTTON_STYLES } from '../constants';

import type { MemoryAction } from '../types';

interface BasicButtonsProps {
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onOperation: (operation: string) => void;
  onClear: () => void;
  onClearAll: () => void;
  onBackspace: () => void;
  onMemoryAction: (action: MemoryAction) => void;
  onToggleSign: () => void;
  onAbsoluteValue: () => void;
}

export function BasicButtons({
  onDigit,
  onDecimal,
  onOperation,
  onClear,
  onClearAll,
  onBackspace,
  onMemoryAction,
  onToggleSign,
  onAbsoluteValue,
}: BasicButtonsProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 1,
      }}
    >
      {/* Row 1 */}
      <Button variant="contained" sx={BUTTON_STYLES.clear} onClick={onClearAll}>
        AC
      </Button>
      <Button variant="contained" sx={BUTTON_STYLES.clear} onClick={onClear}>
        C
      </Button>
      <Button variant="outlined" sx={BUTTON_STYLES.base} onClick={onBackspace}>
        ⌫
      </Button>
      <Button
        variant="contained"
        sx={BUTTON_STYLES.memory}
        onClick={() => onMemoryAction('M-')}
      >
        M-
      </Button>
      <Button
        variant="contained"
        sx={BUTTON_STYLES.operator}
        onClick={() => onOperation('÷')}
      >
        ÷
      </Button>

      {/* Row 2 */}
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('7')}
      >
        7
      </Button>
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('8')}
      >
        8
      </Button>
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('9')}
      >
        9
      </Button>
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('(')}
      >
        (
      </Button>
      <Button
        variant="contained"
        sx={BUTTON_STYLES.operator}
        onClick={() => onOperation('×')}
      >
        ×
      </Button>

      {/* Row 3 */}
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('4')}
      >
        4
      </Button>
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('5')}
      >
        5
      </Button>
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('6')}
      >
        6
      </Button>
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit(')')}
      >
        )
      </Button>
      <Button
        variant="contained"
        sx={BUTTON_STYLES.operator}
        onClick={() => onOperation('-')}
      >
        −
      </Button>

      {/* Row 4 */}
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('1')}
      >
        1
      </Button>
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('2')}
      >
        2
      </Button>
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={() => onDigit('3')}
      >
        3
      </Button>
      <Button variant="outlined" sx={BUTTON_STYLES.base} onClick={onToggleSign}>
        ±
      </Button>
      <Button
        variant="contained"
        sx={BUTTON_STYLES.operator}
        onClick={() => onOperation('+')}
      >
        +
      </Button>

      {/* Row 5 */}
      <Button
        variant="outlined"
        sx={{ ...BUTTON_STYLES.base, gridColumn: 'span 2' }}
        onClick={() => onDigit('0')}
      >
        0
      </Button>
      <Button variant="outlined" sx={BUTTON_STYLES.base} onClick={onDecimal}>
        .
      </Button>
      <Button
        variant="outlined"
        sx={BUTTON_STYLES.base}
        onClick={onAbsoluteValue}
      >
        |x|
      </Button>
      <Button
        variant="contained"
        sx={BUTTON_STYLES.equals}
        onClick={() => onOperation('=')}
      >
        =
      </Button>
    </Box>
  );
}
