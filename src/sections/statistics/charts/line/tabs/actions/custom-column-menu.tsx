import { Button, MenuItem, TextField } from '@mui/material';
import { GridColumnMenuContainer, GridColumnMenuHideItem, GridColumnMenuProps } from '@mui/x-data-grid';
import * as React from 'react';

export interface CustomColumnMenuProps extends GridColumnMenuProps {
  onRenameColumn?: (field: string, newHeaderName: string) => void;
  onHideColumn?: (field: string) => void;
}

export default function CustomColumnMenu(props: CustomColumnMenuProps) {
  // Chỉ lấy các props hợp lệ cho GridColumnMenuContainer
  const { colDef, hideMenu, onRenameColumn, onHideColumn, ...rest } = props;
  const [newName, setNewName] = React.useState(colDef.headerName || colDef.field);
  const [editing, setEditing] = React.useState(false);

  const handleRename = (event?: React.SyntheticEvent) => {
    if (onRenameColumn) {
      // Chỉ đổi headerName, giữ nguyên field (key)
      onRenameColumn(colDef.field, newName);
    }
    setEditing(false);
    if (hideMenu) hideMenu(event || ({} as React.SyntheticEvent));
  };

  const handleHide = (event: React.SyntheticEvent) => {
    if (onHideColumn) {
      onHideColumn(colDef.field);
    }
    if (hideMenu) hideMenu(event);
  };

  // Chỉ truyền các props hợp lệ cho GridColumnMenuContainer
  return (
    <GridColumnMenuContainer colDef={colDef} hideMenu={hideMenu} {...rest}>
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
          onClick={handleHide}
        >
          Xóa cột
        </MenuItem>
      ]}
      <GridColumnMenuHideItem colDef={colDef} onClick={hideMenu} />
      {/* Bạn có thể thêm các menu khác ở đây nếu muốn */}
    </GridColumnMenuContainer>
  );
}
