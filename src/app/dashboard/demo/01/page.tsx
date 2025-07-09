"use client";

import { Card, CardContent } from '@mui/material';
import { useState } from 'react';
import { CloseIcon, HomeIcon, SettingsIcon, UserIcon } from 'src/assets/icons';
import { PageLayout } from 'src/layouts/dashboard/page-layout';
import Tab1 from 'src/sections/demo-01/tabs/tab-1';
import Tab2 from 'src/sections/demo-01/tabs/tab-2';
import Tab3 from 'src/sections/demo-01/tabs/tab-3';
import Tab4 from 'src/sections/demo-01/tabs/tab-4';

// ----------------------------------------------------------------------


export default function Demo01Page() {
  const tabs = [
    { value: 'tab1', label: 'Tab One', icon: HomeIcon },
    { value: 'tab2', label: 'Tab Two', icon: UserIcon },
    { value: 'tab3', label: 'Tab Three', icon: CloseIcon },
    { value: 'tab4', label: 'Tab Four', icon: SettingsIcon },
  ];
  const [currentTab, setCurrentTab] = useState<string>('tab1');
  const tabContent: Record<string, React.ReactNode> = {
    tab1: <Tab1 />, 
    tab2: <Tab2 />, 
    tab3: <Tab3 />, 
    tab4: <Tab4 />, 
  };
  return (
    <PageLayout
      pageKey="demo01"
      tabs={tabs}
      tabValue={currentTab}
      onTabChange={(_e, v) => setCurrentTab(v)}
      tabVariant="scrollable"
      tabSx={{ mb: 2 }}
    >
      <Card>
        <CardContent>{tabContent[currentTab]}</CardContent>
      </Card>
    </PageLayout>
  );
}
