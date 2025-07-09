import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import { CloseIcon } from 'src/assets/icons/close-icon';

// Dynamically import JSXGraph to avoid SSR issues
const JXGBoard = dynamic(() => import('./jsxgraph-board'), { ssr: false });

FullScreenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  boardProps: PropTypes.object,
  children: PropTypes.node,
};

export default function FullScreenDialog({ open, onClose, title, boardProps, children }) {
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box component="span" sx={{ flexGrow: 1, fontWeight: 600, fontSize: 20 }}>
          {title}
        </Box>
        <Button color="error" onClick={onClose} endIcon={<CloseIcon />}>
          Thoát
        </Button>
      </Box>
      <Box sx={{ flex: 1, p: 0, height: '100%', width: '100%' }}>
        <JXGBoard {...boardProps} />
        {children}
      </Box>
    </Dialog>
  );
}
