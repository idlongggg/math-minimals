'use client';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useBottomDrawer } from 'src/contexts/bottom-drawer-context';
import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export function BottomDrawer() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const { isOpen, onClose } = useBottomDrawer();

  // Chiều cao tương tự chiều cao bàn phím (keyboard height)
  const drawerHeight = 300;

  const isNavMini = settings.state.navLayout === 'mini';
  const isNavHorizontal = settings.state.navLayout === 'horizontal';
  const isNavVertical = isNavMini || settings.state.navLayout === 'vertical';

  // Tính toán left offset dựa trên layout
  const getLeftOffset = () => {
    if (isNavHorizontal) {
      return 0; // Horizontal nav không có sidebar
    }
    if (isNavMini) {
      return 'var(--layout-nav-mini-width)';
    }
    if (isNavVertical) {
      return 'var(--layout-nav-vertical-width)';
    }
    return 0;
  };

  // Tính toán width dựa trên layout
  const getDrawerWidth = () => {
    if (isNavHorizontal) {
      return '100%'; // Horizontal nav chiếm toàn bộ width
    }
    if (isNavMini) {
      return 'calc(100% - var(--layout-nav-mini-width))';
    }
    if (isNavVertical) {
      return 'calc(100% - var(--layout-nav-vertical-width))';
    }
    return '100%';
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="bottom"
      slotProps={{
        backdrop: { invisible: true },
        paper: {
          sx: {
            height: drawerHeight,
            borderRadius: '16px 16px 0 0',
            // Đảm bảo drawer nằm trong content layout, không bị đè bởi sidebar
            left: {
              xs: 0,
              lg: getLeftOffset(),
            },
            right: 0,
            width: {
              xs: '100%',
              lg: getDrawerWidth(),
            },
            maxWidth: 'none',
            boxShadow: theme.customShadows.z20,
            transition: theme.transitions.create(['left', 'width'], {
              easing: 'var(--layout-transition-easing)',
              duration: 'var(--layout-transition-duration)',
            }),
          },
        },
      }}
    >
      {/* Header với nút đóng */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6">Drawer Title</Typography>

        <IconButton onClick={onClose} size="small">
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Box>

      {/* Nội dung drawer */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Đây là drawer blank từ dưới lên
        </Typography>

        <Typography
          variant="body2"
          color="text.disabled"
          textAlign="center"
          sx={{ mt: 1 }}
        >
          Bạn có thể thêm nội dung tùy ý vào đây
        </Typography>
      </Box>
    </Drawer>
  );
}
