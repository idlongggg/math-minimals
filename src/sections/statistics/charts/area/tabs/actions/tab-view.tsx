import type { ApexOptions } from 'apexcharts';
import type { GridColDef } from '@mui/x-data-grid';
import type { SelectChangeEvent } from '@mui/material';

import React from 'react';

import Box from '@mui/material/Box';
import * as xDataGrid from '@mui/x-data-grid';

import ChartDialog from './components/chart-dialog';
import { DEFAULT_DATA } from './data/data-constants';
import ActionButtons from './components/action-button';
import DatasetSelector from './components/dataset-selector';

import type { DataItem } from './data/data-constants';

export default function ActionsTab() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [dataGridHeight, setDataGridHeight] = React.useState(400);
    const [currTable, setCurrTable] = React.useState<DataItem>(DEFAULT_DATA[1]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

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
        setSelectedRows([]);
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

    const handleDeleteSelected = React.useCallback(() => {
        if (selectedRows.length === 0) return;

        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as DataItem;
            const keptIndices = prev.table.data.labels
                .map((_, index) => index)
                .filter((index) => !selectedRows.includes(index));

            updatedTable.table.data.labels = keptIndices.map(
                (index) => prev.table.data.labels[index]
            );

            updatedTable.table.data.datasets = prev.table.data.datasets.map((dataset) => ({
                ...dataset,
                data: keptIndices.map((index) => dataset.data[index]),
            }));

            return updatedTable;
        });

        setSelectedRows([]);
    }, [selectedRows]);

    const handleAddNewRow = React.useCallback(() => {
        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as DataItem;

            const lastLabel =
                updatedTable.table.data.labels.length > 0
                    ? updatedTable.table.data.labels[updatedTable.table.data.labels.length - 1]
                    : 0;
            const newLabel = typeof lastLabel === 'number' ? lastLabel + 1 : 0;

            updatedTable.table.data.labels.push(newLabel);

            updatedTable.table.data.datasets.forEach((dataset) => {
                dataset.data.push(0);
            });

            return updatedTable;
        });
    }, []);

    const handleAddNewColumn = React.useCallback(() => {
        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as DataItem;

            const baseName = 'New Column';
            let newColumnName = baseName;
            let counter = 1;

            while (updatedTable.table.data.datasets.some((ds) => ds.label === newColumnName)) {
                newColumnName = `${baseName} ${counter++}`;
            }

            const newDataset = {
                label: newColumnName,
                data: Array(updatedTable.table.data.labels.length).fill(0),
            };

            updatedTable.table.data.datasets.push(newDataset);

            return updatedTable;
        });
    }, []);

    const handleOpenDialog = () => {
        console.log('Open dialog for chart view', currTable);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const chartOptions: ApexOptions = React.useMemo(
        () => ({
            chart: {
                type: 'area',
                zoom: { enabled: false },
                toolbar: { show: false },
                fontFamily: 'inherit',
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth' },
            xaxis: {
                title: { text: currTable.table.xTitle },
                type: 'numeric',
                labels: {
                    formatter: (value: string, _timestamp?: number, _opts?: any) =>
                        value.toString(),
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
                <DatasetSelector currTable={currTable} onTableChange={handleTableChange} />

                <ActionButtons
                    selectedRows={selectedRows}
                    onDeleteSelected={handleDeleteSelected}
                    onAddNewRow={handleAddNewRow}
                    onAddNewColumn={handleAddNewColumn}
                    onViewChart={handleOpenDialog}
                />
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
                    rowSelectionModel={selectedRows}
                    onRowSelectionModelChange={(newSelection) => {
                        setSelectedRows(newSelection as number[]);
                    }}
                />
            </Box>

            <ChartDialog
                open={openDialog}
                onClose={handleCloseDialog}
                currTable={currTable}
                chartOptions={chartOptions}
                chartSeries={chartSeries}
            />
        </Box>
    );
}
