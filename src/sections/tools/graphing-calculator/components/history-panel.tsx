import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import type { GraphingCalculatorActions, GraphingCalculatorState } from '../types';

interface HistoryPanelProps {
  state: GraphingCalculatorState;
  actions: GraphingCalculatorActions;
}

export function HistoryPanel({ state, actions }: HistoryPanelProps) {
  const theme = useTheme();

  const cardStyle = {
    p: 3,
    maxHeight: '300px',
    overflow: 'auto',
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
  };

  const selectedFunction = state.functions.find(
    func => func.id === state.selectedFunctionId
  );

  const handleHistoryClick = (expr: string) => {
    if (selectedFunction) {
      actions.updateFunctionExpression(selectedFunction.id, expr);
    }
  };

  return (
    <Card sx={cardStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Lịch sử
      </Typography>

      {state.history.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', py: 2 }}
        >
          Chưa có hàm nào
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {state.history.map((expr, index) => (
            <Box
              key={index}
              sx={{
                p: 1,
                backgroundColor: 'grey.50',
                borderRadius: 1,
                fontSize: '0.875rem',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
              onClick={() => handleHistoryClick(expr)}
            >
              y = {expr}
            </Box>
          ))}
        </Box>
      )}

      {state.history.length > 0 && (
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 2, width: '100%' }}
          onClick={actions.clearHistory}
        >
          Xóa lịch sử
        </Button>
      )}
    </Card>
  );
}
