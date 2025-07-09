import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React from 'react';
import { CloseIcon } from 'src/assets/icons/close-icon';
// import SvgIcon from 'src/components/svg-icon';

// Dynamically import JSXGraph to avoid SSR issues
const JXGBoard = dynamic(() => import('./jsxgraph-board'), { ssr: false });

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose, title, icon, boardProps, children }) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: { backgroundColor: 'background.default', p: 0 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: 1, borderColor: 'divider' }}>
        {/* Nếu muốn hiển thị icon truyền vào, hãy import và dùng trực tiếp component hoặc SVG tương ứng tại đây */}
        <Box component="span" sx={{ flexGrow: 1, fontWeight: 600, fontSize: 20 }}>
          {title}
        </Box>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, p: 0, height: '100%', width: '100%' }}>
        <JXGBoard {...boardProps} />
        {children}
      </Box>
    </Dialog>
  );
}

FullScreenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  icon: PropTypes.string,
  boardProps: PropTypes.object,
  children: PropTypes.node,
};
