import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

interface CalculatorHistoryProps {
  history: string[];
  onClearHistory: () => void;
  onSelectFromHistory: (value: string) => void;
}

export function CalculatorHistory({ 
  history, 
  onClearHistory, 
  onSelectFromHistory 
}: CalculatorHistoryProps) {
  return (
    <Card
      sx={{
        p: 3,
        maxHeight: '600px',
        overflow: 'auto',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: (theme) => theme.vars?.customShadows?.z4 || theme.shadows[4],
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Lịch sử tính toán
      </Typography>

      {history.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', py: 4 }}
        >
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
                  onSelectFromHistory(result);
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
          onClick={onClearHistory}
        >
          Xóa lịch sử
        </Button>
      )}
    </Card>
  );
}
