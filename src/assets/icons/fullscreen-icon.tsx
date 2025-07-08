import type { SvgIconProps } from '@mui/material/SvgIcon';

import SvgIcon from '@mui/material/SvgIcon';

export function FullscreenIcon({ sx, ...other }: SvgIconProps) {
  return (
    <SvgIcon sx={sx} {...other}>
      <g fill="none">
        <path
          fill="url(#fluentColorSearchVisual241)"
          fillRule="evenodd"
          d="M4.5 4a.5.5 0 0 0-.5.5V8a1 1 0 0 1-2 0V4.5A2.5 2.5 0 0 1 4.5 2H8a1 1 0 0 1 0 2zM15 3a1 1 0 0 1 1-1h3.5A2.5 2.5 0 0 1 22 4.5V8a1 1 0 1 1-2 0V4.5a.5.5 0 0 0-.5-.5H16a1 1 0 0 1-1-1M3 15a1 1 0 0 1 1 1v3.5a.5.5 0 0 0 .5.5H8a1 1 0 1 1 0 2H4.5A2.5 2.5 0 0 1 2 19.5V16a1 1 0 0 1 1-1m18 0a1 1 0 0 1 1 1v3.5a2.5 2.5 0 0 1-2.5 2.5H16a1 1 0 1 1 0-2h3.5a.5.5 0 0 0 .5-.5V16a1 1 0 0 1 1-1"
          clipRule="evenodd"
        />
        <path
          fill="url(#fluentColorSearchVisual240)"
          d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6M7.5 8.75a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5"
        />
        <defs>
          <radialGradient
            id="fluentColorSearchVisual240"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="rotate(48.013 -4.98 14.305)scale(7.35745 6.30132)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0fafff" />
            <stop offset={1} stopColor="#2052cb" />
          </radialGradient>
          <linearGradient
            id="fluentColorSearchVisual241"
            x1={1.21}
            x2={16.893}
            y1={0.325}
            y2={25.659}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.015} stopColor="#3dcbff" />
            <stop offset={1} stopColor="#0094f0" />
          </linearGradient>
        </defs>
      </g>
    </SvgIcon>
  );
}
