'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';

import { useTabManager } from 'src/components/tab-manager';

import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';
import type { TabManagerTabConfig } from 'src/components/tab-manager';

import {
    FractionCalculator,
    FractionConverter,
    HistoryPanel,
    QuickOperationsPanel,
} from './fraction';
import { useFractionCalculator, useFractionConverter } from './fraction/hooks';

/**
 * Component chính cho trang Phân số
 * Bao gồm chuyển đổi, máy tính, phép toán nhanh và lịch sử
 */
export function FractionView() {
  // Sử dụng các hooks đã tách riêng
  const calculatorHook = useFractionCalculator();
  const converterHook = useFractionConverter();

  // Tab configuration cho Fractions
  const fractionTabs: TabManagerTabConfig[] = useMemo(() => [
    {
      value: 'main',
      label: 'Chuyển đổi',
      icon: <Iconify icon="solar:restart-bold" sx={{ color: '#1976d2' }} />,
      colorKey: 'primary'
    },
    {
      value: 'calculator',
      label: 'Máy tính',
      icon: <Iconify icon="solar:pen-bold" sx={{ color: '#388e3c' }} />,
      colorKey: 'success'
    },
    {
      value: 'quick',
      label: 'Phép toán nhanh',
      icon: <Iconify icon="custom:flash-outline" sx={{ color: '#f57c00' }} />,
      colorKey: 'warning'
    },
    {
      value: 'history',
      label: 'Lịch sử',
      icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: '#9c27b0' }} />,
      colorKey: 'secondary'
    },
    {
      value: 'guide',
      label: 'Hướng dẫn',
      icon: <Iconify icon="solar:notebook-bold-duotone" sx={{ color: '#7b1fa2' }} />,
      colorKey: 'info'
    }
  ], []);

  // Sử dụng TabManager trực tiếp
  const { currentTab, renderTabs } = useTabManager({
    tabs: fractionTabs,
    defaultTab: 'main',
    enableColorSync: true
  });

  const renderTabContent = useCallback(() => {
    switch (currentTab) {
      case 'main':
        return (
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ flex: 2 }}>
              <FractionConverter />
            </Box>
            <Box sx={{ flex: 1 }}>
              <HistoryPanel
                title="Lịch sử chuyển đổi"
                history={converterHook.history}
                onClearHistory={converterHook.clearHistory}
              />
            </Box>
          </Box>
        );

      case 'calculator':
        return (
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ flex: 2 }}>
              <FractionCalculator />
            </Box>
            <Box sx={{ flex: 1 }}>
              <HistoryPanel
                title="Lịch sử tính toán"
                history={calculatorHook.history}
                onClearHistory={calculatorHook.clearHistory}
              />
            </Box>
          </Box>
        );

      case 'quick':
        return (
          <Box>
            <QuickOperationsPanel />
          </Box>
        );

      case 'history':
        return (
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <HistoryPanel
                title="Lịch sử chuyển đổi"
                history={converterHook.history}
                onClearHistory={converterHook.clearHistory}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <HistoryPanel
                title="Lịch sử tính toán"
                history={calculatorHook.history}
                onClearHistory={calculatorHook.clearHistory}
              />
            </Box>
          </Box>
        );

      default:
        return null;
    }
  }, [currentTab, converterHook, calculatorHook]);

  return (
    <DashboardPageWithTabsLayout
      title="Phân số"
      description="Công cụ toàn diện cho phân số: chuyển đổi, tính toán và thực hành"
      tabs={renderTabs()}
    >
      <Box sx={{ mt: 3 }}>{renderTabContent()}</Box>
    </DashboardPageWithTabsLayout>
  );
}
