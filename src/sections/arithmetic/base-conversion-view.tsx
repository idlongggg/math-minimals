'use client';

import 'katex/dist/katex.min.css';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';

import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';

import {
  ConversionSteps,
  QuickConversions,
  useBaseConverter,
  BaseConverterForm,
  ConversionHistory,
  BaseConversionGuide,
  BaseConverterActions,
  useConversionHistory,
} from './base-conversion';

import type { ConversionResult } from './base-conversion';

// ----------------------------------------------------------------------

export function BaseConversionView() {
  const [currentTab, setCurrentTab] = useState('converter');
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

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

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
      setCurrentTab('converter');
    },
    [handleQuickConversion, addToHistory]
  );

  const handleHistoryItemClick = useCallback(
    (item: Parameters<typeof selectHistoryItem>[0]) => {
      const selected = selectHistoryItem(item);
      setInputValue(selected.inputValue);
      setFromBase(selected.fromBase);
      setToBase(selected.toBase);
      // Set result directly from history
      setConversionResult({
        input: selected.inputValue,
        fromBase: selected.fromBase,
        toBase: selected.toBase,
        result: selected.result,
      });
      setCurrentTab('converter');
    },
    [selectHistoryItem, setInputValue, setFromBase, setToBase]
  );

  const handleResetWithClear = useCallback(() => {
    handleReset();
    setConversionResult(null);
  }, [handleReset]);

  // Update conversion result when a manual conversion is performed
  useEffect(() => {
    if (hookResult && inputValue) {
      setConversionResult({
        input: inputValue,
        fromBase,
        toBase,
        result: hookResult,
      });
    }
  }, [hookResult, inputValue, fromBase, toBase]);

  const renderConverter = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 3 }}>
      <BaseConverterForm
        inputValue={inputValue}
        fromBase={fromBase}
        toBase={toBase}
        result={hookResult}
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

  const renderQuickTools = () => (
    <QuickConversions onConversionClick={handleQuickConversionWithHistory} />
  );

  const renderHistory = () => (
    <ConversionHistory
      history={history}
      onHistoryItemClick={handleHistoryItemClick}
      onClearHistory={clearHistory}
    />
  );

  const renderGuide = () => <BaseConversionGuide />;

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="converter"
        label="Chuyển đổi"
        icon={<Iconify icon="solar:restart-bold" />}
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
    <DashboardPageWithTabsLayout
      title="Chuyển đổi cơ số"
      description="Công cụ chuyển đổi giữa các hệ cơ số khác nhau với các ví dụ minh họa và hướng dẫn chi tiết."
      tabs={renderTabs()}
    >
      {currentTab === 'converter' && renderConverter()}
      {currentTab === 'quick-tools' && renderQuickTools()}
      {currentTab === 'history' && renderHistory()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayout>
  );
}
