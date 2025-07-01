import SimpleBar from 'simplebar-react';
import { mergeClasses } from 'minimal-shared/utils';
import { styled } from '@mui/material/styles';
import { scrollbarClasses } from './classes';
import type { ScrollbarProps } from './types';

// ----------------------------------------------------------------------

export function Scrollbar({
  sx,
  ref,
  children,
  className,
  slotProps,
  fillContent = true,
  spacing = 4, // Default spacing of 4px
  ...other
}: ScrollbarProps) {
  return (
    <ScrollbarRoot
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      fillContent={fillContent}
      spacing={spacing}
      className={mergeClasses([scrollbarClasses.root, className])}
      sx={[
        {
          '& .simplebar-wrapper': slotProps?.wrapperSx as React.CSSProperties,
          '& .simplebar-content-wrapper':
            slotProps?.contentWrapperSx as React.CSSProperties,
          '& .simplebar-content': slotProps?.contentSx as React.CSSProperties,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {children}
    </ScrollbarRoot>
  );
}

// ----------------------------------------------------------------------

const ScrollbarRoot = styled(SimpleBar, {
  shouldForwardProp: (prop: string) =>
    !['fillContent', 'spacing', 'sx'].includes(prop),
})<Pick<ScrollbarProps, 'fillContent' | 'spacing'>>(
  ({ fillContent, spacing = 4 }) => ({
    minWidth: 0,
    minHeight: 0,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // Apply dynamic spacing
    '& .simplebar-scrollbar.simplebar-vertical': {
      right: `${spacing}px`,
      width: '8px',
    },
    '& .simplebar-scrollbar.simplebar-horizontal': {
      height: '8px',
      // Remove bottom spacing to keep horizontal scrollbar at the bottom
    },
    '& .simplebar-content-wrapper': {
      paddingRight: '18px', // Fixed 18px padding for layout indentation
      // Remove bottom padding to prevent scrollbar from being pushed down
    },
    ...(fillContent && {
      '& .simplebar-content': {
        display: 'flex',
        flex: '1 1 auto',
        minHeight: '100%',
        flexDirection: 'column',
      },
    }),
  })
);
