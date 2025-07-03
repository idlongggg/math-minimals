// Steps display component for division calculations

import { InlineMath } from 'react-katex';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import type { DivisionResult } from '../types';

interface DivisionStepsProps {
  result: DivisionResult;
}

export function DivisionSteps({ result }: DivisionStepsProps) {
  return (
    <Card>
      <CardHeader title="Các bước tính toán chi tiết" />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {result.steps.map((step) => (
            <Box
              key={step.step}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: step.step % 2 === 0 ? 'action.hover' : 'background.paper',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 1,
                }}
              >
                <Chip
                  label={`Bước ${step.step}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Typography variant="subtitle2">{step.description}</Typography>
              </Box>
              <Box sx={{ ml: 1 }}>
                <Box component="div" sx={{ mb: 1 }}>
                  <InlineMath math={step.calculation} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  = {step.result}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
