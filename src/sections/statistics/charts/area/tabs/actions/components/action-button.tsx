import { useState } from 'react';

import { Box, Stack, Button, Popover, Tooltip, TextField, IconButton } from '@mui/material';

import { useLocales } from 'src/locales';
import { AddIcon, SaveIcon, CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

interface ActionButtonsProps {
    selectedRows: number[];
    onDeleteSelected: () => void;
    onAddNewRow: () => void;
    onAddNewColumn: () => void;
    onViewChart: () => void;
    onSave: (saveData: { title: string; xAxis: string; yAxis: string }, isUpdate: boolean) => void;
    isSavedTable: boolean;
    tableData: {
        title: string;
        xAxis: string;
        yAxis: string;
    };
}

export function ActionButtons({
    selectedRows,
    onDeleteSelected,
    onAddNewRow,
    onAddNewColumn,
    onViewChart,
    onSave,
    isSavedTable,
    tableData,
}: ActionButtonsProps) {
    const { translate: t } = useLocales();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [saveData, setSaveData] = useState({
        title: tableData.title,
        xAxis: tableData.xAxis,
        yAxis: tableData.yAxis,
    });

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setSaveData({
            title: tableData.title,
            xAxis: tableData.xAxis,
            yAxis: tableData.yAxis,
        });
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'save-popover' : undefined;

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {selectedRows.length > 0 && (
                <Button
                    variant="outlined"
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
            <Tooltip title={t('pages.statistics.charts.area.actions.action-button.save')}>
                <IconButton
                    size="medium"
                    color="info"
                    onClick={handleOpenPopover}
                    aria-describedby={id}
                >
                    <SaveIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={t('pages.statistics.charts.area.actions.action-button.viewChart')}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SearchSparkleIcon />}
                    onClick={onViewChart}
                >
                    {t('pages.statistics.charts.area.actions.action-button.viewChart')}
                </Button>
            </Tooltip>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ p: 3, minWidth: 300 }}>
                    <Stack spacing={2}>
                        <TextField
                            label={t('pages.statistics.charts.area.actions.save-form.title')}
                            value={saveData.title}
                            onChange={(e) => setSaveData({ ...saveData, title: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label={t('pages.statistics.charts.area.actions.save-form.x-axis')}
                            value={saveData.xAxis}
                            onChange={(e) => setSaveData({ ...saveData, xAxis: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label={t('pages.statistics.charts.area.actions.save-form.y-axis')}
                            value={saveData.yAxis}
                            onChange={(e) => setSaveData({ ...saveData, yAxis: e.target.value })}
                            fullWidth
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                justifyContent: isSavedTable ? 'space-between' : 'flex-end',
                            }}
                        >
                            {isSavedTable && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        onSave(saveData, true); // Truyền isUpdate=true
                                        handleClosePopover();
                                    }}
                                >
                                    {t(
                                        'pages.statistics.charts.area.actions.save-form.update-button'
                                    )}
                                </Button>
                            )}
                            <Button
                                variant={isSavedTable ? 'outlined' : 'contained'}
                                color="primary"
                                onClick={() => {
                                    onSave(saveData, false); // Truyền isUpdate=false
                                    handleClosePopover();
                                }}
                            >
                                {isSavedTable
                                    ? t(
                                          'pages.statistics.charts.area.actions.save-form.save-as-new-button'
                                      )
                                    : t(
                                          'pages.statistics.charts.area.actions.save-form.save-button'
                                      )}
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Popover>
        </Box>
    );
}
