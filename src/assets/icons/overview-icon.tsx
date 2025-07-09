import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

export function OverviewIcon({ sx, ...other }: SvgIconProps) {
  return (
    <SvgIcon sx={sx} {...other} viewBox="0 0 24 24">
      <g fill="none">
        <path
          fill="url(#fluentColorComment240)"
          d="M5.25 3A3.25 3.25 0 0 0 2 6.25v8.5A3.25 3.25 0 0 0 5.25 18H6v2.75c0 1.03 1.176 1.618 2 1L13 18h5.75A3.25 3.25 0 0 0 22 14.75v-8.5A3.25 3.25 0 0 0 18.75 3z"
        />
        <defs>
          <radialGradient
            id="fluentColorComment240"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(23.99056 26.74918 -48.51493 43.51162 -2.616 -2.846)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fab500" />
            <stop offset={0.535} stopColor="#fe8401" />
            <stop offset={1} stopColor="#fb5937" />
          </radialGradient>
        </defs>
      </g>
    </SvgIcon>
  );
}
