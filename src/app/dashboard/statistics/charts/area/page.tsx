'use client';

import type { Tab } from 'src/types/tab';

import { useState } from 'react';

import { Card, CardContent } from '@mui/material';

import { useLocales } from 'src/locales';
import { ActionIcon, OverviewIcon } from 'src/assets/icons';
import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { ActionsTab, OverviewTab } from 'src/sections/statistics/charts/area';

export default function AreaChartStatisticsPage() {
    const { translate: t } = useLocales();

    const tabs: Tab[] = [
        {
            value: 't1',
            label: t('pages.statistics.charts.area.tabs.overview'),
            icon: OverviewIcon,
            content: <OverviewTab />,
        },
        {
            value: 't2',
            label: t('pages.statistics.charts.area.tabs.actions'),
            icon: ActionIcon,
            content: <ActionsTab />,
        },
    ];

    const [currTab, setCurrTab] = useState<string>(tabs[1].value);

    return (
        <PageLayout
            pageKey="statistics.charts.area"
            tabs={tabs}
            tabValue={currTab}
            onTabChange={(_e, v) => setCurrTab(v)}
            tabVariant="scrollable"
            tabSx={{ mb: 2 }}
        >
            <Card>
                <CardContent>{tabs.find((tab) => tab.value === currTab)?.content}</CardContent>
            </Card>
        </PageLayout>
    );
}
