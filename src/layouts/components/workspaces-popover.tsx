'use client';

import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { SxProps, Theme } from '@mui/material/styles';

import { usePopover } from 'minimal-shared/hooks';
import { useCallback, useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';

import { useRouter, useSearchParams } from 'src/routes/hooks';
import { createUrlWithWorkspace, getWorkspaceParam } from 'src/routes/utils';

import { useUserAccess } from 'src/auth/hooks/use-user-access';
import { CustomPopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

const getAccessStatus = (hasAccess: boolean, t: (key: string) => string) => {
  return hasAccess ? t('workspace.owned') : t('workspace.notOwned');
};

const getLabelColor = (hasAccess: boolean) => {
  return hasAccess ? 'success' : 'default';
};

export type WorkspacesPopoverProps = ButtonBaseProps & {
  data?: {
    id: string;
    name: string;
    logo: string;
  }[];
};

export function WorkspacesPopover({ data = [], sx, ...other }: WorkspacesPopoverProps) {
  const mediaQuery = 'sm';

  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasAccess } = useUserAccess();
  const { translate: t } = useLocales();

  const { open, anchorEl, onClose, onOpen } = usePopover();

  // Get workspace from URL parameter, default to 'all-tools' if not specified
  const currentWorkspaceParam = getWorkspaceParam(searchParams);

  // Find the workspace object based on the parameter
  const initialWorkspace = data.find((item) => item.id === currentWorkspaceParam) || data[0];

  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    newWorkspace: typeof data[0] | null;
  }>({ open: false, newWorkspace: null });

  // Update workspace state when URL parameter changes
  useEffect(() => {
    const workspaceParam = getWorkspaceParam(searchParams);
    const currentWorkspace = data.find((item) => item.id === workspaceParam) || data[0];

    if (currentWorkspace && currentWorkspace.id !== workspace?.id) {
      setWorkspace(currentWorkspace);
    }
  }, [searchParams, data, workspace?.id]);

  const handleChangeWorkspace = useCallback(
    (newValue: (typeof data)[0]) => {
      // Check if workspace is disabled (not owned) - skip for 'all-tools'
      if (newValue.id !== 'all-tools' && !hasAccess(newValue.id)) {
        return; // Don't allow selection of disabled workspaces
      }

      // Check if selecting the same workspace
      if (workspace?.id === newValue.id) {
        onClose();
        return; // Don't do anything if same workspace
      }

      // Show confirmation dialog before switching workspace
      setConfirmDialog({ open: true, newWorkspace: newValue });
      onClose();
    },
    [onClose, hasAccess, workspace?.id]
  );

  const handleConfirmWorkspaceChange = useCallback(() => {
    const { newWorkspace } = confirmDialog;
    if (newWorkspace) {
      setWorkspace(newWorkspace);
      setConfirmDialog({ open: false, newWorkspace: null });

      // Create URL with workspace parameter and force full page reload
      const url = createUrlWithWorkspace(window.location.pathname, newWorkspace.id, {});
      window.location.href = url;
    }
  }, [confirmDialog]);

  const handleCancelWorkspaceChange = useCallback(() => {
    setConfirmDialog({ open: false, newWorkspace: null });
  }, []);

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
      <Box
        component="img"
        alt={workspace?.name}
        src={workspace?.logo}
        sx={{ width: 24, height: 24, borderRadius: '50%' }}
      />

      <Box
        component="span"
        sx={{ typography: 'subtitle2', display: { xs: 'none', [mediaQuery]: 'inline-flex' } }}
      >
        {workspace?.name}
      </Box>

      {workspace && workspace.id !== 'all-tools' && (
        <Label
          color={getLabelColor(hasAccess(workspace.id))}
          sx={{
            height: 22,
            cursor: 'inherit',
            display: { xs: 'none', [mediaQuery]: 'inline-flex' },
          }}
        >
          {getAccessStatus(hasAccess(workspace.id), t)}
        </Label>
      )}

      <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />
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
      <Scrollbar sx={{ maxHeight: 240 }}>
        <MenuList>
          {data.map((option, index) => {
            // Check if workspace is disabled (not owned) - skip for 'all-tools'
            const isDisabled = option.id !== 'all-tools' && !hasAccess(option.id);
            
            return (
              <div key={option.id}>
                <MenuItem
                  selected={option.id === workspace?.id}
                  onClick={() => handleChangeWorkspace(option)}
                  disabled={isDisabled}
                  sx={{ 
                    height: 48,
                    ...(isDisabled && {
                      opacity: 0.5,
                      cursor: 'not-allowed',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }),
                  }}
                >
                  <Avatar 
                    alt={option.name} 
                    src={option.logo} 
                    sx={{ 
                      width: 24, 
                      height: 24,
                      ...(isDisabled && { opacity: 0.6 }),
                    }} 
                  />

                  <Typography
                    noWrap
                    component="span"
                    variant="body2"
                    sx={{ 
                      flexGrow: 1, 
                      fontWeight: 'fontWeightMedium',
                      ...(isDisabled && { color: 'text.disabled' }),
                    }}
                  >
                    {option.name}
                  </Typography>

                  {option.id !== 'all-tools' && (
                    <Label 
                      color={getLabelColor(hasAccess(option.id))}
                      sx={{
                        ...(isDisabled && { opacity: 0.6 }),
                      }}
                    >
                      {getAccessStatus(hasAccess(option.id), t)}
                    </Label>
                  )}
                </MenuItem>
                {index === 0 && <Divider sx={{ my: 0.5, borderStyle: 'dashed' }} />}
              </div>
            );
          })}
        </MenuList>
      </Scrollbar>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <Dialog open={confirmDialog.open} onClose={handleCancelWorkspaceChange}>
      <DialogTitle>Xác nhận chuyển workspace</DialogTitle>
      <DialogContent>
        <Typography>
          Bạn có muốn chuyển sang workspace "{confirmDialog.newWorkspace?.name}" không?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelWorkspaceChange}>
          Hủy
        </Button>
        <Button onClick={handleConfirmWorkspaceChange} variant="contained">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {renderButton()}
      {renderMenuList()}
      {renderConfirmDialog()}
    </>
  );
}
