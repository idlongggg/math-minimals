'use client';

import { useState } from 'react';

import { HomeIcon, SettingsIcon, UserIcon } from 'src/assets/icons';
import { PageLayout } from 'src/layouts/dashboard/page-layout';

// TODO: Replace with your actual view/component for each tab
function LineChartOverview({ currentTab }: { currentTab: string }) {
    return <div>Tab: {currentTab}</div>;
}

// ----------------------------------------------------------------------

export default function LineChartStatisticsPage() {
    const tabs = [
        { value: 'overview', label: 'Tổng quát', icon: HomeIcon },
        { value: 'actions', label: 'Thao tác', icon: UserIcon },
        { value: 'history', label: 'Lịch sử', icon: SettingsIcon },
    ];

    const [currentTab, setCurrentTab] = useState<string>('overview');

    return (
        <PageLayout
            pageKey="statistics.charts.line"
            tabs={tabs}
            tabValue={currentTab}
            onTabChange={(_e, v) => setCurrentTab(v)}
            tabVariant="scrollable"
            tabSx={{ mb: 2 }}
        >
            <LineChartOverview currentTab={currentTab} />
        </PageLayout>
    );
}
