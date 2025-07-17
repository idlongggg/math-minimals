import { Box, Button, Tooltip, IconButton } from '@mui/material';

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
                    variant="text"
                    size="medium"
                    color="error"
                    startIcon={<CloseIcon />}
                    onClick={onDeleteSelected}
                >
                    {t('pages.statistics.charts.area.actions.action-button.deleteSelected')}
                </Button>
            )}
            <Tooltip title={t('pages.statistics.charts.area.actions.action-button.addNewRow')}>
                <IconButton size="medium" color="success" onClick={onAddNewRow}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={t('pages.statistics.charts.area.actions.action-button.addNewColumn')}>
                <IconButton size="medium" color="success" onClick={onAddNewColumn}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={t('pages.statistics.charts.area.actions.action-button.viewChart')}>
                <IconButton size="medium" color="primary" onClick={onViewChart}>
                    <SearchSparkleIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
