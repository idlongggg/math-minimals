import { Card, CardContent } from '@mui/material';

import { ActionsTab, OverviewTab } from '../area';

type Props = {
    currentTab: string;
};

export default function DoubleColumnChartView({ currentTab }: Props) {
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
