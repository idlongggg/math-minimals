import { useState, useCallback } from 'react';

import {
  addFractions,
  formatFraction,
  divideFractions,
  multiplyFractions,
  subtractFractions,
} from '../utils';

import type { Fraction, HistoryEntry } from '../types';

/**
 * Custom hook quản lý state cho máy tính phân số
 * Xử lý các phép tính cơ bản: cộng, trừ, nhân, chia
 */
export const useFractionCalculator = () => {
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<Fraction | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  /**
   * Thực hiện phép tính với hai phân số
   */
  const calculate = useCallback(() => {
    setError('');
    setResult(null);

    try {
      const n1 = parseInt(num1, 10);
      const d1 = parseInt(den1, 10);
      const n2 = parseInt(num2, 10);
      const d2 = parseInt(den2, 10);

      if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) {
        throw new Error('Vui lòng nhập số hợp lệ');
      }

      if (d1 === 0 || d2 === 0) {
        throw new Error('Mẫu số không thể bằng 0');
      }

      const fraction1: Fraction = { numerator: n1, denominator: d1 };
      const fraction2: Fraction = { numerator: n2, denominator: d2 };

      let calculationResult: Fraction;
      let operationSymbol: string;

      switch (operation) {
        case 'add':
          calculationResult = addFractions(fraction1, fraction2);
          operationSymbol = '+';
          break;
        case 'subtract':
          calculationResult = subtractFractions(fraction1, fraction2);
          operationSymbol = '-';
          break;
        case 'multiply':
          calculationResult = multiplyFractions(fraction1, fraction2);
          operationSymbol = '×';
          break;
        case 'divide':
          calculationResult = divideFractions(fraction1, fraction2);
          operationSymbol = '÷';
          break;
        default:
          throw new Error('Phép toán không hợp lệ');
      }

      setResult(calculationResult);

      // Thêm vào lịch sử
      const historyEntry: HistoryEntry = {
        id: Date.now().toString(),
        expression: `${formatFraction(fraction1)} ${operationSymbol} ${formatFraction(fraction2)}`,
        result: formatFraction(calculationResult),
        timestamp: new Date(),
        type: 'calculation',
      };

      setHistory((prev) => [historyEntry, ...prev.slice(0, 9)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    }
  }, [num1, den1, num2, den2, operation]);

  /**
   * Xóa tất cả input và kết quả
   */
  const clear = useCallback(() => {
    setNum1('');
    setDen1('');
    setNum2('');
    setDen2('');
    setResult(null);
    setError('');
  }, []);

  /**
   * Xóa lịch sử tính toán
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    // State values
    num1,
    den1,
    num2,
    den2,
    operation,
    result,
    error,
    history,

    // State setters
    setNum1,
    setDen1,
    setNum2,
    setDen2,
    setOperation,

    // Actions
    calculate,
    clear,
    clearHistory,
  };
};
