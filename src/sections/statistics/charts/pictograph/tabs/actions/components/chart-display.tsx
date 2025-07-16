import Box from '@mui/material/Box';

import { PictographChart } from '../pictograph-chart';

import type { PictographData } from '../pictograph-chart';
import type { DataSetKey, PictographState } from '../data/types';

interface ChartDisplayProps {
    state: PictographState;
    currentData: PictographData[];
}

function getChartTitle(selectedDataSet: DataSetKey, useCustomData: boolean): string {
    if (useCustomData) {
        return 'Biểu đồ tranh tùy chỉnh';
    }

    const titles = {
        fruits: 'trái cây',
        vehicles: 'phương tiện',
        animals: 'động vật',
        sports: 'thể thao',
    };

    return `Biểu đồ ${titles[selectedDataSet]}`;
}

export function ChartDisplay({ state, currentData }: ChartDisplayProps) {
    const title = getChartTitle(state.selectedDataSet, state.useCustomData);

    return (
        <Box>
            <Box
                sx={{
                    transition: 'all 0.3s ease',
                }}
            >
                <PictographChart
                    title={title}
                    data={currentData}
                    unitValue={state.settings.unitValue}
                    maxIconsPerRow={state.settings.maxIconsPerRow}
                    iconSize={state.settings.iconSize}
                    showLegend
                    showValues
                />
            </Box>
        </Box>
    );
}
