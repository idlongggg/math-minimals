'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import { useArithmeticTabManager } from 'src/components/arithmetic-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

import {
    BaseConversionGuide,
    BaseConverterActions,
    BaseConverterForm,
    ConversionHistory,
    ConversionSteps,
    QuickConversions,
    useBaseConverter,
    useConversionHistory,
} from './base-conversion';

import type { ConversionResult } from './base-conversion';

// ----------------------------------------------------------------------

export function BaseConversionView() {
  const [conversionResult, setConversionResult] =
    useState<ConversionResult | null>(null);

  const {
    inputValue,
    setInputValue,
    fromBase,
    setFromBase,
    toBase,
    setToBase,
    result: hookResult,
    error,
    handleConvert,
    handleReset,
    handleQuickConversion,
    handleSwapBases,
  } = useBaseConverter();

  const { history, addToHistory, clearHistory, selectHistoryItem } =
    useConversionHistory();

  // Sử dụng ArithmeticTabManager
  const { currentTab, setCurrentTab, renderTabs } = useArithmeticTabManager({
    hasMainTab: true,
    mainTabLabel: 'Chuyển đổi',
    mainTabIcon: <Iconify icon="solar:restart-bold" />,
    hasQuickTools: true,
    quickToolsLabel: 'Công cụ nhanh',
    hasHistory: true,
    historyCount: history.length,
    hasGuide: true,
    defaultTab: 'main',
  });

  const handleConvertWithHistory = useCallback(() => {
    const result = handleConvert();
    if (result) {
      setConversionResult(result);
      addToHistory(result);
    }
  }, [handleConvert, addToHistory]);

  const handleQuickConversionWithHistory = useCallback(
    (conversion: Parameters<typeof handleQuickConversion>[0]) => {
      const result = handleQuickConversion(conversion);
      if (result) {
        setConversionResult(result);
        addToHistory(result);
      }
      setCurrentTab('main');
    },
    [handleQuickConversion, addToHistory, setCurrentTab]
  );

  const handleHistoryItemClick = useCallback(
    (item: Parameters<typeof selectHistoryItem>[0]) => {
      const selected = selectHistoryItem(item);
      setInputValue(selected.inputValue);
      setFromBase(selected.fromBase);
      setToBase(selected.toBase);
      setCurrentTab('main');
    },
    [selectHistoryItem, setInputValue, setFromBase, setToBase, setCurrentTab]
  );

  const handleResetWithClear = useCallback(() => {
    handleReset();
    setConversionResult(null);
  }, [handleReset]);

  const renderTabContent = useCallback(() => {
    switch (currentTab) {
      case 'main':
        return (
          <Box>
            <BaseConverterForm
              inputValue={inputValue}
              fromBase={fromBase}
              toBase={toBase}
              result={hookResult || ''}
              onInputChange={setInputValue}
              onFromBaseChange={setFromBase}
              onToBaseChange={setToBase}
              onConvert={handleConvertWithHistory}
              onReset={handleResetWithClear}
              onSwapBases={handleSwapBases}
            />

            <BaseConverterActions
              onConvert={handleConvertWithHistory}
              onReset={handleResetWithClear}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {conversionResult && <ConversionSteps result={conversionResult} />}
          </Box>
        );

      case 'quick-tools':
        return (
          <QuickConversions onConversionClick={handleQuickConversionWithHistory} />
        );

      case 'history':
        return (
          <ConversionHistory
            history={history}
            onHistoryItemClick={handleHistoryItemClick}
            onClearHistory={clearHistory}
          />
        );

      case 'guide':
        return <BaseConversionGuide />;

      default:
        return null;
    }
  }, [
    currentTab,
    inputValue,
    fromBase,
    toBase,
    error,
    conversionResult,
    history,
    setInputValue,
    setFromBase,
    setToBase,
    handleSwapBases,
    handleConvertWithHistory,
    handleResetWithClear,
    handleQuickConversionWithHistory,
    handleHistoryItemClick,
    clearHistory,
  ]);

  return (
    <DashboardPageWithTabsLayout
      title="Chuyển đổi cơ số"
      description="Chuyển đổi số giữa các hệ cơ số khác nhau: nhị phân, bát phân, thập phân, thập lục phân"
      tabs={renderTabs()}
    >
      <Box sx={{ mt: 3 }}>{renderTabContent()}</Box>
    </DashboardPageWithTabsLayout>
  );
}
