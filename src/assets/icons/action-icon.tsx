import type { SvgIconProps } from '@mui/material/SvgIcon';

import SvgIcon from '@mui/material/SvgIcon';

export function ActionIcon({ sx, ...other }: SvgIconProps) {
    return (
        <SvgIcon sx={sx} {...other} viewBox="0 0 24 24">
            <g fill="none">
                <path
                    fill="url(#fluentColorDataPie240)"
                    d="M11 4.784a.75.75 0 0 0-.817-.747a9 9 0 1 0 9.78 9.78a.75.75 0 0 0-.747-.817H11z"
                />
                <path
                    fill="url(#fluentColorDataPie241)"
                    d="M12.728 2.216a.75.75 0 0 1 .544-.212a9 9 0 0 1 8.724 8.724a.75.75 0 0 1-.75.772H13.25a.75.75 0 0 1-.75-.75V2.754a.75.75 0 0 1 .228-.538"
                />
                <defs>
                    <linearGradient
                        id="fluentColorDataPie240"
                        x1={19.966}
                        x2={-8.78}
                        y1={22}
                        y2={-6.746}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#6d37cd" />
                        <stop offset={0.641} stopColor="#ea71ef" />
                    </linearGradient>
                    <linearGradient
                        id="fluentColorDataPie241"
                        x1={21.205}
                        x2={14.399}
                        y1={9.759}
                        y2={2.004}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#e23cb4" />
                        <stop offset={1} stopColor="#ea71ef" />
                    </linearGradient>
                </defs>
            </g>
        </SvgIcon>
    );
}
