import type { GridColDef } from '@mui/x-data-grid';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Box, type SelectChangeEvent } from '@mui/material';

import { DATA_INPUT } from './data';
import { ChartDialog, ActionButtons, DatasetSelector, CustomColumnMenu } from './components';

import type { ChartDataItem } from './data';

export function ActionsTab() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [dataGridHeight, setDataGridHeight] = useState(400);

    const [currTable, setCurrTable] = useState<ChartDataItem>(DATA_INPUT[1]);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'label',
                headerName: currTable.chart.x,
                editable: true,
            },
            ...currTable.chart.table.data.map((dataset) => ({
                field: dataset.k,
                headerName: dataset.k,
                editable: true,
            })),
        ],
        [currTable]
    );

    const rows = useMemo(
        () =>
            currTable.chart.table.labels.map((label, index) => {
                const row: any = { id: index, label };
                currTable.chart.table.data.forEach((dataset) => {
                    row[dataset.k] = dataset.v[index] ?? 0;
                });
                return row;
            }),
        [currTable]
    );

    useEffect(() => {
        const updateHeight = () => {
            const windowHeight = window.innerHeight;
            const containerHeight = containerRef.current?.getBoundingClientRect().top ?? 0;
            setDataGridHeight(windowHeight - containerHeight - 160);
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const handleTableChange = useCallback((event: SelectChangeEvent) => {
        const key = event.target.value;
        setCurrTable(DATA_INPUT.find((item) => item.key === key) || DATA_INPUT[0]);
        setSelectedRows([]);
    }, []);

    const handleProcessRowUpdate = useCallback((newRow: any, oldRow: any) => {
        const changedField = Object.keys(newRow).find((key) => newRow[key] !== oldRow[key]);
        if (!changedField) return oldRow;

        const rowIndex = oldRow.id;
        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;
            if (changedField === 'label') {
                const newLabel = newRow.label;
                if (!isNaN(newLabel)) updatedTable.chart.table.labels[rowIndex] = newLabel;
            } else {
                const datasetIndex = updatedTable.chart.table.data.findIndex(
                    (ds) => ds.k === changedField
                );
                if (datasetIndex !== -1) {
                    const newValue = parseFloat(newRow[changedField]);
                    if (!isNaN(newValue))
                        updatedTable.chart.table.data[datasetIndex].v[rowIndex] = newValue;
                }
            }
            return updatedTable;
        });
        return newRow;
    }, []);

    const handleDeleteSelected = useCallback(() => {
        if (!selectedRows.length) return;
        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;
            const keptIndices = prev.chart.table.labels
                .map((_, index) => index)
                .filter((index) => !selectedRows.includes(index));
            updatedTable.chart.table.labels = keptIndices.map(
                (index) => prev.chart.table.labels[index]
            );
            updatedTable.chart.table.data = prev.chart.table.data.map((dataset) => ({
                ...dataset,
                v: keptIndices.map((index) => dataset.v[index]),
            }));
            return updatedTable;
        });
        setSelectedRows([]);
    }, [selectedRows]);

    const handleAddNewRow = useCallback(() => {
        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;
            const lastLabel = updatedTable.chart.table.labels.at(-1) ?? 0;
            const newLabel = typeof lastLabel === 'number' ? lastLabel + 1 : 0;
            updatedTable.chart.table.labels.push(newLabel.toString());
            updatedTable.chart.table.data.forEach((dataset) => dataset.v.push(0));
            return updatedTable;
        });
    }, []);

    const handleAddNewColumn = useCallback(() => {
        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;
            let newColumnName = 'New Column';
            let counter = 1;
            while (updatedTable.chart.table.data.some((ds) => ds.k === newColumnName)) {
                newColumnName = `New Column ${counter++}`;
            }
            updatedTable.chart.table.data.push({
                k: newColumnName,
                v: Array(updatedTable.chart.table.labels.length).fill(0),
            });
            return updatedTable;
        });
    }, []);

    const handleDeleteColumn = useCallback((field: string) => {
        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;
            updatedTable.chart.table.data = updatedTable.chart.table.data.filter(
                (dataset) => dataset.k !== field
            );
            return updatedTable;
        });
    }, []);

    const handleRenameColumn = useCallback((field: string, newName: string) => {
        setCurrTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;
            const datasetIndex = updatedTable.chart.table.data.findIndex(
                (dataset) => dataset.k === field
            );
            if (datasetIndex !== -1) updatedTable.chart.table.data[datasetIndex].k = newName;
            return updatedTable;
        });
    }, []);

    const toggleDialog = useCallback(() => setOpenDialog((prev) => !prev), []);

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
                    onViewChart={toggleDialog}
                />
            </Box>
            <Box
                sx={{
                    height: dataGridHeight,
                    width: '100%',
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooter
                    checkboxSelection
                    disableColumnSorting
                    disableRowSelectionOnClick
                    processRowUpdate={handleProcessRowUpdate}
                    onProcessRowUpdateError={(error) => console.error(error)}
                    rowSelectionModel={selectedRows}
                    onRowSelectionModelChange={(newSelection) =>
                        setSelectedRows(newSelection as number[])
                    }
                    slots={{
                        columnMenu: (props) => (
                            <CustomColumnMenu
                                {...props}
                                onDeleteColumn={handleDeleteColumn}
                                onRenameColumn={handleRenameColumn}
                            />
                        ),
                    }}
                />
            </Box>
            <ChartDialog open={openDialog} onClose={toggleDialog} chart={currTable} />
        </Box>
    );
}
