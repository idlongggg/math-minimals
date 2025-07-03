import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { QUICK_FUNCTIONS } from '../constants';
import type { GraphingCalculatorActions, GraphingCalculatorState } from '../types';

interface QuickFunctionsPanelProps {
  state: GraphingCalculatorState;
  actions: GraphingCalculatorActions;
}

export function QuickFunctionsPanel({ state, actions }: QuickFunctionsPanelProps) {
  const theme = useTheme();

  const cardStyle = {
    p: 3,
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
  };

  const selectedFunction = state.functions.find(
    func => func.id === state.selectedFunctionId
  );

  const handleQuickFunction = (expr: string) => {
    if (selectedFunction) {
      actions.updateFunctionExpression(selectedFunction.id, expr);
      actions.addToHistory(expr);
    }
  };

  return (
    <Card sx={cardStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Hàm nhanh
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {QUICK_FUNCTIONS.map((expr) => (
          <Button
            key={expr}
            variant="outlined"
            size="small"
            onClick={() => handleQuickFunction(expr)}
            sx={{ justifyContent: 'flex-start' }}
          >
            y = {expr}
          </Button>
        ))}
      </Box>
    </Card>
  );
}
