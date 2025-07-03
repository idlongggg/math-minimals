import { useCallback, useState } from 'react';
import type { GcdLcmPair } from '../types';
import { gcdLcmWithFactorization } from '../utils';

export const useGcdLcm = () => {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [result, setResult] = useState<GcdLcmPair | null>(null);
  const [error, setError] = useState('');

  const calculate = useCallback((valueA?: string, valueB?: string) => {
    const inputValueA = valueA ?? inputA;
    const inputValueB = valueB ?? inputB;
    setError('');

    if (!inputValueA.trim() || !inputValueB.trim()) {
      setError('Vui lòng nhập cả hai số');
      return;
    }

    const numA = parseInt(inputValueA);
    const numB = parseInt(inputValueB);

    if (isNaN(numA) || isNaN(numB) || numA <= 0 || numB <= 0) {
      setError('Vui lòng nhập hai số nguyên dương');
      return;
    }

    if (numA > 1000000 || numB > 1000000) {
      setError('Số quá lớn. Vui lòng nhập số nhỏ hơn 1,000,000');
      return;
    }

    try {
      const gcdLcmResult = gcdLcmWithFactorization(numA, numB);
      setResult(gcdLcmResult);
    } catch (err) {
      setError('Có lỗi xảy ra khi tính toán');
    }
  }, [inputA, inputB]);

  const clear = useCallback(() => {
    setInputA('');
    setInputB('');
    setResult(null);
    setError('');
  }, []);

  return {
    inputA,
    setInputA,
    inputB,
    setInputB,
    result,
    error,
    calculate,
    clear,
  };
};
