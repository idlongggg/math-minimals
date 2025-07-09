'use client';

import type { DashboardTabData } from 'src/components/custom-tabs';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import { CloseIcon, HomeIcon, SettingsIcon, UserIcon } from 'src/assets/icons';
import { DashboardTabs } from 'src/components/custom-tabs';
import Tab1 from './tabs/tab-1';
import Tab2 from './tabs/tab-2';
import Tab3 from './tabs/tab-3';
import Tab4 from './tabs/tab-4';

// ----------------------------------------------------------------------

export function Demo01View() {
  const tabs: DashboardTabData[] = [
    { value: 'tab1', label: 'Tab One', icon: HomeIcon },
    { value: 'tab2', label: 'Tab Two', icon: UserIcon },
    { value: 'tab3', label: 'Tab Three', icon: CloseIcon },
    { value: 'tab4', label: 'Tab Four', icon: SettingsIcon },
  ];

  const [currentTab, setCurrentTab] = useState('tab1');

  const tabContent: Record<string, React.ReactNode> = {
    tab1: <Tab1 />,
    tab2: <Tab2 />,
    tab3: <Tab3 />,
    tab4: <Tab4 />,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <DashboardTabs
        tabs={tabs}
        variant="scrollable"
        value={currentTab}
        onChange={(_e, v) => setCurrentTab(v)}
        sx={{ mb: 2 }}
      />
      <Card>
        <CardContent>{tabContent[currentTab]}</CardContent>
      </Card>
    </Box>
  );
}
