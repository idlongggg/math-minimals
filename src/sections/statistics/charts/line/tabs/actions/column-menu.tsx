import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface ColumnMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  menuColField: string | null;
}

export default function ColumnMenu({ anchorEl, open, onClose, menuColField }: ColumnMenuProps) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem
        onClick={() => {
          onClose();
          alert('Đổi tên cột: ' + menuColField);
        }}
      >
        Đổi tên cột
      </MenuItem>
      {/* Thêm các menu khác nếu muốn */}
    </Menu>
  );
}
