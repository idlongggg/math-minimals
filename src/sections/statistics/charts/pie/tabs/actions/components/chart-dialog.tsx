import type { ApexOptions } from 'apexcharts';
import type { TransitionProps } from '@mui/material/transitions';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Slide } from '@mui/material';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';

import { useLocales } from 'src/locales';
import { CloseIcon } from 'src/assets/icons';

import type { DataItem } from '../data/data-constants';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<unknown> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ChartDialogProps {
    open: boolean;
    onClose: () => void;
    currTable: DataItem;
    chartOptions: ApexOptions;
}

export default function ChartDialog({ open, onClose, currTable, chartOptions }: ChartDialogProps) {
    const { translate: t } = useLocales();
    const [selectedLabel, setSelectedLabel] = useState<string>(
        currTable.table.data.labels.length > 0 ? currTable.table.data.labels[0].toString() : ''
    );

    useEffect(() => {
        setSelectedLabel(
            currTable.table.data.labels.length > 0 ? currTable.table.data.labels[0].toString() : ''
        );
    }, [currTable]);

    const series = selectedLabel
        ? currTable.table.data.datasets
              .map((dataset) => {
                  const index = currTable.table.data.labels.findIndex(
                      (label) => label.toString() === selectedLabel
                  );
                  return index !== -1 ? dataset.data[index] || 0 : 0;
              })
              .filter((value) => value > 0)
        : currTable.table.data.datasets
              .map((dataset) => dataset.data.reduce((acc, val) => acc + (val || 0), 0))
              .filter((value) => value > 0);

    return (
        <Dialog fullScreen open={open} onClose={onClose} slots={{ transition: Transition }}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ flexGrow: 1, justifyContent: 'space-between' }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={onClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" component="div">
                                {currTable.table.title}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <InputLabel>{currTable.table.xTitle}</InputLabel>
                                <Select
                                    value={selectedLabel}
                                    onChange={(e) => setSelectedLabel(e.target.value)}
                                    label={currTable.table.xTitle}
                                >
                                    {currTable.table.data.labels.map((label, idx) => (
                                        <MenuItem key={idx} value={label.toString()}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button autoFocus variant="contained" color="error" onClick={onClose}>
                                {t('pages.statistics.charts.pie.actions.chart-dialog.close')}
                            </Button>
                        </Stack>
                    </Stack>
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
                        <Chart options={chartOptions} series={series} type="pie" height="100%" />
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
