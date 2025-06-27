import type { AlertProps } from '@mui/material/Alert';

import Alert from '@mui/material/Alert';

// ----------------------------------------------------------------------

export type CustomAlertProps = AlertProps;

export function CustomAlert(props: CustomAlertProps) {
  return <Alert {...props} />;
}
