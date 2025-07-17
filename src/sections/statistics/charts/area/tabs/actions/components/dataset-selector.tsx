import { Select, MenuItem, InputLabel, FormControl, type SelectChangeEvent } from '@mui/material';

import { useLocales } from 'src/locales';

import { DATA_INPUT } from '../data';

import type { ChartDataItem } from '../data';

interface DatasetSelectorProps {
    currTable: ChartDataItem;
    onTableChange: (event: SelectChangeEvent) => void;
}

export function DatasetSelector({ currTable, onTableChange }: DatasetSelectorProps) {
    const { translate: t } = useLocales();

    return (
        <FormControl size="small" sx={{ minWidth: 120, width: 320 }}>
            <InputLabel id="dataset-select-label">
                {t('pages.statistics.charts.area.actions.data-selector.label')}
            </InputLabel>
            <Select
                labelId="dataset-select-label"
                value={currTable.key}
                label={t('pages.statistics.charts.area.actions.data-selector.label')}
                onChange={onTableChange}
            >
                {DATA_INPUT.map((d) => (
                    <MenuItem key={d.key} value={d.key}>
                        {d.key === 'empty' ? <strong>{d.chart.title}</strong> : d.chart.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
