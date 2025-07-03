import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BUTTON_STYLES } from '../constants';
import type { MemoryAction, ScientificFunction } from '../types';

interface ScientificButtonsProps {
  onScientificOperation: (func: ScientificFunction) => void;
  onOperation: (operation: string) => void;
  onMemoryAction: (action: MemoryAction) => void;
}

export function ScientificButtons({ 
  onScientificOperation, 
  onOperation,
  onMemoryAction 
}: ScientificButtonsProps) {
  return (
    <>
      {/* Scientific Functions Row 1 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 1,
          mb: 1,
        }}
      >
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('sin')}
        >
          sin
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('cos')}
        >
          cos
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('tan')}
        >
          tan
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('log')}
        >
          log
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('ln')}
        >
          ln
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('sqrt')}
        >
          √
        </Button>
      </Box>

      {/* Scientific Functions Row 2 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 1,
          mb: 1,
        }}
      >
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('square')}
        >
          x²
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onOperation('^')}
        >
          x^y
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('exp')}
        >
          e^x
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('factorial')}
        >
          x!
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('reciprocal')}
        >
          1/x
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.operator}
          onClick={() => onOperation('mod')}
        >
          mod
        </Button>
      </Box>

      {/* Constants Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 1,
          mb: 1,
        }}
      >
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('pi')}
        >
          π
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.scientific}
          onClick={() => onScientificOperation('e')}
        >
          e
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.memory}
          onClick={() => onMemoryAction('MC')}
        >
          MC
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.memory}
          onClick={() => onMemoryAction('MR')}
        >
          MR
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.memory}
          onClick={() => onMemoryAction('MS')}
        >
          MS
        </Button>
        <Button
          variant="contained"
          sx={BUTTON_STYLES.memory}
          onClick={() => onMemoryAction('M+')}
        >
          M+
        </Button>
      </Box>
    </>
  );
}
