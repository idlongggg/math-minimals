'use client';

import { useState } from 'react';

import { useLocales } from 'src/locales';
import { ActionIcon, OverviewIcon } from 'src/assets/icons';
import { PageLayout } from 'src/layouts/dashboard/page-layout';

import PictographChartView from 'src/sections/statistics/charts/pictograph';

export default function PictographChartStatisticsPage() {
    const { translate: t } = useLocales();

    const tabs = [
        {
            value: 'overview',
            label: t('pages.statistics.charts.pictograph.tabs.overview'),
            icon: OverviewIcon,
        },
        {
            value: 'actions',
            label: t('pages.statistics.charts.pictograph.tabs.actions'),
            icon: ActionIcon,
        },
    ];

    const [currentTab, setCurrentTab] = useState<string>(tabs[1].value); // Default to 'actions' tab

    return (
        <PageLayout
            pageKey="statistics.charts.pictograph"
            tabs={tabs}
            tabValue={currentTab}
            onTabChange={(_e, v) => setCurrentTab(v)}
            tabVariant="scrollable"
            tabSx={{ mb: 2 }}
        >
            <PictographChartView currentTab={currentTab} />
        </PageLayout>
    );
}
