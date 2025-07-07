'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import { useArithmeticTabManager } from 'src/components/arithmetic-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

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

  // Sử dụng ArithmeticTabManager
  const { currentTab, setCurrentTab, renderTabs } = useArithmeticTabManager({
    hasMainTab: true,
    mainTabLabel: 'Tính toán',
    mainTabIcon: <Iconify icon="solar:pen-bold" />,
    hasQuickTools: true,
    quickToolsLabel: 'Ví dụ nhanh',
    hasHistory: true,
    historyCount: history.length,
    hasGuide: true,
    defaultTab: 'main',
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
