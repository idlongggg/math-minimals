// Custom hooks for division with remainder functionality

import { useState, useCallback } from 'react';

import { MAX_HISTORY_ITEMS } from '../constants';
import { calculateDivision, validateDivisionInput } from '../utils';

import type { HistoryItem, QuickExample, DivisionResult } from '../types';

export function useDivisionCalculator() {
  const [dividend, setDividend] = useState('');
  const [divisor, setDivisor] = useState('');
  const [result, setResult] = useState<DivisionResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = useCallback(() => {
    setError('');

    const validationError = validateDivisionInput(dividend, divisor);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const a = parseInt(dividend);
      const b = parseInt(divisor);
      const divisionResult = calculateDivision(a, b);
      setResult(divisionResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi tính toán'
      );
      setResult(null);
    }
  }, [dividend, divisor]);

  const handleReset = useCallback(() => {
    setDividend('');
    setDivisor('');
    setResult(null);
    setError('');
  }, []);

  const handleQuickExample = useCallback((example: QuickExample) => {
    setDividend(example.dividend.toString());
    setDivisor(example.divisor.toString());
    setError('');

    // Auto-calculate after setting values
    try {
      const divisionResult = calculateDivision(
        example.dividend,
        example.divisor
      );
      setResult(divisionResult);
    } catch {
      setError('Có lỗi xảy ra khi tính toán');
      setResult(null);
    }
  }, []);

  return {
    dividend,
    setDividend,
    divisor,
    setDivisor,
    result,
    error,
    handleCalculate,
    handleReset,
    handleQuickExample,
  };
}

export function useCalculationHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = useCallback(
    (dividend: number, divisor: number, result: DivisionResult) => {
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        dividend,
        divisor,
        result,
        timestamp: new Date(),
      };
      setHistory((prev) => [
        historyItem,
        ...prev.slice(0, MAX_HISTORY_ITEMS - 1),
      ]);
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const selectHistoryItem = useCallback(
    (item: HistoryItem) => ({
      dividend: item.dividend.toString(),
      divisor: item.divisor.toString(),
      result: item.result,
    }),
    []
  );

  return {
    history,
    addToHistory,
    clearHistory,
    selectHistoryItem,
  };
}
