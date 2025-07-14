'use client';

import { useState } from 'react';

import { ActionIcon, OverviewIcon } from 'src/assets/icons';
import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { LineChartView } from 'src/sections/statistics/charts/line';

// ----------------------------------------------------------------------

export default function LineChartStatisticsPage() {
  const tabs = [
    { value: 'overview', label: 'Tổng quát', icon: OverviewIcon },
    { value: 'actions', label: 'Thao tác', icon: ActionIcon },
  ];

  const [currentTab, setCurrentTab] = useState<string>('actions');

  return (
    <PageLayout
      pageKey="statistics.charts.line"
      tabs={tabs}
      tabValue={currentTab}
      onTabChange={(_e, v) => setCurrentTab(v)}
      tabVariant="scrollable"
      tabSx={{ mb: 2 }}
    >
      <LineChartView currentTab={currentTab} />
    </PageLayout>
  );
}
