import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { AddIcon, CloseIcon, SearchSparkleIcon } from 'src/assets/icons';

export default function ActionsTab() {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [dataGridHeight, setDataGridHeight] = React.useState(400);

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
                {/* Form control here */}
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

            <Box sx={{ height: dataGridHeight, width: '100%' }}>{/* DataGrid here */}</Box>
        </Box>
    );
}
