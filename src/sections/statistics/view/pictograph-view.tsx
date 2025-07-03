'use client';

import Box from '@mui/material/Box';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

import { ChartDisplay, ControlsPanel } from '../pictograph/components';
import { usePictograph } from '../pictograph/hooks';

// ----------------------------------------------------------------------

export function PictographView() {
  const { state, actions, currentData } = usePictograph();

  return (
    <DashboardPageLayout
      title="Biểu đồ tranh (Pictograph)"
      description="Biểu đồ tranh sử dụng biểu tượng để hiển thị dữ liệu một cách trực quan và dễ hiểu. Mỗi biểu tượng đại diện cho một giá trị nhất định."
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
          gap: 3,
        }}
      >
        <ControlsPanel state={state} actions={actions} />
        <ChartDisplay state={state} currentData={currentData} />
      </Box>
    </DashboardPageLayout>
  );
}
