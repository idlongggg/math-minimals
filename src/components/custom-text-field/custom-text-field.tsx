import type { TextFieldProps } from '@mui/material/TextField';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export type CustomTextFieldProps = TextFieldProps;

export function CustomTextField(props: CustomTextFieldProps) {
  return <TextField {...props} />;
}
