import type { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type SvgIconProps = React.ComponentProps<'span'> & {
    src: string;
    sx?: SxProps<Theme>;
};
