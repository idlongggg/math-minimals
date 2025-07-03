'use client';

import Box from '@mui/material/Box';
import { useEffect } from 'react';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

import {
    FunctionPanel,
    GraphCanvas,
    HistoryPanel,
    InstructionsPanel,
    QuickFunctionsPanel,
    ViewRangePanel,
} from './graphing-calculator/components';
import { useGraphingCalculator } from './graphing-calculator/hooks';

// ----------------------------------------------------------------------

export function GraphingCalculatorView() {
  const { state, actions } = useGraphingCalculator();

  // Update function points when bounds or functions change
  useEffect(() => {
    actions.updateFunctionPoints();
  }, [state.bounds, state.functions, actions]);

  return (
    <DashboardPageLayout
      title="Máy tính đồ thị"
      description="Vẽ và phân tích đồ thị của các hàm số toán học"
      maxWidth="xl"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 400px' },
          gap: 3,
        }}
      >
        {/* Graph Canvas */}
        <GraphCanvas state={state} actions={actions} />

        {/* Control Panel */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FunctionPanel state={state} actions={actions} />
          <ViewRangePanel state={state} actions={actions} />
          <QuickFunctionsPanel state={state} actions={actions} />
          <HistoryPanel state={state} actions={actions} />
          <InstructionsPanel />
        </Box>
      </Box>
    </DashboardPageLayout>
  );
}
