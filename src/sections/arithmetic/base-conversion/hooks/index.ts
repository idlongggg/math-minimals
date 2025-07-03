// Custom hooks for base conversion functionality

import { useCallback, useState } from 'react';

import { MAX_HISTORY_ITEMS } from '../constants';
import type { ConversionResult, HistoryItem, QuickConversion } from '../types';
import { convertBase, generateConversionSteps, validateConversionInput } from '../utils';

export function useBaseConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleConvert = useCallback(() => {
    setError('');

    if (!inputValue.trim()) {
      setResult('');
      return null;
    }

    const validationError = validateConversionInput(inputValue.trim(), fromBase, toBase);
    if (validationError) {
      setError(validationError);
      setResult('');
      return null;
    }

    try {
      const converted = convertBase(inputValue.trim(), fromBase, toBase);
      setResult(converted);

      return {
        input: inputValue.trim(),
        fromBase,
        toBase,
        result: converted,
        steps: generateConversionSteps(inputValue.trim(), fromBase, toBase),
      };
    } catch {
      setError('Có lỗi xảy ra khi chuyển đổi');
      setResult('');
      return null;
    }
  }, [inputValue, fromBase, toBase]);

  const handleReset = useCallback(() => {
    setInputValue('');
    setFromBase(10);
    setToBase(2);
    setResult('');
    setError('');
  }, []);

  const handleQuickConversion = useCallback((quickConv: QuickConversion) => {
    setFromBase(quickConv.from);
    setToBase(quickConv.to);
    setInputValue(quickConv.example);

    try {
      const converted = convertBase(quickConv.example, quickConv.from, quickConv.to);
      setResult(converted);
      setError('');

      return {
        input: quickConv.example,
        fromBase: quickConv.from,
        toBase: quickConv.to,
        result: converted,
        steps: generateConversionSteps(quickConv.example, quickConv.from, quickConv.to),
      };
    } catch {
      setError('Có lỗi xảy ra khi chuyển đổi');
      setResult('');
      return null;
    }
  }, []);

  const handleSwapBases = useCallback(() => {
    setFromBase(toBase);
    setToBase(fromBase);
    if (result) {
      setInputValue(result);
      setResult('');
    }
  }, [fromBase, toBase, result]);

  return {
    inputValue,
    setInputValue,
    fromBase,
    setFromBase,
    toBase,
    setToBase,
    result,
    error,
    handleConvert,
    handleReset,
    handleQuickConversion,
    handleSwapBases,
  };
}

export function useConversionHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = useCallback((conversion: ConversionResult) => {
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      input: conversion.input,
      fromBase: conversion.fromBase,
      toBase: conversion.toBase,
      result: conversion.result,
      timestamp: new Date(),
    };
    setHistory(prev => [historyItem, ...prev.slice(0, MAX_HISTORY_ITEMS - 1)]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const selectHistoryItem = useCallback((item: HistoryItem) => {
    return {
      inputValue: item.input,
      fromBase: item.fromBase,
      toBase: item.toBase,
      result: item.result,
    };
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
    selectHistoryItem,
  };
}
