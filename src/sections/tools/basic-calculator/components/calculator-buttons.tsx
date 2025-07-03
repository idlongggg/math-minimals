import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { BUTTON_STYLES } from '../constants';
import type { UseBasicCalculatorReturn } from '../types';

interface CalculatorButtonsProps {
  actions: UseBasicCalculatorReturn['actions'];
}

export function CalculatorButtons({ actions }: CalculatorButtonsProps) {
  const theme = useTheme();

  const buttonStyleWithTheme = {
    ...BUTTON_STYLES.base,
    '&:hover': {
      ...BUTTON_STYLES.base['&:hover'],
      boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
    },
  };

  const operatorStyle = {
    ...buttonStyleWithTheme,
    ...BUTTON_STYLES.operator,
  };

  const equalsStyle = {
    ...buttonStyleWithTheme,
    ...BUTTON_STYLES.equals,
  };

  const clearStyle = {
    ...buttonStyleWithTheme,
    ...BUTTON_STYLES.clear,
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 1,
      }}
    >
      {/* Row 1 */}
      <Button
        variant="contained"
        sx={{ ...clearStyle, gridColumn: 'span 2' }}
        onClick={actions.clear}
      >
        Clear
      </Button>
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={actions.backspace}
      >
        ⌫
      </Button>
      <Button
        variant="contained"
        sx={operatorStyle}
        onClick={() => actions.performOperation('÷')}
      >
        ÷
      </Button>

      {/* Row 2 */}
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={() => actions.inputDigit('7')}
      >
        7
      </Button>
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={() => actions.inputDigit('8')}
      >
        8
      </Button>
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={() => actions.inputDigit('9')}
      >
        9
      </Button>
      <Button
        variant="contained"
        sx={operatorStyle}
        onClick={() => actions.performOperation('×')}
      >
        ×
      </Button>

      {/* Row 3 */}
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={() => actions.inputDigit('4')}
      >
        4
      </Button>
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={() => actions.inputDigit('5')}
      >
        5
      </Button>
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={() => actions.inputDigit('6')}
      >
        6
      </Button>
      <Button
        variant="contained"
        sx={operatorStyle}
        onClick={() => actions.performOperation('-')}
      >
        −
      </Button>

      {/* Row 4 */}
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={() => actions.inputDigit('1')}
      >
        1
      </Button>
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={() => actions.inputDigit('2')}
      >
        2
      </Button>
      <Button
        variant="outlined"
        sx={buttonStyleWithTheme}
        onClick={() => actions.inputDigit('3')}
      >
        3
      </Button>
      <Button
        variant="contained"
        sx={operatorStyle}
        onClick={() => actions.performOperation('+')}
      >
        +
      </Button>

      {/* Row 5 */}
      <Button
        variant="outlined"
        sx={{ ...buttonStyleWithTheme, gridColumn: 'span 2' }}
        onClick={() => actions.inputDigit('0')}
      >
        0
      </Button>
      <Button 
        variant="outlined" 
        sx={buttonStyleWithTheme} 
        onClick={actions.inputDecimal}
      >
        .
      </Button>
      <Button
        variant="contained"
        sx={equalsStyle}
        onClick={() => actions.performOperation('=')}
      >
        =
      </Button>
    </Box>
  );
}
