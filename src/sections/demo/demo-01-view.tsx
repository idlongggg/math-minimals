'use client';

import { Card, CardContent } from '@mui/material';

import Tab1 from './tabs/tab-1';
import Tab2 from './tabs/tab-2';
import Tab3 from './tabs/tab-3';
import Tab4 from './tabs/tab-4';

export function Demo01View({ currentTab }: { currentTab: string }) {
  const tabContent: Record<string, React.ReactNode> = {
    tab1: <Tab1 />,
    tab2: <Tab2 />,
    tab3: <Tab3 />,
    tab4: <Tab4 />,
  };

  return (
    <Card>
      <CardContent>{tabContent[currentTab]}</CardContent>
    </Card>
  );
}

export default Demo01View;
