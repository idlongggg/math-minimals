import type { SelectChangeEvent } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import type { GridColDef } from '@mui/x-data-grid';

import dynamic from 'next/dynamic'; // Thêm dòng này
import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as xDataGrid from '@mui/x-data-grid';

import { AddIcon, CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

import { DEFAULT_DATA } from './data-constants';

import type { DataItem } from './data-constants';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ActionsTab() {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [dataGridHeight, setDataGridHeight] = React.useState(400);

    const [currTable, setCurrTable] = React.useState<DataItem>(DEFAULT_DATA[0]);

    const [openDialog, setOpenDialog] = React.useState(false);

    const columns: GridColDef[] = [
        {
            field: 'label',
            headerName: currTable.table.xTitle,
            editable: true,
        },
        ...currTable.table.data.datasets.map((dataset) => ({
            field: dataset.label,
            headerName: dataset.label,
            editable: true,
        })),
    ];

    const rows = currTable.table.data.labels.map((label, index) => {
        const row: any = { id: index, label };
        currTable.table.data.datasets.forEach((dataset) => {
            row[dataset.label] = dataset.data[index] ?? 0;
        });
        return row;
    });

    React.useEffect(() => {
        function updateHeight() {
            const windowHeight = window.innerHeight;
            let containerHeight = 0;
            if (containerRef.current) {
                containerHeight = containerRef.current.getBoundingClientRect().top;
            }
            setDataGridHeight(windowHeight - containerHeight - 160);
        }
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const handleTableChange = (event: SelectChangeEvent) => {
        const key = event.target.value;
        setCurrTable(DEFAULT_DATA.find((item) => item.key === key) || DEFAULT_DATA[0]);
    };

    const handleProcessRowUpdate = React.useCallback((newRow: any, oldRow: any) => {
        const changedField = Object.keys(newRow).find((key) => newRow[key] !== oldRow[key]);
        if (!changedField) {
            return oldRow;
        }
        const rowIndex = oldRow.id;
        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as DataItem;
            if (changedField === 'label') {
                const newLabel = parseFloat(newRow.label);
                if (!isNaN(newLabel)) {
                    updatedTable.table.data.labels[rowIndex] = newLabel;
                }
            } else {
                const datasetIndex = updatedTable.table.data.datasets.findIndex(
                    (ds) => ds.label === changedField
                );
                if (datasetIndex !== -1) {
                    const newValue = parseFloat(newRow[changedField]);
                    if (!isNaN(newValue)) {
                        updatedTable.table.data.datasets[datasetIndex].data[rowIndex] = newValue;
                    }
                }
            }
            return updatedTable;
        });
        return newRow;
    }, []);

    const handleOpenDialog = () => {
        console.log('Open dialog for chart view', currTable);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const chartOptions = React.useMemo(
        () => ({
            chart: {
                type: 'area',
                zoom: { enabled: false },
                toolbar: { show: false },
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth' },
            xaxis: {
                title: { text: currTable.table.xTitle },
                type: 'numeric',
                labels: {
                    formatter: (val: number) => val.toString(),
                },
            },
            yaxis: {
                title: { text: currTable.table.yTitle },
            },
        }),
        [currTable]
    );

    const chartSeries = React.useMemo(
        () =>
            currTable.table.data.datasets.map((dataset) => ({
                name: dataset.label,
                data: currTable.table.data.labels.map((label, index) => ({
                    x: label,
                    y: dataset.data[index],
                })),
            })),
        [currTable]
    );

    return (
        <Box ref={containerRef}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                }}
            >
                <FormControl size="small" sx={{ minWidth: 120, width: 320 }}>
                    <InputLabel id="dataset-select-label">Dữ liệu</InputLabel>
                    <Select
                        labelId="dataset-select-label"
                        value={currTable.key}
                        label="Dataset"
                        onChange={handleTableChange}
                    >
                        {DEFAULT_DATA.map((d) => (
                            <MenuItem key={d.key} value={d.key}>
                                {d.key === 'empty' ? <em>{d.table.title}</em> : d.table.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="error" startIcon={<CloseIcon />}>
                        Delete selected
                    </Button>
                    <Button variant="contained" color="success" startIcon={<AddIcon />}>
                        Add new row
                    </Button>
                    <Button variant="contained" color="success" startIcon={<AddIcon />}>
                        Add new column
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SearchSparkleIcon />}
                        onClick={handleOpenDialog}
                    >
                        View chart
                    </Button>
                </Box>
            </Box>

            <Box sx={{ height: dataGridHeight, width: '100%' }}>
                <xDataGrid.DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooter
                    checkboxSelection
                    disableRowSelectionOnClick
                    processRowUpdate={handleProcessRowUpdate}
                    onProcessRowUpdateError={(error) => console.error(error)}
                />
            </Box>

            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleCloseDialog}
                slots={{
                    transition: Transition,
                }}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDialog}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {currTable.table.title}
                        </Typography>
                        <Button
                            autoFocus
                            variant="contained"
                            color="error"
                            onClick={handleCloseDialog}
                        >
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
                                options={chartOptions as any}
                                series={chartSeries}
                                type="area"
                                height="100%"
                            />
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
