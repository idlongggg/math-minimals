import type { SxProps, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type SvgIconProps = React.ComponentProps<'span'> & {
  src: string;
  sx?: SxProps<Theme>;
};
