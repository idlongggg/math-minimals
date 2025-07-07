'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useEffect } from 'react';

import { useArithmeticTabManager } from 'src/components/arithmetic-tabs';
import { DashboardPageWithTabsLayoutAndMetadata } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

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

  // Sử dụng ArithmeticTabManager với custom tabs
  const { currentTab, setCurrentTab, renderTabs } = useArithmeticTabManager({
    hasMainTab: true,
    mainTabLabel: 'Kiểm tra',
    mainTabIcon: <Iconify icon="solar:shield-check-bold" />,
    hasQuickTools: true,
    hasHistory: true,
    historyCount: history.length,
    hasGuide: true,
    customTabs: [
      {
        value: 'range-finder',
        label: 'Tìm trong khoảng',
        icon: <Iconify icon="solar:list-bold" />,
      },
    ],
    defaultTab: 'main',
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
