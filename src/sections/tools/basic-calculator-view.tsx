'use client';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

import { CalculatorButtons, CalculatorDisplay } from './basic-calculator/components';
import { useBasicCalculator, useKeyboardInput } from './basic-calculator/hooks';

// ----------------------------------------------------------------------

export function BasicCalculatorView() {
  const theme = useTheme();
  const { state, actions } = useBasicCalculator();
  
  // Enable keyboard input
  useKeyboardInput(actions);

  return (
    <DashboardPageLayout
      title="Máy tính cơ bản"
      description="Máy tính đơn giản với các phép toán cơ bản: cộng, trừ, nhân, chia."
      maxWidth="sm"
    >
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
        }}
      >
        <CalculatorDisplay display={state.display} />
        <CalculatorButtons actions={actions} />
      </Card>
    </DashboardPageLayout>
  );
}
