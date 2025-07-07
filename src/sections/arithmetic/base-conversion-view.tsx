'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useMemo, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';
import { useTabManager } from 'src/components/tab-manager';

import type { TabManagerTabConfig } from 'src/components/tab-manager';

import {
    BaseConversionGuide,
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

  // Tab configuration cho Base Conversion - cập nhật khi history thay đổi
  const baseConversionTabs: TabManagerTabConfig[] = useMemo(() => [
    {
      value: 'main',
      label: 'Chuyển đổi',
      icon: <Iconify icon="solar:restart-bold" sx={{ color: '#1976d2' }} />,
      colorKey: 'primary'
    },
    {
      value: 'quick-tools',
      label: 'Công cụ nhanh',
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
    tabs: baseConversionTabs,
    defaultTab: 'main',
    enableColorSync: true
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
