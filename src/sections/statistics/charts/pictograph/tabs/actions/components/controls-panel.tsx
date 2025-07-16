import Box from '@mui/material/Box';
import { Card, CardHeader, CardContent } from '@mui/material';

import { DataSetSelector } from './data-set-selector';
import { SettingsControls } from './settings-controls';
import { CustomDataEditor } from './custom-data-editor';

import type { PictographState, PictographActions } from '../data/types';

interface ControlsPanelProps {
    state: PictographState;
    actions: PictographActions;
}

export function ControlsPanel({ state, actions }: ControlsPanelProps) {
    return (
        <Box>
            <Card>
                <CardHeader title="Điều khiển biểu đồ" />
                <CardContent>
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
                </CardContent>
            </Card>
        </Box>
    );
}
