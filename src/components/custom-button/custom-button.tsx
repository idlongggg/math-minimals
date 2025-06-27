import type { ButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

export type CustomButtonProps = ButtonProps;

export function CustomButton(props: CustomButtonProps) {
  return <Button {...props} />;
}
