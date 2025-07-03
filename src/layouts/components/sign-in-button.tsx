import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

/**
 * Nút đăng nhập - Chuyển hướng đến trang dashboard
 */
export function SignInButton({ sx, ...other }: ButtonProps) {
  return (
    <Button
      component={RouterLink}
      href={CONFIG.authentication.defaultRedirectPath}
      variant="outlined"
      sx={sx}
      {...other}
    >
      Đăng nhập
    </Button>
  );
}
