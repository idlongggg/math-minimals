import { useCallback, useState } from 'react';
import type { CommonDenominatorResult, Fraction } from '../types';
import { convertToCommonDenominator, parseFraction } from '../utils';

export const useCommonDenominator = () => {
  const [fractionInputs, setFractionInputs] = useState(['', '']);
  const [result, setResult] = useState<CommonDenominatorResult | null>(null);
  const [error, setError] = useState('');

  const addFractionInput = useCallback(() => {
    setFractionInputs(prev => [...prev, '']);
  }, []);

  const removeFractionInput = useCallback((index: number) => {
    if (fractionInputs.length > 2) {
      setFractionInputs(prev => prev.filter((_, i) => i !== index));
    }
  }, [fractionInputs.length]);

  const updateFractionInput = useCallback((index: number, value: string) => {
    setFractionInputs(prev => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });
  }, []);

  const calculate = useCallback((inputValues?: string[]) => {
    const inputs = inputValues || fractionInputs;
    setError('');

    try {
      // Parse tất cả phân số
      const fractions: Fraction[] = [];
      for (const input of inputs) {
        if (input.trim()) {
          const fraction = parseFraction(input);
          if (!fraction) {
            setError(`Phân số "${input}" không hợp lệ`);
            return;
          }
          fractions.push(fraction);
        }
      }

      if (fractions.length < 2) {
        setError('Cần ít nhất 2 phân số để tìm mẫu số chung');
        return;
      }

      // Tính mẫu số chung
      const result = convertToCommonDenominator(fractions);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    }
  }, [fractionInputs]);

  const clear = useCallback(() => {
    setFractionInputs(['', '']);
    setResult(null);
    setError('');
  }, []);

  const setQuickExample = useCallback((example: string[]) => {
    setFractionInputs([...example]);
    calculate(example);
  }, [calculate]);

  return {
    fractionInputs,
    result,
    error,
    addFractionInput,
    removeFractionInput,
    updateFractionInput,
    calculate,
    clear,
    setQuickExample,
  };
};
