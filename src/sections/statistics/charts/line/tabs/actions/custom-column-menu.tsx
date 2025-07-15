import type { GridColumnMenuProps } from '@mui/x-data-grid';

import React from 'react';

import { GridColumnMenuContainer } from '@mui/x-data-grid';
import { Button, MenuItem, TextField } from '@mui/material';

import { useLocales } from 'src/locales';
import { EditIcon, CloseIcon } from 'src/assets/icons';

interface CustomColumnMenuProps extends GridColumnMenuProps {
  onRenameColumn: (field: string, newName: string) => void;
  onDeleteColumn: (field: string) => void;
}

export default function CustomColumnMenu(props: CustomColumnMenuProps) {
  const { translate: t } = useLocales();
  const { hideMenu, colDef, open, onRenameColumn, onDeleteColumn } = props;
  const [newName, setNewName] = React.useState(colDef.headerName || colDef.field);
  const [editing, setEditing] = React.useState(false);

  const handleRename = (event?: React.SyntheticEvent) => {
    setEditing(false);
    onRenameColumn(colDef.field, newName);
    if (hideMenu) hideMenu(event || ({} as React.SyntheticEvent));
  };

  const handleDelete = (event: React.SyntheticEvent) => {
    onDeleteColumn(colDef.field);
    if (hideMenu) hideMenu(event);
  };

  return (
    <GridColumnMenuContainer colDef={colDef} hideMenu={hideMenu} open={open}>
      {editing ? (
        <MenuItem disableRipple>
          <TextField
            size="small"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename(e as unknown as React.SyntheticEvent);
            }}
            autoFocus
            sx={{ mr: 1 }}
          />
          <Button onClick={handleRename} size="small">
            {t('common.ok')}
          </Button>
        </MenuItem>
      ) : (
        [
          <MenuItem
            key="rename"
            onClick={() => setEditing(true)}
            sx={{
              '&:hover': {
                bgcolor: (theme) => theme.palette.warning.main + '22',
                color: (theme) => theme.palette.warning.main,
                '& .MuiSvgIcon-root': { color: (theme) => theme.palette.warning.main },
              },
            }}
          >
            <EditIcon sx={{ mr: 1, fontSize: 20 }} />
            {t('pages.statistics.charts.line.actionsTab.renameColumn')}
          </MenuItem>,
          <MenuItem
            key="delete"
            onClick={handleDelete}
            sx={{
              '&:hover': {
                bgcolor: (theme) => theme.palette.error.main + '22',
                color: (theme) => theme.palette.error.main,
                '& .MuiSvgIcon-root': { color: (theme) => theme.palette.error.main },
              },
            }}
          >
            <CloseIcon sx={{ mr: 1, fontSize: 20 }} />
            {t('pages.statistics.charts.line.actionsTab.deleteColumn')}
          </MenuItem>,
        ]
      )}
    </GridColumnMenuContainer>
  );
}
