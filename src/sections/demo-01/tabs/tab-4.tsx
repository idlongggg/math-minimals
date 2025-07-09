
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
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
        icon="/assets/icons/close.svg"
        boardProps={{ boundingbox: [-5, 5, 5, -5], axis: true }}
      >
        {/* Nội dung phụ hoặc để trống cũng được */}
        <></>
      </FullScreenDialog>

      <Typography paragraph>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      </Typography>

      <Typography paragraph>
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      </Typography>

      <Typography paragraph>Aenean lacinia bibendum nulla sed consectetur.</Typography>

      <Typography paragraph>Etiam porta sem malesuada magna mollis euismod.</Typography>
    </Box>
  );
}
