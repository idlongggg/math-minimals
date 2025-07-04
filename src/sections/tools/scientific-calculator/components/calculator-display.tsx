import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

interface CalculatorDisplayProps {
  display: string;
  isRadianMode: boolean;
  memory: number;
  onToggleAngleMode: () => void;
}

export function CalculatorDisplay({
  display,
  isRadianMode,
  memory,
  onToggleAngleMode,
}: CalculatorDisplayProps) {
  return (
    <>
      {/* Mode and Memory Indicators */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Chip
          label={isRadianMode ? 'RAD' : 'DEG'}
          color={isRadianMode ? 'primary' : 'secondary'}
          size="small"
          onClick={onToggleAngleMode}
          sx={{ cursor: 'pointer' }}
        />
        {memory !== 0 && (
          <Chip
            label={`M: ${memory}`}
            color="info"
            size="small"
            variant="outlined"
          />
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
    </>
  );
}
