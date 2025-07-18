import { useState, useEffect } from 'react';

import {
    Box,
    Card,
    Stack,
    Button,
    Popover,
    Tooltip,
    TextField,
    IconButton,
    Typography,
    CardActions,
    CardContent,
} from '@mui/material';

import { useLocales } from 'src/locales';
import { EditIcon, CloseIcon } from 'src/assets/icons';

import { useMockedUser } from 'src/auth/hooks';

import type { ChartDataItem, SavedChartItem } from '../../data';

export function HistoryTab() {
    const { translate: t } = useLocales();
    const { user } = useMockedUser();
    const [savedCharts, setSavedCharts] = useState<SavedChartItem[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [saveData, setSaveData] = useState({ title: '', xAxis: '', yAxis: '' });
    const [selectedChart, setSelectedChart] = useState<ChartDataItem | null>(null);

    useEffect(() => {
        if (user) {
            const key = `${user.id}_statistics.charts.area`;
            const savedData = localStorage.getItem(key);
            if (savedData) {
                setSavedCharts(JSON.parse(savedData));
            }
        }
    }, [user]);

    const handleSelectChart = (index: number) => {
        if (user) {
            const key = `${user.id}_statistics.charts.area`;
            const savedData = localStorage.getItem(key);
            if (savedData) {
                const charts = JSON.parse(savedData) as SavedChartItem[];
                const chart = charts.find((item) => item.index === index);
                if (chart) {
                    setSelectedChart({ ...chart.data, key: `saved-${chart.index}` });
                }
            }
        }
    };

    const handleOpenPopover = (
        event: React.MouseEvent<HTMLButtonElement>,
        chart: SavedChartItem
    ) => {
        setAnchorEl(event.currentTarget);
        setEditIndex(chart.index);
        setSaveData({
            title: chart.data.chart.title,
            xAxis: chart.data.chart.x,
            yAxis: chart.data.chart.y,
        });
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setEditIndex(null);
    };

    const handleDelete = (index: number) => {
        if (user) {
            const key = `${user.id}_statistics.charts.area`;
            const savedData = localStorage.getItem(key);
            if (savedData) {
                const charts = JSON.parse(savedData) as SavedChartItem[];
                const updatedCharts = charts.filter((item) => item.index !== index);
                localStorage.setItem(key, JSON.stringify(updatedCharts));
                setSavedCharts(updatedCharts);
                if (selectedChart && selectedChart.key === `saved-${index}`) {
                    setSelectedChart(null);
                }
            }
        }
    };

    const handleUpdate = () => {
        if (user && editIndex !== null) {
            const key = `${user.id}_statistics.charts.area`;
            const savedData = localStorage.getItem(key);
            if (savedData) {
                const charts = JSON.parse(savedData) as SavedChartItem[];
                const updatedCharts = charts.map((item) =>
                    item.index === editIndex
                        ? {
                              ...item,
                              data: {
                                  ...item.data,
                                  chart: {
                                      ...item.data.chart,
                                      title: saveData.title,
                                      xAxis: saveData.xAxis,
                                      yAxis: saveData.yAxis,
                                  },
                              },
                              savedAt: new Date().toISOString(),
                          }
                        : item
                );
                localStorage.setItem(key, JSON.stringify(updatedCharts));
                setSavedCharts(updatedCharts);
                if (selectedChart && selectedChart.key === `saved-${editIndex}`) {
                    setSelectedChart({
                        ...selectedChart,
                        chart: {
                            ...selectedChart.chart,
                            title: saveData.title,
                            x: saveData.xAxis,
                            y: saveData.yAxis,
                        },
                    });
                }
                handleClosePopover();
            }
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'edit-popover' : undefined;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {t('pages.statistics.charts.area.history.title')}
            </Typography>
            {savedCharts.length === 0 ? (
                <Typography>{t('pages.statistics.charts.area.history.empty')}</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {savedCharts.map((chart) => (
                        <Card
                            key={chart.index}
                            onClick={() => handleSelectChart(chart.index)}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 3,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{chart.data.chart.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('pages.statistics.charts.area.actions.save-form.x-axis')}
                                        : {chart.data.chart.x}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('pages.statistics.charts.area.actions.save-form.y-axis')}
                                        : {chart.data.chart.y}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('pages.statistics.charts.area.history.createdAt')}:{' '}
                                        {new Date(chart.savedAt).toLocaleString()}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ p: 2 }}>
                                    <Tooltip
                                        title={t(
                                            'pages.statistics.charts.area.actions.action-button.edit'
                                        )}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleOpenPopover(e, chart)}
                                            aria-describedby={id}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        title={t(
                                            'pages.statistics.charts.area.actions.action-button.delete'
                                        )}
                                    >
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(chart.index)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Box>
                        </Card>
                    ))}
                </Box>
            )}

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" color="primary" onClick={handleUpdate}>
                                {t('pages.statistics.charts.area.actions.save-form.update-button')}
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Popover>
        </Box>
    );
}
