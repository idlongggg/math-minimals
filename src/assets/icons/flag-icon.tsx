import type { SvgIconProps } from '@mui/material/SvgIcon';

import SvgIcon from '@mui/material/SvgIcon';

export function FlagIcon({ sx, ...other }: SvgIconProps) {
  return (
    <SvgIcon sx={sx} {...other} viewBox="0 0 24 24">
      <g fill="none">
        <path
          fill="url(#fluentColorFlag240)"
          d="M4.5 21.25V15.5H3.007L3 21.25l.007.102A.75.75 0 0 0 3.75 22l.102-.007a.75.75 0 0 0 .648-.743"
        />
        <path
          fill="url(#fluentColorFlag241)"
          d="M3.75 2.998a.75.75 0 0 0-.75.75V16a.5.5 0 0 0 .5.5h16.754a.75.75 0 0 0 .6-1.2L16.69 9.75l4.164-5.552a.75.75 0 0 0-.6-1.2z"
        />
        <defs>
          <linearGradient
            id="fluentColorFlag240"
            x1={4.5}
            x2={4.069}
            y1={24.089}
            y2={15.729}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#889096" />
            <stop offset={1} stopColor="#63686e" />
          </linearGradient>
          <linearGradient
            id="fluentColorFlag241"
            x1={-0.939}
            x2={6.516}
            y1={-0.86}
            y2={17.385}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f97dbd" />
            <stop offset={1} stopColor="#d7257d" />
          </linearGradient>
        </defs>
      </g>
    </SvgIcon>
  );
}
