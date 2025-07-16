import Box from '@mui/material/Box';

import { DataSetSelector } from './data-set-selector';
import { SettingsControls } from './settings-controls';
import { CustomDataEditor } from './custom-data-editor';
import { CustomCard, CustomCardHeader, CustomCardContent } from '../components/custom-card';

import type { PictographState, PictographActions } from '../types';

interface ControlsPanelProps {
    state: PictographState;
    actions: PictographActions;
}

export function ControlsPanel({ state, actions }: ControlsPanelProps) {
    return (
        <Box>
            <CustomCard>
                <CustomCardHeader title="Điều khiển biểu đồ" />
                <CustomCardContent>
                    <DataSetSelector
                        selectedDataSet={state.selectedDataSet}
                        useCustomData={state.useCustomData}
                        onDataSetChange={actions.setSelectedDataSet}
                        onToggleCustomData={actions.setUseCustomData}
                    />

                    {state.useCustomData && (
                        <CustomDataEditor customData={state.customData} actions={actions} />
                    )}

                    <SettingsControls
                        settings={state.settings}
                        onUpdateSettings={actions.updateSettings}
                    />
                </CustomCardContent>
            </CustomCard>
        </Box>
    );
}
