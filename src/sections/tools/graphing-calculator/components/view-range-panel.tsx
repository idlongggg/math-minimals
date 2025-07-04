import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import type {
  GraphingCalculatorState,
  GraphingCalculatorActions,
} from '../types';

interface ViewRangePanelProps {
  state: GraphingCalculatorState;
  actions: GraphingCalculatorActions;
}

export function ViewRangePanel({ state, actions }: ViewRangePanelProps) {
  const theme = useTheme();

  const cardStyle = {
    p: 3,
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
  };

  return (
    <Card sx={cardStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Phạm vi hiển thị
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <TextField
          label="X min"
          type="number"
          value={state.bounds.xMin}
          onChange={(e) => actions.setBounds({ xMin: Number(e.target.value) })}
          size="small"
        />
        <TextField
          label="X max"
          type="number"
          value={state.bounds.xMax}
          onChange={(e) => actions.setBounds({ xMax: Number(e.target.value) })}
          size="small"
        />
        <TextField
          label="Y min"
          type="number"
          value={state.bounds.yMin}
          onChange={(e) => actions.setBounds({ yMin: Number(e.target.value) })}
          size="small"
        />
        <TextField
          label="Y max"
          type="number"
          value={state.bounds.yMax}
          onChange={(e) => actions.setBounds({ yMax: Number(e.target.value) })}
          size="small"
        />
      </Box>
    </Card>
  );
}
