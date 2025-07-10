import { Button, MenuItem, TextField } from '@mui/material';
import { GridColumnMenuContainer, GridColumnMenuHideItem, GridColumnMenuProps, useGridApiContext } from '@mui/x-data-grid';
import * as React from 'react';

export default function CustomColumnMenu(props: GridColumnMenuProps) {
  const { colDef, hideMenu } = props;
  const apiRef = useGridApiContext();
  const [newName, setNewName] = React.useState(colDef.headerName || colDef.field);
  const [editing, setEditing] = React.useState(false);

  const handleRename = (event?: React.SyntheticEvent) => {
    apiRef.current.updateColumns([
      { ...colDef, headerName: newName },
    ]);
    setEditing(false);
    if (hideMenu) hideMenu(event || ({} as React.SyntheticEvent));
  };

  return (
    <GridColumnMenuContainer {...props}>
      {editing ? (
        <MenuItem disableRipple>
          <TextField
            size="small"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleRename(e as unknown as React.SyntheticEvent);
            }}
            autoFocus
          />
          <Button onClick={handleRename} size="small">OK</Button>
        </MenuItem>
      ) : [
        <MenuItem key="rename" onClick={() => setEditing(true)}>
          Đổi tên cột
        </MenuItem>,
        <MenuItem
          key="delete"
          onClick={event => {
            apiRef.current.setColumnVisibility(colDef.field, false);
            if (hideMenu) hideMenu(event);
          }}
        >
          Xóa cột
        </MenuItem>
      ]
      }
      <GridColumnMenuHideItem colDef={colDef} onClick={hideMenu} />
      {/* Bạn có thể thêm các menu khác ở đây nếu muốn */}
    </GridColumnMenuContainer>
  );
}
