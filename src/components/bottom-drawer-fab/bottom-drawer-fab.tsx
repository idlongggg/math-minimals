'use client';

import { Fab, Tooltip, Zoom } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useBottomDrawer } from 'src/contexts/bottom-drawer-context';

// ----------------------------------------------------------------------

export interface BottomDrawerFabProps {
  onClick?: () => void;
  sx?: object;
}

export function BottomDrawerFab({ onClick, sx, ...other }: BottomDrawerFabProps) {
  const { isVisible, onToggle } = useBottomDrawer();

  const handleClick = () => {
    onToggle();
    if (onClick) {
      onClick();
    }
  };

  // Tạm thời ẩn FAB button
  return (
    <Zoom in={false}>
      <Tooltip title="Mở Drawer" placement="left">
        <Fab
          color="primary"
          aria-label="mở drawer"
          onClick={handleClick}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1300,
            ...sx,
          }}
          {...other}
        >
          <Iconify icon="solar:pen-bold" width={24} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
