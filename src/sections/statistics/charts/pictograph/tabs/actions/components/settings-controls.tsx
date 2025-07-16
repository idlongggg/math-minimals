import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { SLIDER_CONFIGS } from '../data/constants';

import type { PictographActions, PictographSettings } from '../data/types';

interface SettingsControlsProps {
    settings: PictographSettings;
    onUpdateSettings: PictographActions['updateSettings'];
}

export function SettingsControls({ settings, onUpdateSettings }: SettingsControlsProps) {
    return (
        <>
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Giá trị mỗi biểu tượng: {settings.unitValue}
                </Typography>
                <Slider
                    value={settings.unitValue}
                    onChange={(_, value) => onUpdateSettings({ unitValue: value as number })}
                    min={SLIDER_CONFIGS.unitValue.min}
                    max={SLIDER_CONFIGS.unitValue.max}
                    step={SLIDER_CONFIGS.unitValue.step}
                    marks
                    valueLabelDisplay="auto"
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Số biểu tượng tối đa mỗi hàng: {settings.maxIconsPerRow}
                </Typography>
                <Slider
                    value={settings.maxIconsPerRow}
                    onChange={(_, value) => onUpdateSettings({ maxIconsPerRow: value as number })}
                    min={SLIDER_CONFIGS.maxIconsPerRow.min}
                    max={SLIDER_CONFIGS.maxIconsPerRow.max}
                    step={SLIDER_CONFIGS.maxIconsPerRow.step}
                    marks
                    valueLabelDisplay="auto"
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Kích thước biểu tượng: {settings.iconSize}px
                </Typography>
                <Slider
                    value={settings.iconSize}
                    onChange={(_, value) => onUpdateSettings({ iconSize: value as number })}
                    min={SLIDER_CONFIGS.iconSize.min}
                    max={SLIDER_CONFIGS.iconSize.max}
                    step={SLIDER_CONFIGS.iconSize.step}
                    marks
                    valueLabelDisplay="auto"
                />
            </Box>
        </>
    );
}
