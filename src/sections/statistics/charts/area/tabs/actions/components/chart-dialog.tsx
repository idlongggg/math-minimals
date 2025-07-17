import type { ApexOptions } from 'apexcharts';
import type { TransitionProps } from '@mui/material/transitions';

import React from 'react';
import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import { Slide } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';

import { useLocales } from 'src/locales';
import { CloseIcon } from 'src/assets/icons';

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
    currTable: ChartDataItem;
    chartOptions: ApexOptions;
    chartSeries: { name: string; data: { x: string; y: number }[] }[];
}

export function ChartDialog({
    open,
    onClose,
    currTable,
    chartOptions,
    chartSeries,
}: ChartDialogProps) {
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
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {currTable.chart.title}
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
                        boxSizing: 'border-box',
                    }}
                >
                    {Chart && (
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="area"
                            height="100%"
                        />
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
