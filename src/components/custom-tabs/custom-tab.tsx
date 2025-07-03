import type { TabProps } from '@mui/material/Tab';

import Tab from '@mui/material/Tab';

// ----------------------------------------------------------------------

export type CustomTabProps = TabProps;

export function CustomTab(props: CustomTabProps) {
  return <Tab {...props} />;
}
