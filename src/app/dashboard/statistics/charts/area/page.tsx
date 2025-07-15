'use client';

import { useState } from 'react';

import { useLocales } from 'src/locales';
import { ActionIcon, OverviewIcon } from 'src/assets/icons';
import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { AreaChartView } from 'src/sections/statistics/charts/area';

export default function AreaChartStatisticsPage() {
    const { translate: t } = useLocales();
    const tabs = [
        {
            value: 'overview',
            label: t('pages.statistics.charts.area.tab.overview'),
            icon: OverviewIcon,
        },
        {
            value: 'actions',
            label: t('pages.statistics.charts.area.tab.actions'),
            icon: ActionIcon,
        },
    ];

    const [currentTab, setCurrentTab] = useState<string>('actions');

    return (
        <PageLayout
            pageKey="statistics.charts.area"
            tabs={tabs}
            tabValue={currentTab}
            onTabChange={(_e, v) => setCurrentTab(v)}
            tabVariant="scrollable"
            tabSx={{ mb: 2 }}
        >
            <AreaChartView currentTab={currentTab} />
        </PageLayout>
    );
}
