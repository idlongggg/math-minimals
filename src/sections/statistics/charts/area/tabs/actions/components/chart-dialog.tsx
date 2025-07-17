import type { TransitionProps } from '@mui/material/transitions';

import React from 'react';
import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Slide, AppBar, Button, Dialog, Toolbar, Typography, DialogContent } from '@mui/material';

import { useLocales } from 'src/locales';

import type { ChartDataItem } from '../data';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ChartDialogProps {
    open: boolean;
    onClose: () => void;
    chart: ChartDataItem;
}

export function ChartDialog({ open, onClose, chart }: ChartDialogProps) {
    const theme = useTheme();
    const { translate: t } = useLocales();

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            slots={{
                transition: Transition,
            }}
        >
            <AppBar position="relative">
                <Toolbar>
                    <Typography sx={{ flex: 1 }} variant="h6" component="div">
                        {chart.chart.title}
                    </Typography>
                    <Button autoFocus variant="contained" color="error" onClick={onClose}>
                        {t('pages.statistics.charts.area.actions.chart-dialog.close')}
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent sx={{ height: '100%', p: 0 }}>
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                    }}
                >
                    <Chart
                        type="area"
                        height="100%"
                        options={{
                            chart: {
                                toolbar: {
                                    show: false,
                                },
                                fontFamily: theme.typography.fontFamily,
                            },
                            dataLabels: {
                                enabled: false,
                            },
                            stroke: {
                                curve: 'straight',
                            },
                            xaxis: {
                                title: {
                                    text: chart.chart.x,
                                    style: {
                                        color: theme.vars.palette.text.primary,
                                    },
                                },
                                type: 'category',
                                labels: {
                                    style: {
                                        colors: theme.vars.palette.text.secondary,
                                    },
                                    formatter: (value: string) => value,
                                },
                            },
                            yaxis: {
                                title: {
                                    text: chart.chart.y,
                                    style: {
                                        color: theme.vars.palette.text.primary,
                                    },
                                },
                                labels: {
                                    style: {
                                        colors: theme.vars.palette.text.secondary,
                                    },
                                },
                            },
                            tooltip: {
                                theme: 'dark',
                            },
                            legend: {
                                labels: {
                                    colors: theme.vars.palette.text.primary,
                                },
                                markers: {
                                    shape: 'line',
                                },
                                itemMargin: {
                                    horizontal: 10,
                                    vertical: 5,
                                },
                            },
                        }}
                        series={chart.chart.table.data.map((dataset) => ({
                            name: dataset.k,
                            data: chart.chart.table.labels.map((label, index) => ({
                                x: label,
                                y: dataset.v[index],
                            })),
                        }))}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
