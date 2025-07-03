'use client';

import type { Theme, SxProps } from '@mui/material/styles';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Button, { buttonClasses } from '@mui/material/Button';

import { useWorkspaceContext } from 'src/contexts/workspace-context';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export type WorkspacesPopoverProps = ButtonBaseProps & {
  data?: {
    id: string;
    name: string;
    logo: string;
    plan: string;
  }[];
};

export function WorkspacesPopover({
  data = [],
  sx,
  ...other
}: WorkspacesPopoverProps) {
  const mediaQuery = 'sm';

  const { open, anchorEl, onClose, onOpen } = usePopover();
  const { currentWorkspace, setWorkspace, isAllTools } = useWorkspaceContext();

  const handleChangeWorkspace = useCallback(
    (newValue: (typeof data)[0]) => {
      setWorkspace(newValue);
      onClose();
    },
    [onClose, setWorkspace]
  );

  const handleSelectAllTools = useCallback(() => {
    setWorkspace(null);
    onClose();
  }, [onClose, setWorkspace]);

  const buttonBg: SxProps<Theme> = {
    height: 1,
    zIndex: -1,
    opacity: 0,
    content: "''",
    borderRadius: 1,
    position: 'absolute',
    visibility: 'hidden',
    bgcolor: 'action.hover',
    width: 'calc(100% + 8px)',
    transition: (theme) =>
      theme.transitions.create(['opacity', 'visibility'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
    ...(open && {
      opacity: 1,
      visibility: 'visible',
    }),
  };

  const renderButton = () => (
    <ButtonBase
      disableRipple
      onClick={onOpen}
      sx={[
        {
          py: 0.5,
          gap: { xs: 0.5, [mediaQuery]: 1 },
          '&::before': buttonBg,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isAllTools ? (
        <Box
          sx={{
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            bgcolor: 'primary.main',
          }}
        >
          <Iconify
            width={14}
            icon="mingcute:dot-grid-fill"
            sx={{ color: 'primary.contrastText' }}
          />
        </Box>
      ) : (
        <Box
          component="img"
          alt={currentWorkspace?.name}
          src={currentWorkspace?.logo}
          sx={{ width: 24, height: 24, borderRadius: '50%' }}
        />
      )}

      <Box
        component="span"
        sx={{
          typography: 'subtitle2',
          display: { xs: 'none', [mediaQuery]: 'inline-flex' },
        }}
      >
        {isAllTools ? 'Tất cả công cụ toán học' : currentWorkspace?.name}
      </Box>

      {!isAllTools && (
        <Label
          color={currentWorkspace?.plan === 'Chưa có' ? 'default' : 'info'}
          sx={{
            height: 22,
            cursor: 'inherit',
            display: { xs: 'none', [mediaQuery]: 'inline-flex' },
          }}
        >
          {currentWorkspace?.plan}
        </Label>
      )}

      <Iconify
        width={16}
        icon="carbon:chevron-sort"
        sx={{ color: 'text.disabled' }}
      />
    </ButtonBase>
  );

  const renderMenuList = () => (
    <CustomPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      slotProps={{
        arrow: { placement: 'top-left' },
        paper: { sx: { mt: 0.5, ml: -1.55, width: 320 } },
      }}
    >
      <Button
        fullWidth
        startIcon={<Iconify width={18} icon="mingcute:dot-grid-fill" />}
        onClick={handleSelectAllTools}
        sx={{
          gap: 2,
          justifyContent: 'flex-start',
          fontWeight: 'fontWeightMedium',
          bgcolor: isAllTools ? 'action.selected' : 'transparent',
          [`& .${buttonClasses.startIcon}`]: {
            m: 0,
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        Tất cả công cụ toán học
      </Button>

      <Divider sx={{ my: 0.5, borderStyle: 'dashed' }} />

      <Scrollbar sx={{ maxHeight: 240 }}>
        <MenuList>
          {data.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === currentWorkspace?.id}
              onClick={() => handleChangeWorkspace(option)}
              sx={{ height: 48 }}
            >
              <Avatar
                alt={option.name}
                src={option.logo}
                sx={{ width: 24, height: 24 }}
              />

              <Typography
                noWrap
                component="span"
                variant="body2"
                sx={{ flexGrow: 1, fontWeight: 'fontWeightMedium' }}
              >
                {option.name}
              </Typography>

              <Label color={option.plan === 'Chưa có' ? 'default' : 'info'}>
                {option.plan}
              </Label>
            </MenuItem>
          ))}
        </MenuList>
      </Scrollbar>
    </CustomPopover>
  );

  return (
    <>
      {renderButton()}
      {renderMenuList()}
    </>
  );
}
