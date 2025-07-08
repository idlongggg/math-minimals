import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

export function UserIcon({ sx, ...other }: SvgIconProps) {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  
  return (
    <SvgIcon sx={sx} {...other}>
      <g fill="none">
        <path fill={`url(#userGrad1-${uniqueId})`} d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" />
        <path fill={`url(#userGrad2-${uniqueId})`} d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z" />
        <path fill={`url(#userGrad3-${uniqueId})`} d="M12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10" />
        <defs>
          <linearGradient id={`userGrad1-${uniqueId}`} x1="7.808" x2="10.394" y1="15.064" y2="23.319" gradientUnits="userSpaceOnUse">
            <stop offset=".125" stopColor="#9c6cfe" />
            <stop offset="1" stopColor="#7a41dc" />
          </linearGradient>
          <linearGradient id={`userGrad2-${uniqueId}`} x1="12.003" x2="15.623" y1="13.047" y2="26.573" gradientUnits="userSpaceOnUse">
            <stop stopColor="#885edb" stopOpacity="0" />
            <stop offset="1" stopColor="#e362f8" />
          </linearGradient>
          <linearGradient id={`userGrad3-${uniqueId}`} x1="9.379" x2="14.475" y1="3.334" y2="11.472" gradientUnits="userSpaceOnUse">
            <stop offset=".125" stopColor="#9c6cfe" />
            <stop offset="1" stopColor="#7a41dc" />
          </linearGradient>
        </defs>
      </g>
    </SvgIcon>
  );
}
