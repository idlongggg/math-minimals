'use client';

import { useState } from 'react';

import { PageLayout } from 'src/layouts/dashboard/page-layout';
import { HomeIcon, UserIcon, CloseIcon } from 'src/assets/icons';

import { Demo01View } from 'src/sections/demo';

// ----------------------------------------------------------------------

export default function Demo01Page() {
  const tabs = [
    { value: 'tab1', label: 'Tab One', icon: HomeIcon },
    { value: 'tab2', label: 'Tab Two', icon: UserIcon },
    { value: 'tab3', label: 'Tab Three', icon: CloseIcon },
  ];

  const [currentTab, setCurrentTab] = useState<string>('tab1');

  return (
    <PageLayout
      pageKey="demo01"
      tabs={tabs}
      tabValue={currentTab}
      onTabChange={(_e, v) => setCurrentTab(v)}
      tabVariant="scrollable"
      tabSx={{ mb: 2 }}
    >
      <Demo01View currentTab={currentTab} />
    </PageLayout>
  );
}
