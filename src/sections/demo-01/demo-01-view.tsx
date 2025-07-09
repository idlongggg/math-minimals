'use client';

import { CloseIcon, HomeIcon, SettingsIcon, UserIcon } from 'src/assets/icons';
import type { DashboardTabData } from 'src/components/custom-tabs';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { DashboardTabs } from 'src/components/custom-tabs';

// ----------------------------------------------------------------------

export function Demo01View() {
  const tabs: DashboardTabData[] = [
    { value: 'tab1', label: 'Tab One', icon: HomeIcon },
    { value: 'tab2', label: 'Tab Two', icon: UserIcon },
    { value: 'tab3', label: 'Tab Three', icon: CloseIcon },
    { value: 'tab4', label: 'Tab Four', icon: SettingsIcon },
  ];

  const [currentTab, setCurrentTab] = useState('tab1');

  const tabContent = [
    <Box key="tab1">
      <Typography variant="h6" gutterBottom>
        Tab 1 - Lorem Ipsum
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Typography>
      <Typography paragraph>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Typography>
      <Typography paragraph>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </Typography>
      <Typography paragraph>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.
      </Typography>
    </Box>,
    <Box key="tab2">
      <Typography variant="h6" gutterBottom>
        Tab 2 - Lorem Ipsum
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu
        consectetur.
      </Typography>
      <Typography paragraph>
        Morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      </Typography>
      <Typography paragraph>
        Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
      </Typography>
      <Typography paragraph>
        Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
      </Typography>
    </Box>,
    <Box key="tab3">
      <Typography variant="h6" gutterBottom>
        Tab 3 - Lorem Ipsum
      </Typography>
      <Typography paragraph>
        Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere
        velit aliquet.
      </Typography>
      <Typography paragraph>
        Maecenas sed diam eget risus varius blandit sit amet non magna.
      </Typography>
      <Typography paragraph>Nullam quis risus eget urna mollis ornare vel eu leo.</Typography>
      <Typography paragraph>
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </Typography>
    </Box>,
    <Box key="tab4">
      <Typography variant="h6" gutterBottom>
        Tab 4 - Lorem Ipsum
      </Typography>
      <Typography paragraph>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      </Typography>
      <Typography paragraph>
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      </Typography>
      <Typography paragraph>Aenean lacinia bibendum nulla sed consectetur.</Typography>
      <Typography paragraph>Etiam porta sem malesuada magna mollis euismod.</Typography>
    </Box>,
  ];

  const tabIndex = tabs.findIndex((tab) => tab.value === currentTab);

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
        <CardContent>{tabContent[tabIndex]}</CardContent>
      </Card>
    </Box>
  );
}
