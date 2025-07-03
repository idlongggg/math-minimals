import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

import type { GraphingCalculatorActions, GraphingCalculatorState } from '../types';

interface FunctionPanelProps {
  state: GraphingCalculatorState;
  actions: GraphingCalculatorActions;
}

export function FunctionPanel({ state, actions }: FunctionPanelProps) {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Hàm số</Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={actions.addFunction}
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {state.functions.map((func) => (
          <Box
            key={func.id}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: func.color,
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2" sx={{ minWidth: 20 }}>
                f{func.id}(x) =
              </Typography>
              <TextField
                size="small"
                value={func.expression}
                onChange={(e) =>
                  actions.updateFunctionExpression(func.id, e.target.value)
                }
                placeholder="x^2, sin(x), log(x), ..."
                sx={{ flex: 1 }}
              />
              <IconButton
                size="small"
                onClick={() => actions.toggleFunctionVisibility(func.id)}
                color={func.visible ? 'primary' : 'default'}
              >
                <Iconify
                  icon={
                    func.visible
                      ? 'solar:eye-bold'
                      : 'solar:eye-closed-bold'
                  }
                />
              </IconButton>
              {state.functions.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => actions.removeFunction(func.id)}
                  color="error"
                >
                  <Iconify icon="mingcute:close-line" />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {state.error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {state.error}
        </Alert>
      )}
    </Card>
  );
}
