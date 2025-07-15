import type { ApexOptions } from 'apexcharts';
import type { GridColDef } from '@mui/x-data-grid';
import type { SelectChangeEvent } from '@mui/material';

import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as xDataGrid from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { AddIcon, CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

import ChartDialog from './chart-dialog';
import { DEFAULT_DATA } from './data-constants';

import type { DataItem } from './data-constants';

export default function ActionsTab() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [dataGridHeight, setDataGridHeight] = React.useState(400);
    const [currTable, setCurrTable] = React.useState<DataItem>(DEFAULT_DATA[1]);
    const [openDialog, setOpenDialog] = React.useState(false);
    // Thêm state để lưu các hàng được chọn
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
        // Reset selection khi chuyển bảng
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

    // Hàm xử lý xóa các hàng được chọn
    const handleDeleteSelected = React.useCallback(() => {
        if (selectedRows.length === 0) return;

        setCurrTable((prev) => {
            // Tạo bản sao sâu của dữ liệu hiện tại
            const updatedTable = JSON.parse(JSON.stringify(prev)) as DataItem;

            // Lọc ra các chỉ mục không được chọn
            const keptIndices = prev.table.data.labels
                .map((_, index) => index)
                .filter((index) => !selectedRows.includes(index));

            // Cập nhật labels - chỉ giữ lại các hàng không bị chọn
            updatedTable.table.data.labels = keptIndices.map(
                (index) => prev.table.data.labels[index]
            );

            // Cập nhật datasets - chỉ giữ lại dữ liệu từ các hàng không bị chọn
            updatedTable.table.data.datasets = prev.table.data.datasets.map((dataset) => ({
                ...dataset,
                data: keptIndices.map((index) => dataset.data[index]),
            }));

            return updatedTable;
        });

        // Reset selection sau khi xóa
        setSelectedRows([]);
    }, [selectedRows]);

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
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<CloseIcon />}
                        onClick={handleDeleteSelected}
                        disabled={selectedRows.length === 0}
                    >
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
                    // Thêm xử lý chọn hàng
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
