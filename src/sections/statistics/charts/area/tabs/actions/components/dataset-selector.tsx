import type { SelectChangeEvent } from '@mui/material';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { DEFAULT_DATA } from '../data/data-constants';

import type { DataItem } from '../data/data-constants';

interface DatasetSelectorProps {
    currTable: DataItem;
    onTableChange: (event: SelectChangeEvent) => void;
}

export default function DatasetSelector({ currTable, onTableChange }: DatasetSelectorProps) {
    return (
        <FormControl size="small" sx={{ minWidth: 120, width: 320 }}>
            <InputLabel id="dataset-select-label">Dữ liệu</InputLabel>
            <Select
                labelId="dataset-select-label"
                value={currTable.key}
                label="Dataset"
                onChange={onTableChange}
            >
                {DEFAULT_DATA.map((d) => (
                    <MenuItem key={d.key} value={d.key}>
                        {d.key === 'empty' ? <em>{d.table.title}</em> : d.table.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
