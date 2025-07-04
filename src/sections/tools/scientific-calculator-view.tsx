'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

import { useCalculator, useKeyboardInput } from './scientific-calculator/hooks';
import {
  BasicButtons,
  CalculatorDisplay,
  CalculatorHistory,
  ScientificButtons,
  KeyboardInstructions,
} from './scientific-calculator/components';

// ----------------------------------------------------------------------

export function ScientificCalculatorView() {
  const theme = useTheme();
  const { state, actions } = useCalculator();

  // Enable keyboard input
  useKeyboardInput(actions);

  return (
    <DashboardPageLayout
      title="Máy tính khoa học"
      description="Máy tính khoa học với các hàm toán học nâng cao"
      maxWidth="lg"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
        }}
      >
        {/* Calculator */}
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
          }}
        >
          <CalculatorDisplay
            display={state.display}
            isRadianMode={state.isRadianMode}
            memory={state.memory}
            onToggleAngleMode={actions.toggleAngleMode}
          />

          <ScientificButtons
            onScientificOperation={actions.performScientificOperation}
            onOperation={actions.performOperation}
            onMemoryAction={actions.handleMemory}
          />

          <BasicButtons
            onDigit={actions.inputDigit}
            onDecimal={actions.inputDecimal}
            onOperation={actions.performOperation}
            onClear={actions.clear}
            onClearAll={actions.clearAll}
            onBackspace={actions.backspace}
            onMemoryAction={actions.handleMemory}
            onToggleSign={actions.toggleSign}
            onAbsoluteValue={actions.absoluteValue}
          />

          <KeyboardInstructions />
        </Card>

        {/* History Panel */}
        <CalculatorHistory
          history={state.history}
          onClearHistory={actions.clearHistory}
          onSelectFromHistory={actions.setDisplayFromHistory}
        />
      </Box>
    </DashboardPageLayout>
  );
}
