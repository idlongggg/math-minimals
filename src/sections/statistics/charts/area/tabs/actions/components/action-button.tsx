import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { AddIcon, CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

interface ActionButtonsProps {
    selectedRows: number[];
    onDeleteSelected: () => void;
    onAddNewRow: () => void;
    onAddNewColumn: () => void;
    onViewChart: () => void;
}

export default function ActionButtons({
    selectedRows,
    onDeleteSelected,
    onAddNewRow,
    onAddNewColumn,
    onViewChart,
}: ActionButtonsProps) {
    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {selectedRows.length > 0 && (
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<CloseIcon />}
                    onClick={onDeleteSelected}
                >
                    Delete selected
                </Button>
            )}
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={onAddNewRow}
            >
                Add new row
            </Button>
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={onAddNewColumn}
            >
                Add new column
            </Button>
            <Button
                variant="contained"
                color="primary"
                startIcon={<SearchSparkleIcon />}
                onClick={onViewChart}
            >
                View chart
            </Button>
        </Box>
    );
}
