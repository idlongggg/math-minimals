import { useState, useCallback } from 'react';

import { primeFactorization } from '../utils';

import type { PrimeFactorization } from '../types';

export const useFactorization = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<PrimeFactorization | null>(null);
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
      if (isNaN(num) || num <= 1) {
        setError('Vui lòng nhập một số nguyên lớn hơn 1');
        return;
      }

      if (num > 1000000) {
        setError('Số quá lớn. Vui lòng nhập số nhỏ hơn 1,000,000');
        return;
      }

      try {
        const factorizationResult = primeFactorization(num);
        setResult(factorizationResult);
      } catch {
        setError('Có lỗi xảy ra khi phân tích thừa số');
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
