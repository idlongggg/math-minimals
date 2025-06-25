'use client';

import { Fab, Tooltip, Zoom } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useMathKeyboard } from 'src/contexts/math-keyboard-context';

// ----------------------------------------------------------------------

export interface MathKeyboardFabProps {
  onClick?: () => void;
  sx?: object;
}

export function MathKeyboardFab({ onClick, sx, ...other }: MathKeyboardFabProps) {
  const { isVisible, onToggle } = useMathKeyboard();

  const handleClick = () => {
    onToggle();
    if (onClick) {
      onClick();
    }
  };

  return (
    <Zoom in={isVisible}>
      <Tooltip title="Bàn Phím Toán Học" placement="left">
        <Fab
          color="primary"
          aria-label="bàn phím toán học"
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
