'use client';

import { useState } from 'react';

import { useLocales } from 'src/locales';
import { ActionIcon, OverviewIcon } from 'src/assets/icons';
import { PageLayout } from 'src/layouts/dashboard/page-layout';

import PieChartView from 'src/sections/statistics/charts/pie';

export default function PieStatisticsPage() {
    const { translate: t } = useLocales();

    const tabs = [
        {
            value: 'overview',
            label: t('pages.statistics.charts.pie.tabs.overview'),
            icon: OverviewIcon,
        },
        {
            value: 'actions',
            label: t('pages.statistics.charts.pie.tabs.actions'),
            icon: ActionIcon,
        },
    ];

    const [currentTab, setCurrentTab] = useState<string>(tabs[1].value); // Default to 'actions' tab

    return (
        <PageLayout
            pageKey="statistics.charts.pie"
            tabs={tabs}
            tabValue={currentTab}
            onTabChange={(_e, v) => setCurrentTab(v)}
            tabVariant="scrollable"
            tabSx={{ mb: 2 }}
        >
            <PieChartView currentTab={currentTab} />
        </PageLayout>
    );
}
