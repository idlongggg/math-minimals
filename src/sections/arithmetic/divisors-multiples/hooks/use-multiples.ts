import { useCallback, useState } from 'react';
import type { MultipleResult } from '../types';
import { findMultiples } from '../utils';

export const useMultiples = () => {
  const [input, setInput] = useState('');
  const [limit, setLimit] = useState('10');
  const [result, setResult] = useState<MultipleResult | null>(null);
  const [error, setError] = useState('');

  const calculate = useCallback((numberValue?: string, limitValue?: string) => {
    const inputValue = numberValue ?? input;
    const limitInputValue = limitValue ?? limit;
    setError('');

    if (!inputValue.trim()) {
      setError('Vui lòng nhập một số');
      return;
    }

    if (!limitInputValue.trim()) {
      setError('Vui lòng nhập số lượng bội số');
      return;
    }

    const num = parseInt(inputValue);
    const count = parseInt(limitInputValue);

    if (isNaN(num) || num <= 0) {
      setError('Vui lòng nhập một số nguyên dương');
      return;
    }

    if (isNaN(count) || count <= 0 || count > 100) {
      setError('Số lượng bội số phải từ 1 đến 100');
      return;
    }

    try {
      const multiplesResult = findMultiples(num, count);
      setResult(multiplesResult);
    } catch (err) {
      setError('Có lỗi xảy ra khi tính toán');
    }
  }, [input, limit]);

  const clear = useCallback(() => {
    setInput('');
    setLimit('10');
    setResult(null);
    setError('');
  }, []);

  return {
    input,
    setInput,
    limit,
    setLimit,
    result,
    error,
    calculate,
    clear,
  };
};
