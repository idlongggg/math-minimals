import type { GridColDef } from '@mui/x-data-grid';
import type { SelectChangeEvent } from '@mui/material';

import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { AddIcon, CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

import { DEFAULT_DATA } from './data-constants';

import type { DataItem } from './data-constants';

export default function ActionsTab() {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [dataGridHeight, setDataGridHeight] = React.useState(400);

    const [currTable, setCurrTable] = React.useState<DataItem>(DEFAULT_DATA[0]);

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
        // Tìm trường dữ liệu bị thay đổi
        const changedField = Object.keys(newRow).find((key) => newRow[key] !== oldRow[key]);

        if (!changedField) return oldRow;

        const rowIndex = oldRow.id;

        // Cập nhật state sử dụng functional update
        setCurrTable((prev) => {
            // Tạo bản sao sâu của state hiện tại
            const updatedTable = JSON.parse(JSON.stringify(prev)) as DataItem;

            if (changedField === 'label') {
                // Cập nhật nhãn
                updatedTable.table.data.labels[rowIndex] = newRow.label;
            } else {
                // Cập nhật dữ liệu dataset
                const datasetIndex = updatedTable.table.data.datasets.findIndex(
                    (ds) => ds.label === changedField
                );

                if (datasetIndex !== -1) {
                    updatedTable.table.data.datasets[datasetIndex].data[rowIndex] =
                        newRow[changedField];
                }
            }

            return updatedTable;
        });

        return newRow;
    }, []);

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
                    <Button variant="contained" color="primary" startIcon={<SearchSparkleIcon />}>
                        View chart
                    </Button>
                </Box>
            </Box>

            <Box sx={{ height: dataGridHeight, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooter
                    checkboxSelection
                    disableRowSelectionOnClick
                    processRowUpdate={handleProcessRowUpdate}
                />
            </Box>
        </Box>
    );
}
