'use client';

import type { Theme, SxProps } from '@mui/material/styles';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { usePopover } from 'minimal-shared/hooks';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import { useRouter, useSearchParams } from 'src/routes/hooks';
import { getWorkspaceParam, createUrlWithWorkspace } from 'src/routes/utils';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const getLabelColor = (plan: string) => {
  if (plan === 'Chưa sở hữu') return 'default';
  if (plan === 'Sở hữu') return 'success';
  if (plan === 'Free') return 'default';
  if (plan === '') return undefined;
  return 'info';
};

export type WorkspacesPopoverProps = ButtonBaseProps & {
  data?: {
    id: string;
    name: string;
    logo: string;
    plan: string;
  }[];
};

export function WorkspacesPopover({ data = [], sx, ...other }: WorkspacesPopoverProps) {
  const mediaQuery = 'sm';

  const router = useRouter();
  const searchParams = useSearchParams();

  const { open, anchorEl, onClose, onOpen } = usePopover();

  // Get workspace from URL parameter, default to 'all-tools' if not specified
  const currentWorkspaceParam = getWorkspaceParam(searchParams);

  // Find the workspace object based on the parameter
  const initialWorkspace = data.find((item) => item.id === currentWorkspaceParam) || data[0];

  const [workspace, setWorkspace] = useState(initialWorkspace);

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
      setWorkspace(newValue);
      onClose();

      // Create new URL with workspace parameter
      const currentParams = new URLSearchParams(searchParams.toString());
      const additionalParams: Record<string, string> = {};

      // Preserve all existing parameters except workspace
      currentParams.forEach((value, key) => {
        if (key !== 'workspace') {
          additionalParams[key] = value;
        }
      });

      // Create URL with workspace parameter
      const url = createUrlWithWorkspace(window.location.pathname, newValue.id, additionalParams);
      router.push(url);
    },
    [onClose, router, searchParams]
  );

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

      {workspace?.plan && (
        <Label
          color={getLabelColor(workspace.plan)}
          sx={{
            height: 22,
            cursor: 'inherit',
            display: { xs: 'none', [mediaQuery]: 'inline-flex' },
          }}
        >
          {workspace.plan}
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
          {data.map((option, index) => (
            <div key={option.id}>
              <MenuItem
                selected={option.id === workspace?.id}
                onClick={() => handleChangeWorkspace(option)}
                sx={{ height: 48 }}
              >
                <Avatar alt={option.name} src={option.logo} sx={{ width: 24, height: 24 }} />

                <Typography
                  noWrap
                  component="span"
                  variant="body2"
                  sx={{ flexGrow: 1, fontWeight: 'fontWeightMedium' }}
                >
                  {option.name}
                </Typography>

                {option.plan && <Label color={getLabelColor(option.plan)}>{option.plan}</Label>}
              </MenuItem>
              {index === 0 && <Divider sx={{ my: 0.5, borderStyle: 'dashed' }} />}
            </div>
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
