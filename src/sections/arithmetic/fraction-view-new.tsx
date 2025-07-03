'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';

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
  const [currentTab, setCurrentTab] = useState('converter');
  
  // Sử dụng các hooks đã tách riêng
  const calculatorHook = useFractionCalculator();
  const converterHook = useFractionConverter();

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="converter"
        label="Chuyển đổi"
        sx={{ color: '#2196f3' }}
      />
      <Tab
        value="calculator" 
        label="Máy tính"
        sx={{ color: '#4caf50' }}
      />
      <Tab
        value="quick"
        label="Phép toán nhanh"
        sx={{ color: '#ff9800' }}
      />
      <Tab
        value="history"
        label="Lịch sử" 
        sx={{ color: '#9c27b0' }}
      />
    </CustomTabs>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 'converter':
        return (
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
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
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
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
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
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
  };

  return (
    <DashboardPageWithTabsLayout
      title="Phân số"
      description="Công cụ toàn diện cho phân số: chuyển đổi, tính toán và thực hành"
      tabs={renderTabs()}
    >
      <Box sx={{ mt: 3 }}>
        {renderTabContent()}
      </Box>
    </DashboardPageWithTabsLayout>
  );
}
