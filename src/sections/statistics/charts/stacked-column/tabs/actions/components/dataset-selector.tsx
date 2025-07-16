import type { SelectChangeEvent } from '@mui/material';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useLocales } from 'src/locales';

import { DEFAULT_DATA } from '../data/data-constants';

import type { DataItem } from '../data/data-constants';

interface DatasetSelectorProps {
    currTable: DataItem;
    onTableChange: (event: SelectChangeEvent) => void;
}

export default function DatasetSelector({ currTable, onTableChange }: DatasetSelectorProps) {
    const { translate: t } = useLocales();

    return (
        <FormControl size="small" sx={{ minWidth: 120, width: 320 }}>
            <InputLabel id="dataset-select-label">
                {t('pages.statistics.charts.stacked-column.actions.data-selector.label')}
            </InputLabel>
            <Select
                labelId="dataset-select-label"
                value={currTable.key}
                label={t('pages.statistics.charts.stacked-column.actions.data-selector.label')}
                onChange={onTableChange}
            >
                {DEFAULT_DATA.map((d) => (
                    <MenuItem key={d.key} value={d.key}>
                        {d.key === 'empty' ? <strong>{d.table.title}</strong> : d.table.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
