'use client';

import 'katex/dist/katex.min.css';

import { useCallback } from 'react';

import Box from '@mui/material/Box';

import { useArithmeticTabManager } from 'src/components/arithmetic-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

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

  // Sử dụng ArithmeticTabManager với custom tabs
  const { currentTab, renderTabs } = useArithmeticTabManager({
    hasMainTab: true,
    mainTabLabel: 'Chuyển đổi',
    mainTabIcon: <Iconify icon="solar:restart-bold" />,
    hasCalculator: true,
    calculatorLabel: 'Máy tính',
    calculatorIcon: <Iconify icon="solar:pen-bold" />,
    customTabs: [
      {
        value: 'quick',
        label: 'Phép toán nhanh',
        icon: <Iconify icon="custom:flash-outline" />,
      },
      {
        value: 'history',
        label: 'Lịch sử',
        icon: <Iconify icon="solar:clock-circle-bold" />,
      },
    ],
    defaultTab: 'main',
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
