import { useState, useCallback } from 'react';

import { analyzeDivisors } from '../utils';

import type { DivisorResult } from '../types';

export const useDivisors = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DivisorResult | null>(null);
  const [error, setError] = useState('');

  const calculate = useCallback(
    (value?: string) => {
      const inputValue = value ?? input;
      setError('');

      if (!inputValue.trim()) {
        setError('Vui lòng nhập một số');
        return;
      }

      const num = parseInt(inputValue);
      if (isNaN(num) || num <= 0) {
        setError('Vui lòng nhập một số nguyên dương');
        return;
      }

      if (num > 100000) {
        setError('Số quá lớn. Vui lòng nhập số nhỏ hơn 100,000');
        return;
      }

      try {
        const analysisResult = analyzeDivisors(num);
        setResult(analysisResult);
      } catch {
        setError('Có lỗi xảy ra khi tính toán');
      }
    },
    [input]
  );

  const clear = useCallback(() => {
    setInput('');
    setResult(null);
    setError('');
  }, []);

  return {
    input,
    setInput,
    result,
    error,
    calculate,
    clear,
  };
};
