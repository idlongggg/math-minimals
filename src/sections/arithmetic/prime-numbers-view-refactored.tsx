'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useEffect, useState } from 'react';

import Tab from '@mui/material/Tab';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayoutAndMetadata } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

import type { QuickCheck } from './prime-numbers';
import {
    PrimeCheckerForm,
    PrimeGuide,
    PrimeHistory,
    PrimeRangeFinder,
    QuickTools,
    usePrimeChecker,
    usePrimeHistory,
    usePrimeRange,
} from './prime-numbers';

// ----------------------------------------------------------------------

export function PrimeNumbersView() {
  const [currentTab, setCurrentTab] = useState('checker');

  const {
    inputNumber,
    setInputNumber,
    result,
    error,
    handleCheck,
    handleReset,
    handleQuickCheck,
  } = usePrimeChecker();

  const {
    rangeStart,
    setRangeStart,
    rangeEnd,
    setRangeEnd,
    primesInRange,
    error: rangeError,
    handleFindPrimes,
    handleReset: handleResetRange,
  } = usePrimeRange();

  const { history, addToHistory, clearHistory, selectHistoryItem } = usePrimeHistory();

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleCheckWithHistory = useCallback(() => {
    const checkResult = handleCheck();
    if (checkResult) {
      addToHistory(checkResult.number, checkResult.isPrime);
    }
  }, [handleCheck, addToHistory]);

  const handleQuickCheckWithHistory = useCallback(
    (quickCheck: QuickCheck) => {
      const checkResult = handleQuickCheck(quickCheck);
      if (checkResult) {
        addToHistory(checkResult.number, checkResult.isPrime);
      }
      setCurrentTab('checker');
    },
    [handleQuickCheck, addToHistory]
  );

  const handleHistoryItemClick = useCallback(
    (item: Parameters<typeof selectHistoryItem>[0]) => {
      const selected = selectHistoryItem(item);
      setInputNumber(selected.number);
      setCurrentTab('checker');
    },
    [selectHistoryItem, setInputNumber]
  );

  const handlePrimeClick = useCallback(
    (prime: number) => {
      setInputNumber(prime.toString());
      setCurrentTab('checker');
    },
    [setInputNumber]
  );

  // Auto-add to history when result changes
  useEffect(() => {
    if (result && inputNumber) {
      const num = parseInt(inputNumber);
      if (!isNaN(num)) {
        addToHistory(num, result.isPrime);
      }
    }
  }, [result, inputNumber, addToHistory]);

  const renderChecker = () => (
    <PrimeCheckerForm
      inputNumber={inputNumber}
      result={result}
      error={error}
      onInputChange={setInputNumber}
      onCheck={handleCheckWithHistory}
      onReset={handleReset}
    />
  );

  const renderRangeFinder = () => (
    <PrimeRangeFinder
      rangeStart={rangeStart}
      rangeEnd={rangeEnd}
      primesInRange={primesInRange}
      error={rangeError}
      onRangeStartChange={setRangeStart}
      onRangeEndChange={setRangeEnd}
      onFindPrimes={handleFindPrimes}
      onPrimeClick={handlePrimeClick}
    />
  );

  const renderQuickTools = () => (
    <QuickTools onQuickCheck={handleQuickCheckWithHistory} onPrimeClick={handlePrimeClick} />
  );

  const renderHistory = () => (
    <PrimeHistory
      history={history}
      onHistoryItemClick={handleHistoryItemClick}
      onClearHistory={clearHistory}
    />
  );

  const renderGuide = () => <PrimeGuide />;

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="checker"
        label="Kiểm tra"
        icon={<Iconify icon="solar:shield-check-bold" />}
      />
      <Tab
        value="range-finder"
        label="Tìm trong khoảng"
        icon={<Iconify icon="solar:list-bold" />}
      />
      <Tab
        value="quick-tools"
        label="Công cụ nhanh"
        icon={<Iconify icon="custom:flash-outline" />}
      />
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
    <DashboardPageWithTabsLayoutAndMetadata
      pageKey="prime-numbers"
      title="Số nguyên tố"
      description="Công cụ kiểm tra và tìm số nguyên tố với thuật toán tối ưu và các ví dụ minh họa."
      tabs={renderTabs()}
    >
      {currentTab === 'checker' && renderChecker()}
      {currentTab === 'range-finder' && renderRangeFinder()}
      {currentTab === 'quick-tools' && renderQuickTools()}
      {currentTab === 'history' && renderHistory()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayoutAndMetadata>
  );
}
