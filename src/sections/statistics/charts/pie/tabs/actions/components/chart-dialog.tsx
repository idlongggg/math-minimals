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

import type { DataItem } from '../data/data-constants';

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
    currTable: DataItem;
    chartOptions: ApexOptions;
    chartSeries: { name: string; data: { x: number; y: number }[] }[];
}

export default function ChartDialog({
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
                        {currTable.table.title}
                    </Typography>
                    <Button autoFocus variant="contained" color="error" onClick={onClose}>
                        {t('pages.statistics.charts.pie.actions.chart-dialog.close')}
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
                            type="pie"
                            height="100%"
                        />
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
