import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useCanvasDrawing } from '../hooks';
import { CANVAS_CONFIG } from '../constants';
import { inverseTransformX, inverseTransformY } from '../utils';

import type {
  GraphingCalculatorState,
  GraphingCalculatorActions,
} from '../types';

interface GraphCanvasProps {
  state: GraphingCalculatorState;
  actions: GraphingCalculatorActions;
}

export function GraphCanvas({ state, actions }: GraphCanvasProps) {
  const theme = useTheme();
  const { canvasRef } = useCanvasDrawing(state);

  const handleCanvasMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const canvasX = event.clientX - rect.left;
      const canvasY = event.clientY - rect.top;

      // Transform back to mathematical coordinates
      const x = inverseTransformX(
        canvasX,
        state.bounds.xMin,
        state.bounds.xMax,
        canvas.width
      );
      const y = inverseTransformY(
        canvasY,
        state.bounds.yMin,
        state.bounds.yMax,
        canvas.height
      );

      actions.setHoveredPoint({ x, y });
    },
    [state.bounds, actions, canvasRef]
  );

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
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Biểu đồ</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant={state.settings.gridVisible ? 'contained' : 'outlined'}
            onClick={() =>
              actions.setSettings({ gridVisible: !state.settings.gridVisible })
            }
          >
            Lưới
          </Button>
          <Button size="small" variant="outlined" onClick={actions.resetView}>
            Reset
          </Button>
        </Box>
      </Box>

      <canvas
        ref={canvasRef}
        width={CANVAS_CONFIG.width}
        height={CANVAS_CONFIG.height}
        style={{
          width: '100%',
          height: 'auto',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'crosshair',
        }}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={() => actions.setHoveredPoint(null)}
      />

      {/* Zoom Control */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" gutterBottom>
          Zoom: {state.settings.zoom.toFixed(1)}x
        </Typography>
        <Slider
          value={state.settings.zoom}
          onChange={(_, value) => actions.handleZoom(value as number)}
          min={0.1}
          max={5}
          step={0.1}
          sx={{ width: 200 }}
        />
      </Box>
    </Card>
  );
}
