'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useEffect, useMemo } from 'react';

import { useTabManager } from 'src/components/tab-manager';

import { DashboardPageWithTabsLayoutAndMetadata } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';
import type { TabManagerTabConfig } from 'src/components/tab-manager';

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

import type { QuickCheck } from './prime-numbers';

// ----------------------------------------------------------------------

export function PrimeNumbersView() {
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
  } = usePrimeRange();

  const { history, addToHistory, clearHistory, selectHistoryItem } =
    usePrimeHistory();

  // Tab configuration cho Prime Numbers - cập nhật khi history thay đổi
  const primeNumbersTabs: TabManagerTabConfig[] = useMemo(() => [
    {
      value: 'main',
      label: 'Kiểm tra',
      icon: <Iconify icon="solar:shield-check-bold" sx={{ color: '#1976d2' }} />,
      colorKey: 'primary'
    },
    {
      value: 'quick-tools',
      label: 'Công cụ nhanh',
      icon: <Iconify icon="custom:flash-outline" sx={{ color: '#f57c00' }} />,
      colorKey: 'warning'
    },
    {
      value: 'range-finder',
      label: 'Tìm trong khoảng',
      icon: <Iconify icon="solar:list-bold" sx={{ color: '#10b981' }} />,
      colorKey: 'success'
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
    tabs: primeNumbersTabs,
    defaultTab: 'main',
    enableColorSync: true
  });

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
      setCurrentTab('main');
    },
    [handleQuickCheck, addToHistory, setCurrentTab]
  );

  const handleHistoryItemClick = useCallback(
    (item: Parameters<typeof selectHistoryItem>[0]) => {
      const selected = selectHistoryItem(item);
      setInputNumber(selected.number);
      setCurrentTab('main');
    },
    [selectHistoryItem, setInputNumber, setCurrentTab]
  );

  const handlePrimeClick = useCallback(
    (prime: number) => {
      setInputNumber(prime.toString());
      setCurrentTab('main');
    },
    [setInputNumber, setCurrentTab]
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

  const renderTabContent = useCallback(() => {
    switch (currentTab) {
      case 'main':
        return (
          <PrimeCheckerForm
            inputNumber={inputNumber}
            result={result}
            error={error}
            onInputChange={setInputNumber}
            onCheck={handleCheckWithHistory}
            onReset={handleReset}
          />
        );

      case 'range-finder':
        return (
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

      case 'quick-tools':
        return (
          <QuickTools
            onQuickCheck={handleQuickCheckWithHistory}
            onPrimeClick={handlePrimeClick}
          />
        );

      case 'history':
        return (
          <PrimeHistory
            history={history}
            onHistoryItemClick={handleHistoryItemClick}
            onClearHistory={clearHistory}
          />
        );

      case 'guide':
        return <PrimeGuide />;

      default:
        return null;
    }
  }, [
    currentTab,
    inputNumber,
    result,
    error,
    rangeStart,
    rangeEnd,
    primesInRange,
    rangeError,
    history,
    handleCheckWithHistory,
    handleReset,
    setInputNumber,
    setRangeStart,
    setRangeEnd,
    handleFindPrimes,
    handlePrimeClick,
    handleQuickCheckWithHistory,
    handleHistoryItemClick,
    clearHistory,
  ]);

  return (
    <DashboardPageWithTabsLayoutAndMetadata
      pageKey="prime-numbers"
      title="Số nguyên tố"
      description="Công cụ kiểm tra và tìm số nguyên tố với thuật toán tối ưu và các ví dụ minh họa."
      tabs={renderTabs()}
    >
      {renderTabContent()}
    </DashboardPageWithTabsLayoutAndMetadata>
  );
}
