import type { TransitionProps } from '@mui/material/transitions';

import dynamic from 'next/dynamic';
import React from 'react';

import {
    AppBar,
    Button,
    Dialog,
    DialogContent, Slide,
    Toolbar,
    Typography
} from '@mui/material';
import Box from '@mui/material/Box';

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
            <AppBar position='relative'>
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
                                fontFamily: 'inherit',
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
                                },
                                type: 'category',
                                labels: {
                                    formatter: (value: string) => value,
                                },
                            },
                            yaxis: {
                                title: {
                                    text: chart.chart.y,
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
