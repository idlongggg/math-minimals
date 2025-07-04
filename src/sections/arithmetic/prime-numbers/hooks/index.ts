// Custom hooks for prime numbers functionality

import { useState, useCallback } from 'react';

import { MAX_HISTORY_ITEMS } from '../constants';
import {
  checkPrime,
  findPrimesInRange,
  validatePrimeInput,
  validateRangeInput,
} from '../utils';

import type { QuickCheck, HistoryItem, PrimeCheckResult } from '../types';

export function usePrimeChecker() {
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState<PrimeCheckResult | null>(null);
  const [error, setError] = useState('');

  const handleCheck = useCallback(() => {
    setError('');
    setResult(null);

    const validationError = validatePrimeInput(inputNumber);
    if (validationError) {
      setError(validationError);
      return null;
    }

    const num = parseInt(inputNumber.trim());
    const checkResult = checkPrime(num);
    setResult(checkResult);

    return {
      number: num,
      isPrime: checkResult.isPrime,
      result: checkResult,
    };
  }, [inputNumber]);

  const handleReset = useCallback(() => {
    setInputNumber('');
    setResult(null);
    setError('');
  }, []);

  const handleQuickCheck = useCallback((quickCheck: QuickCheck) => {
    setInputNumber(quickCheck.example);

    const num = parseInt(quickCheck.example);
    const checkResult = checkPrime(num);
    setResult(checkResult);
    setError('');

    return {
      number: num,
      isPrime: checkResult.isPrime,
      result: checkResult,
    };
  }, []);

  return {
    inputNumber,
    setInputNumber,
    result,
    error,
    handleCheck,
    handleReset,
    handleQuickCheck,
  };
}

export function usePrimeRange() {
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [primesInRange, setPrimesInRange] = useState<number[]>([]);
  const [error, setError] = useState('');

  const handleFindPrimes = useCallback(() => {
    setError('');
    setPrimesInRange([]);

    const validationError = validateRangeInput(rangeStart, rangeEnd);
    if (validationError) {
      setError(validationError);
      return;
    }

    const start = parseInt(rangeStart.trim());
    const end = parseInt(rangeEnd.trim());

    const primes = findPrimesInRange(start, end);
    setPrimesInRange(primes);
  }, [rangeStart, rangeEnd]);

  const handleReset = useCallback(() => {
    setRangeStart('');
    setRangeEnd('');
    setPrimesInRange([]);
    setError('');
  }, []);

  return {
    rangeStart,
    setRangeStart,
    rangeEnd,
    setRangeEnd,
    primesInRange,
    error,
    handleFindPrimes,
    handleReset,
  };
}

export function usePrimeHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = useCallback((number: number, isPrime: boolean) => {
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      number,
      isPrime,
      timestamp: new Date(),
    };
    setHistory((prev) => [
      historyItem,
      ...prev.slice(0, MAX_HISTORY_ITEMS - 1),
    ]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const selectHistoryItem = useCallback(
    (item: HistoryItem) => ({
      number: item.number.toString(),
      result: checkPrime(item.number),
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
