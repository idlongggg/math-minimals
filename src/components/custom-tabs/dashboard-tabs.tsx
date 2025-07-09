
import Tab from '@mui/material/Tab';
import * as React from 'react';


import { CustomTabs } from './custom-tabs';


export interface DashboardTabData {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
}

export interface DashboardTabsProps {
  tabs: DashboardTabData[];
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  sx?: any;
}

export function DashboardTabs({
  tabs,
  value,
  onChange,
  variant = 'fullWidth',
  sx,
}: DashboardTabsProps) {
  return (
    <CustomTabs value={value} onChange={onChange} variant={variant} sx={sx}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            icon={<Icon />}
            iconPosition="start"
          />
        );
      })}
    </CustomTabs>
  );
}
