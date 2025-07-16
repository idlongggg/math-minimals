import { Card, CardContent } from '@mui/material';

import ActionsTab from './tabs/actions';
import OverviewTab from './tabs/overview';

type Props = {
    currentTab: string;
};

export default function LineChartView({ currentTab }: Props) {
    const renderContent = () => {
        switch (currentTab) {
            case 'overview':
                return <OverviewTab />;
            case 'actions':
                return <ActionsTab />;
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardContent>{renderContent()}</CardContent>
        </Card>
    );
}
