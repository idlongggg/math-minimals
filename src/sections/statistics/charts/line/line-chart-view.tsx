import { Card, CardContent } from '@mui/material';

import ActionsTab from './tabs/actions';
import HistoryTab from './tabs/history';
import OverviewTab from './tabs/overview';

function LineChartView({ currentTab }: { currentTab: string }) {
  const tabContent: Record<string, React.ReactNode> = {
    overview: <OverviewTab />,
    actions: <ActionsTab />,
    history: <HistoryTab />,
  };

  return (
    <Card>
      <CardContent>{tabContent[currentTab]}</CardContent>
    </Card>
  );
}

export default LineChartView;
