'use client';

import Box from '@mui/material/Box';

import { usePictograph } from './hooks';
import { ChartDisplay } from './components/chart-display';
import { ControlsPanel } from './components/controls-panel';

export default function PictographView() {
    const { state, actions, currentData } = usePictograph();

    return (
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
    );
}
