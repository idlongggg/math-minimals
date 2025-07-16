'use client';

import { useState } from 'react';

import { useLocales } from 'src/locales';
import { ActionIcon, OverviewIcon } from 'src/assets/icons';
import { PageLayout } from 'src/layouts/dashboard/page-layout';

import SingleColumnChartView from 'src/sections/statistics/charts/single-column';

export default function SingleColumnChartStatisticsPage() {
    const { translate: t } = useLocales();

    const tabs = [
        {
            value: 'overview',
            label: t('pages.statistics.charts.single-column.tabs.overview'),
            icon: OverviewIcon,
        },
        {
            value: 'actions',
            label: t('pages.statistics.charts.single-column.tabs.actions'),
            icon: ActionIcon,
        },
    ];

    const [currentTab, setCurrentTab] = useState<string>(tabs[1].value); // Default to 'actions' tab

    return (
        <PageLayout
            pageKey="statistics.charts.single-column"
            tabs={tabs}
            tabValue={currentTab}
            onTabChange={(_e, v) => setCurrentTab(v)}
            tabVariant="scrollable"
            tabSx={{ mb: 2 }}
        >
            <SingleColumnChartView currentTab={currentTab} />
        </PageLayout>
    );
}
