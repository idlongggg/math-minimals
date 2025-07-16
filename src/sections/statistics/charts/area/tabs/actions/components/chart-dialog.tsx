import type { TransitionProps } from '@mui/material/transitions';
import type { ApexOptions } from 'apexcharts';

import dynamic from 'next/dynamic';
import React from 'react';

import { Slide } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { CloseIcon } from 'src/assets/icons';

import type { DataItem } from '../data-constants';

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
                        Close
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
