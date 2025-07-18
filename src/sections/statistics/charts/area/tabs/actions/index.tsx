import type { GridColDef } from '@mui/x-data-grid';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Box, Alert, Snackbar, type SelectChangeEvent } from '@mui/material';

import { useMockedUser } from 'src/auth/hooks';

import { DATA_INPUT } from './data';
import { ChartDialog, ActionButtons, DatasetSelector, CustomColumnMenu } from './components';

import type { ChartDataItem, SavedChartItem } from './data';

const genUniqName = (baseName: string, existingNames: string[], isColumn: boolean = false) => {
    let newName = baseName;
    let counter = 1;

    const exists = isColumn
        ? (name: string) => existingNames.includes(name)
        : (name: string) => existingNames.includes(name);

    while (exists(newName)) {
        newName = `${baseName}${counter}`;
        counter++;
    }
    return newName;
};

export function ActionsTab() {
    const { user } = useMockedUser();

    const containerRef = useRef<HTMLDivElement>(null);

    const [dataGridHeight, setDataGridHeight] = useState(400);

    const [table, setTable] = useState<ChartDataItem>(DATA_INPUT[1]);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const [refreshTables, setRefreshTables] = useState(0);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const isSavedTable = useMemo(() => table.key.startsWith('saved-'), [table.key]);

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'label',
                headerName: table.chart.x,
                editable: true,
                type: 'string' as const,
            },
            ...table.chart.table.data.map(
                (dataset) =>
                    ({
                        field: dataset.k,
                        headerName: dataset.k,
                        editable: true,
                        type: 'number' as const,
                        valueParser: (value: any) => {
                            const parsed = parseFloat(value);
                            return isNaN(parsed) ? 0 : parsed;
                        },
                    }) as GridColDef
            ),
        ],
        [table]
    );

    const rows = useMemo(
        () =>
            table.chart.table.labels.map((label, index) => {
                const row: any = { id: index, label };
                table.chart.table.data.forEach((dataset) => {
                    row[dataset.k] = dataset.v[index] ?? 0;
                });
                return row;
            }),
        [table]
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

    const handleTableChange = useCallback(
        (event: SelectChangeEvent) => {
            const selectedKey = event.target.value;

            // Nếu chọn dữ liệu mẫu
            const sampleTable = DATA_INPUT.find((item) => item.key === selectedKey);
            if (sampleTable) {
                setTable(sampleTable);
                setSelectedRows([]);
                return;
            }

            // Nếu chọn dữ liệu đã lưu
            if (selectedKey.startsWith('saved-')) {
                const savedIndex = parseInt(selectedKey.split('-')[1], 10);
                if (!user) return;

                const key = `${user.id}_statistics.charts.pie`;
                const savedData = localStorage.getItem(key);
                if (savedData) {
                    const savedItems: SavedChartItem[] = JSON.parse(savedData);
                    const savedItem = savedItems.find((item) => item.index === savedIndex);
                    if (savedItem) {
                        // Tạo bản sao và gán key tạm thời
                        const savedTable = {
                            ...savedItem.data,
                            key: selectedKey, // Gán key tạm thời
                        };
                        setTable(savedTable);
                        setSelectedRows([]);
                    }
                }
            }
        },
        [user]
    );

    const handleProcessRowUpdate = useCallback((newRow: any, oldRow: any) => {
        const changedField = Object.keys(newRow).find((key) => newRow[key] !== oldRow[key]);
        if (!changedField) return oldRow;

        const rowIndex = oldRow.id;
        setTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;
            if (changedField === 'label') {
                updatedTable.chart.table.labels[rowIndex] = newRow.label; // Không kiểm tra isNaN cho label
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
        setTable((prev) => {
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
        setTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;

            const newLabel = genUniqName('y', updatedTable.chart.table.labels);

            updatedTable.chart.table.labels.push(newLabel);
            updatedTable.chart.table.data.forEach((dataset) => dataset.v.push(0));
            return updatedTable;
        });
    }, []);

    const handleAddNewColumn = useCallback(() => {
        setTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;

            const existingColumnNames = updatedTable.chart.table.data.map((ds) => ds.k);
            const newColumnName = genUniqName('x', existingColumnNames, true);

            updatedTable.chart.table.data.push({
                k: newColumnName,
                v: Array(updatedTable.chart.table.labels.length).fill(0),
            });
            return updatedTable;
        });
    }, []);

    const handleDeleteColumn = useCallback((field: string) => {
        setTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;
            updatedTable.chart.table.data = updatedTable.chart.table.data.filter(
                (dataset) => dataset.k !== field
            );
            return updatedTable;
        });
    }, []);

    const handleRenameColumn = useCallback((field: string, newName: string) => {
        setTable((prev) => {
            const updatedTable = JSON.parse(JSON.stringify(prev)) as ChartDataItem;

            if (field === 'label') {
                updatedTable.chart.x = newName;
            } else {
                const datasetIndex = updatedTable.chart.table.data.findIndex(
                    (dataset) => dataset.k === field
                );
                if (datasetIndex !== -1) updatedTable.chart.table.data[datasetIndex].k = newName;
            }

            return updatedTable;
        });
    }, []);

    const toggleDialog = useCallback(() => setOpenDialog((prev) => !prev), []);

    const handleSave = useCallback(
        (saveData: { title: string; xAxis: string; yAxis: string }, isUpdate: boolean = false) => {
            if (!user) {
                setSnackbar({
                    open: true,
                    message: 'Lưu thất bại: Người dùng không xác định',
                    severity: 'error',
                });
                return;
            }

            try {
                const key = `${user.id}_statistics.charts.pie`;
                const now = new Date().toISOString();

                const existingData = localStorage.getItem(key);
                const savedItems: Array<SavedChartItem> = existingData
                    ? JSON.parse(existingData)
                    : [];

                const tableToSave = JSON.parse(JSON.stringify(table)) as ChartDataItem;
                tableToSave.chart.title = saveData.title;
                tableToSave.chart.x = saveData.xAxis;
                tableToSave.chart.y = saveData.yAxis;

                const updatedTable = {
                    ...table,
                    chart: {
                        ...table.chart,
                        title: saveData.title,
                        x: saveData.xAxis,
                        y: saveData.yAxis,
                    },
                };

                // Xử lý cập nhật hoặc lưu mới
                if (isUpdate && isSavedTable) {
                    // Lấy index từ key (dạng 'saved-<index>')
                    const savedIndex = parseInt(table.key.split('-')[1], 10);

                    // Cập nhật bản đã lưu
                    const updatedItems = savedItems.map((item) =>
                        item.index === savedIndex
                            ? { ...item, data: tableToSave, savedAt: now }
                            : item
                    );

                    localStorage.setItem(key, JSON.stringify(updatedItems));

                    setTable(updatedTable);
                } else {
                    // Lưu mới
                    const newItem = {
                        data: tableToSave,
                        savedAt: now,
                        index:
                            savedItems.length > 0
                                ? Math.max(...savedItems.map((item) => item.index)) + 1
                                : 0,
                    };

                    const updatedItems = [newItem, ...savedItems];
                    localStorage.setItem(key, JSON.stringify(updatedItems));

                    setTable({
                        ...updatedTable,
                        key: `saved-${newItem.index}`,
                    });
                }

                setRefreshTables((prev) => prev + 1);

                setSnackbar({
                    open: true,
                    message: 'Dữ liệu đã được lưu thành công!',
                    severity: 'success',
                });
            } catch (error) {
                console.error('Lưu thất bại:', error);
                setSnackbar({
                    open: true,
                    message: `Lưu thất bại: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`,
                    severity: 'error',
                });
            }
        },
        [table, user, isSavedTable]
    );

    const tableFormData = useMemo(
        () => ({
            title: table.chart.title,
            xAxis: table.chart.x,
            yAxis: table.chart.y,
        }),
        [table]
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
                <DatasetSelector
                    currTable={table}
                    onTableChange={handleTableChange}
                    refreshTables={refreshTables}
                />
                <ActionButtons
                    selectedRows={selectedRows}
                    onDeleteSelected={handleDeleteSelected}
                    onAddNewRow={handleAddNewRow}
                    onAddNewColumn={handleAddNewColumn}
                    onSave={handleSave}
                    isSavedTable={isSavedTable}
                    tableData={tableFormData}
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
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        icon={false}
                        severity={snackbar.severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
            <ChartDialog open={openDialog} onClose={toggleDialog} chart={table} />
        </Box>
    );
}
