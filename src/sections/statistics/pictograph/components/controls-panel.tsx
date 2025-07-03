import Box from '@mui/material/Box';

import { CustomCard, CustomCardContent, CustomCardHeader } from 'src/components/custom-card';

import type { PictographActions, PictographState } from '../types';
import { CustomDataEditor } from './custom-data-editor';
import { DataSetSelector } from './data-set-selector';
import { SettingsControls } from './settings-controls';

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
            <CustomDataEditor
              customData={state.customData}
              actions={actions}
            />
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
