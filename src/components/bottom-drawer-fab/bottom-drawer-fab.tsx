'use client';

import { Fab, Zoom, Tooltip } from '@mui/material';

import { useBottomDrawer } from 'src/contexts/bottom-drawer-context';

import { Iconify } from 'src/components/iconify';

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
