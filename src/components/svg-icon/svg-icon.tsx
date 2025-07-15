'use client';

import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { svgIconClasses } from './classes';

import type { SvgIconProps } from './types';

// ----------------------------------------------------------------------

export function SvgIcon({ src, className, sx, ...other }: SvgIconProps) {
    return (
        <SvgRoot
            className={mergeClasses([svgIconClasses.root, className])}
            sx={[
                {
                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <img src={src} alt="" />
        </SvgRoot>
    );
}

// ----------------------------------------------------------------------

const SvgRoot = styled('span')(() => ({
    width: 24,
    height: 24,
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
