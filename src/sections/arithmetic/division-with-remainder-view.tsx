'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useEffect, useMemo } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import { useTabManager } from 'src/components/tab-manager';

import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';
import type { TabManagerTabConfig } from 'src/components/tab-manager';

import {
    DivisionCalculatorActions,
    DivisionCalculatorForm,
    DivisionGuide,
    DivisionHistory,
    DivisionSteps,
    QuickExamples,
    useCalculationHistory,
    useDivisionCalculator,
} from './division-with-remainder';

// ----------------------------------------------------------------------

export function DivisionWithRemainderView() {
  const {
    dividend,
    setDividend,
    divisor,
    setDivisor,
    result,
    error,
    handleCalculate,
    handleReset,
    handleQuickExample,
  } = useDivisionCalculator();

  const { history, addToHistory, clearHistory, selectHistoryItem } =
    useCalculationHistory();

  // Tab configuration cho Division with Remainder - cập nhật khi history thay đổi
  const divisionTabs: TabManagerTabConfig[] = useMemo(() => [
    {
      value: 'main',
      label: 'Tính toán',
      icon: <Iconify icon="solar:pen-bold" sx={{ color: '#1976d2' }} />,
      colorKey: 'primary'
    },
    {
      value: 'quick-tools',
      label: 'Ví dụ nhanh',
      icon: <Iconify icon="custom:flash-outline" sx={{ color: '#f57c00' }} />,
      colorKey: 'warning'
    },
    {
      value: 'history',
      label: `Lịch sử (${history.length})`,
      icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: '#9c27b0' }} />,
      colorKey: 'secondary'
    },
    {
      value: 'guide',
      label: 'Hướng dẫn',
      icon: <Iconify icon="solar:notebook-bold-duotone" sx={{ color: '#7b1fa2' }} />,
      colorKey: 'info'
    }
  ], [history.length]);

  // Sử dụng TabManager trực tiếp
  const { currentTab, setCurrentTab, renderTabs } = useTabManager({
    tabs: divisionTabs,
    defaultTab: 'main',
    enableColorSync: true
  });

  // Add successful calculations to history
  useEffect(() => {
    if (result && dividend && divisor) {
      const a = parseInt(dividend);
      const b = parseInt(divisor);
      if (!isNaN(a) && !isNaN(b)) {
        addToHistory(a, b, result);
      }
    }
  }, [result, dividend, divisor, addToHistory]);

  const handleCalculateWithHistory = useCallback(() => {
    handleCalculate();
  }, [handleCalculate]);

  const handleQuickExampleWithHistory = useCallback(
    (example: Parameters<typeof handleQuickExample>[0]) => {
      handleQuickExample(example);
      setCurrentTab('main');
    },
    [handleQuickExample, setCurrentTab]
  );

  const handleHistoryItemClick = useCallback(
    (item: Parameters<typeof selectHistoryItem>[0]) => {
      const selected = selectHistoryItem(item);
      setDividend(selected.dividend);
      setDivisor(selected.divisor);
      setCurrentTab('main');
    },
    [selectHistoryItem, setDividend, setDivisor, setCurrentTab]
  );

  const renderTabContent = useCallback(() => {
    switch (currentTab) {
      case 'main':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
            <DivisionCalculatorForm
              dividend={dividend}
              divisor={divisor}
              result={result}
              onDividendChange={setDividend}
              onDivisorChange={setDivisor}
              onCalculate={handleCalculateWithHistory}
              onReset={handleReset}
            />

            <DivisionCalculatorActions
              onCalculate={handleCalculateWithHistory}
              onReset={handleReset}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {result && <DivisionSteps result={result} />}
          </Box>
        );

      case 'quick-tools':
        return (
          <QuickExamples onExampleClick={handleQuickExampleWithHistory} />
        );

      case 'history':
        return (
          <DivisionHistory
            history={history}
            onHistoryItemClick={handleHistoryItemClick}
            onClearHistory={clearHistory}
          />
        );

      case 'guide':
        return <DivisionGuide />;

      default:
        return null;
    }
  }, [
    currentTab,
    dividend,
    divisor,
    result,
    error,
    history,
    setDividend,
    setDivisor,
    handleReset,
    handleCalculateWithHistory,
    handleQuickExampleWithHistory,
    handleHistoryItemClick,
    clearHistory,
  ]);

  return (
    <DashboardPageWithTabsLayout
      title="Phép chia có dư"
      description="Công cụ tính phép chia có dư với các ví dụ minh họa và bảng tra cứu nhanh."
      tabs={renderTabs()}
    >
      <Box sx={{ mt: 3 }}>{renderTabContent()}</Box>
    </DashboardPageWithTabsLayout>
  );
}
