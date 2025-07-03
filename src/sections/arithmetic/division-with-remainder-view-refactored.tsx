'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import { CustomTabs } from 'src/components/custom-tabs';
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
  const [currentTab, setCurrentTab] = useState('calculator');

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

  const { history, addToHistory, clearHistory, selectHistoryItem } = useCalculationHistory();

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

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleCalculateWithHistory = useCallback(() => {
    handleCalculate();
  }, [handleCalculate]);

  const handleQuickExampleWithHistory = useCallback(
    (example: Parameters<typeof handleQuickExample>[0]) => {
      handleQuickExample(example);
      setCurrentTab('calculator');
    },
    [handleQuickExample]
  );

  const handleHistoryItemClick = useCallback(
    (item: Parameters<typeof selectHistoryItem>[0]) => {
      const selected = selectHistoryItem(item);
      setDividend(selected.dividend);
      setDivisor(selected.divisor);
      setCurrentTab('calculator');
    },
    [selectHistoryItem, setDividend, setDivisor]
  );

  const renderCalculator = () => (
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

  const renderQuickTools = () => (
    <QuickExamples onExampleClick={handleQuickExampleWithHistory} />
  );

  const renderHistory = () => (
    <DivisionHistory
      history={history}
      onHistoryItemClick={handleHistoryItemClick}
      onClearHistory={clearHistory}
    />
  );

  const renderGuide = () => <DivisionGuide />;

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab value="calculator" label="Máy tính" icon={<Iconify icon="solar:restart-bold" />} />
      <Tab value="quick-tools" label="Ví dụ nhanh" icon={<Iconify icon="custom:flash-outline" />} />
      <Tab
        value="history"
        label={`Lịch sử (${history.length})`}
        icon={<Iconify icon="solar:clock-circle-bold" />}
      />
      <Tab
        value="guide"
        label="Hướng dẫn"
        icon={<Iconify icon="solar:notebook-bold-duotone" />}
      />
    </CustomTabs>
  );

  return (
    <DashboardPageWithTabsLayout
      title="Phép chia có dư"
      description="Công cụ tính phép chia có dư với các ví dụ minh họa và bảng tra cứu nhanh."
      tabs={renderTabs()}
    >
      {currentTab === 'calculator' && renderCalculator()}
      {currentTab === 'quick-tools' && renderQuickTools()}
      {currentTab === 'history' && renderHistory()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayout>
  );
}
