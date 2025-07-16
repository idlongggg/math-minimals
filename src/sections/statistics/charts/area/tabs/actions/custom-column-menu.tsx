import type { GridColumnMenuProps } from '@mui/x-data-grid';

import React from 'react';

import { Button, MenuItem, TextField } from '@mui/material';
import { useGridApiContext, GridColumnMenuContainer } from '@mui/x-data-grid';

import { useLocales } from 'src/locales';
import { EditIcon, CloseIcon } from 'src/assets/icons';

interface CustomColumnMenuProps extends GridColumnMenuProps {
    onDeleteColumn?: (field: string) => void;
    onRenameColumn?: (field: string, newName: string) => void;
}

export default function CustomColumnMenu({
    hideMenu,
    colDef,
    open,
    onDeleteColumn,
    onRenameColumn,
}: CustomColumnMenuProps) {
    const { translate: t } = useLocales();
    const apiRef = useGridApiContext();
    const [newName, setNewName] = React.useState(colDef.headerName || colDef.field);
    const [editing, setEditing] = React.useState(false);

    const handleRename = (event?: React.SyntheticEvent) => {
        if (!colDef.field) return;
        apiRef.current.updateColumns([{ field: colDef.field, headerName: newName }]);
        onRenameColumn?.(colDef.field, newName);
        setEditing(false);
        if (hideMenu) hideMenu(event || ({} as React.SyntheticEvent));
    };

    const handleDelete = (event: React.SyntheticEvent) => {
        if (!colDef.field || colDef.field === 'label') {
            if (hideMenu) hideMenu(event);
            return;
        }
        onDeleteColumn?.(colDef.field);
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
                            if (e.key === 'Enter')
                                handleRename(e as unknown as React.SyntheticEvent);
                        }}
                        autoFocus
                        sx={{ mr: 1 }}
                    />
                    <Button onClick={handleRename} size="small">
                        {t('Ok')}
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
                                '& .MuiSvgIcon-root': {
                                    color: (theme) => theme.palette.warning.main,
                                },
                            },
                        }}
                    >
                        <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                        {t('Rename Column')}
                    </MenuItem>,
                    <MenuItem
                        key="delete"
                        onClick={handleDelete}
                        disabled={colDef.field === 'label'}
                        sx={{
                            '&:hover': {
                                bgcolor: (theme) => theme.palette.error.main + '22',
                                color: (theme) => theme.palette.error.main,
                                '& .MuiSvgIcon-root': {
                                    color: (theme) => theme.palette.error.main,
                                },
                            },
                        }}
                    >
                        <CloseIcon sx={{ mr: 1, fontSize: 20 }} />
                        {t('Delete Column')}
                    </MenuItem>,
                ]
            )}
        </GridColumnMenuContainer>
    );
}
