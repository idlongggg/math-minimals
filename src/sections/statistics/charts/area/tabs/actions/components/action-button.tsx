import { Box, Button } from '@mui/material';

import { useLocales } from 'src/locales';
import { AddIcon, CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

interface ActionButtonsProps {
    selectedRows: number[];
    onDeleteSelected: () => void;
    onAddNewRow: () => void;
    onAddNewColumn: () => void;
    onViewChart: () => void;
}

export function ActionButtons({
    selectedRows,
    onDeleteSelected,
    onAddNewRow,
    onAddNewColumn,
    onViewChart,
}: ActionButtonsProps) {
    const { translate: t } = useLocales();

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {selectedRows.length > 0 && (
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<CloseIcon />}
                    onClick={onDeleteSelected}
                >
                    {t('pages.statistics.charts.area.actions.action-button.deleteSelected')}
                </Button>
            )}
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={onAddNewRow}
            >
                {t('pages.statistics.charts.area.actions.action-button.addNewRow')}
            </Button>
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={onAddNewColumn}
            >
                {t('pages.statistics.charts.area.actions.action-button.addNewColumn')}
            </Button>
            <Button
                variant="contained"
                color="primary"
                startIcon={<SearchSparkleIcon />}
                onClick={onViewChart}
            >
                {t('pages.statistics.charts.area.actions.action-button.viewChart')}
            </Button>
        </Box>
    );
}
