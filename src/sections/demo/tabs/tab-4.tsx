import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FullScreenDialog from 'src/components/graph-dialog/full-screen-dialog';

export default function Tab4() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tab 4 - Lorem Ipsum
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Hiển thị Đồ Thị JSXGraph
      </Button>
      <FullScreenDialog
        open={open}
        onClose={() => setOpen(false)}
        title="JSXGraph Demo"
        boardProps={{ boundingbox: [-5, 5, 5, -5], axis: true }}
      >
        {/* Nội dung phụ hoặc để trống cũng được */}
        <></>
      </FullScreenDialog>
      {/* ...content omitted for brevity... */}
    </Box>
  );
}
