import { useState, useEffect } from 'react';

import {
    Box,
    Select,
    Divider,
    MenuItem,
    InputLabel,
    FormControl,
    type SelectChangeEvent,
} from '@mui/material';

import { useLocales } from 'src/locales';

import { useMockedUser } from 'src/auth/hooks';

import { DATA_INPUT } from '../data';

import type { ChartDataItem, SavedChartItem } from '../data';

interface DatasetSelectorProps {
    currTable: ChartDataItem;
    onTableChange: (event: SelectChangeEvent) => void;
    refreshTables?: number;
}

export function DatasetSelector({ currTable, onTableChange, refreshTables }: DatasetSelectorProps) {
    const { translate: t } = useLocales();
    const [savedTables, setSavedTables] = useState<SavedChartItem[]>([]);
    const { user } = useMockedUser();

    useEffect(() => {
        if (!user) {
            setSavedTables([]);
            return;
        }

        const key = `${user.id}_statistics.charts.pie`;
        const savedData = localStorage.getItem(key);

        if (savedData) {
            try {
                const parsedData: SavedChartItem[] = JSON.parse(savedData);
                setSavedTables(parsedData);
            } catch (error) {
                console.error('Failed to parse saved tables', error);
            }
        } else {
            setSavedTables([]);
        }
    }, [user, refreshTables]);

    const emptyTable = DATA_INPUT.find((d) => d.key === 'empty');

    const sampleTables = DATA_INPUT.filter((d) => d.key !== 'empty');

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
                MenuProps={{
                    PaperProps: {
                        sx: {
                            maxHeight: 300,
                        },
                    },
                }}
            >
                {emptyTable && (
                    <MenuItem key={emptyTable.key} value={emptyTable.key}>
                        <Box component="span" fontStyle="italic">
                            {emptyTable.chart.title}
                        </Box>
                    </MenuItem>
                )}

                <Divider />

                {sampleTables.map((d) => (
                    <MenuItem key={d.key} value={d.key}>
                        {d.chart.title}
                    </MenuItem>
                ))}

                {savedTables.length > 0 && <Divider />}

                {savedTables.map((savedItem: SavedChartItem) => {
                    const key = `saved-${savedItem.index}`;
                    return (
                        <MenuItem key={key} value={key}>
                            {savedItem.data.chart.title}
                            <Box
                                component="span"
                                sx={{ ml: 1, color: 'text.secondary', fontSize: '0.75rem' }}
                            >
                                ({new Date(savedItem.savedAt).toLocaleDateString()})
                            </Box>
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
