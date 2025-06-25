'use client';

import type { SxProps, Theme } from '@mui/material/styles';

import { AnimatePresence, m } from 'framer-motion';
import { useCallback, useState } from 'react';

import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';

import { transitionTap, varHover, varTap } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';

import { MathKeyboard } from './math-keyboard';

// ----------------------------------------------------------------------

export type MathFabButtonProps = {
  onInsert?: (symbol: string) => void;
  sx?: SxProps<Theme>;
};

// ----------------------------------------------------------------------

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  zIndex: theme.zIndex.speedDial,
  background: `linear-gradient(135deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.primary.dark} 100%)`,
  color: theme.vars.palette.primary.contrastText,
  boxShadow: theme.customShadows?.primary || theme.shadows[12],
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.vars.palette.primary.dark} 0%, ${theme.vars.palette.primary.main} 100%)`,
    boxShadow: theme.customShadows?.primary || theme.shadows[16],
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));

// ----------------------------------------------------------------------

export function MathFabButton({ onInsert, sx }: MathFabButtonProps) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleToggleKeyboard = useCallback(() => {
    setKeyboardOpen((prev) => !prev);
  }, []);

  const handleCloseKeyboard = useCallback(() => {
    setKeyboardOpen(false);
  }, []);

  const handleInsertSymbol = useCallback(
    (symbol: string) => {
      onInsert?.(symbol);
      // Keep keyboard open for multiple insertions
    },
    [onInsert]
  );

  return (
    <>
      <m.div whileTap={varTap(0.96)} whileHover={varHover(1.02)} transition={transitionTap()}>
        <StyledFab onClick={handleToggleKeyboard} aria-label="Math keyboard" sx={sx}>
          <AnimatePresence mode="wait">
            <m.div
              key={keyboardOpen ? 'close' : 'math'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Iconify
                icon={keyboardOpen ? 'mingcute:close-line' : 'solar:settings-bold'}
                width={28}
              />
            </m.div>
          </AnimatePresence>
        </StyledFab>
      </m.div>

      <AnimatePresence>
        {keyboardOpen && (
          <MathKeyboard
            open={keyboardOpen}
            onClose={handleCloseKeyboard}
            onInsert={handleInsertSymbol}
          />
        )}
      </AnimatePresence>
    </>
  );
}
