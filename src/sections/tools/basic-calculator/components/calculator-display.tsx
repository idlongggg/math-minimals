import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface CalculatorDisplayProps {
  display: string;
}

export function CalculatorDisplay({ display }: CalculatorDisplayProps) {
  return (
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
  );
}
