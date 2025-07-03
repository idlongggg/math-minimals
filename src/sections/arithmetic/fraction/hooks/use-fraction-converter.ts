import { useCallback, useState } from 'react';

import {
    decimalToFraction,
    formatFraction,
    fractionToDecimal,
    simplifyFraction,
} from '../utils';

import type { Fraction, HistoryEntry } from '../types';

/**
 * Custom hook quản lý state cho chuyển đổi phân số
 * Hỗ trợ chuyển đổi giữa phân số, số thập phân và phần trăm
 */
export const useFractionConverter = () => {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [decimalInput, setDecimalInput] = useState('');
  const [percentageInput, setPercentageInput] = useState('');
  const [conversionType, setConversionType] = useState('fraction');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  /**
   * Thực hiện chuyển đổi dựa trên loại input hiện tại
   */
  const convert = useCallback(() => {
    setError('');
    setResult('');

    try {
      let conversionResult = '';
      let inputExpression = '';

      if (conversionType === 'fraction') {
        // Chuyển từ phân số sang thập phân và phần trăm
        const num = parseInt(numerator, 10);
        const den = parseInt(denominator, 10);

        if (isNaN(num) || isNaN(den)) {
          throw new Error('Vui lòng nhập tử số và mẫu số hợp lệ');
        }

        const fraction: Fraction = { numerator: num, denominator: den };
        const simplified = simplifyFraction(fraction);
        const decimal = fractionToDecimal(simplified);
        const percentage = decimal * 100;

        inputExpression = formatFraction(fraction);
        conversionResult = `Phân số rút gọn: ${formatFraction(simplified)}\\\\Số thập phân: ${decimal}\\\\Phần trăm: ${percentage}\\%`;
      } else if (conversionType === 'decimal') {
        // Chuyển từ thập phân sang phân số và phần trăm
        const decimal = parseFloat(decimalInput);

        if (isNaN(decimal)) {
          throw new Error('Vui lòng nhập số thập phân hợp lệ');
        }

        const fraction = decimalToFraction(decimal);
        const percentage = decimal * 100;

        inputExpression = decimal.toString();
        conversionResult = `Phân số: ${formatFraction(fraction)}\\\\Phần trăm: ${percentage}\\%`;
      } else if (conversionType === 'percentage') {
        // Chuyển từ phần trăm sang phân số và thập phân
        const percentage = parseFloat(percentageInput);

        if (isNaN(percentage)) {
          throw new Error('Vui lòng nhập phần trăm hợp lệ');
        }

        const decimal = percentage / 100;
        const fraction = decimalToFraction(decimal);

        inputExpression = `${percentage}\\%`;
        conversionResult = `Phân số: ${formatFraction(fraction)}\\\\Số thập phân: ${decimal}`;
      }

      setResult(conversionResult);

      // Thêm vào lịch sử
      const historyEntry: HistoryEntry = {
        id: Date.now().toString(),
        expression: inputExpression,
        result: conversionResult,
        timestamp: new Date(),
        type: 'conversion',
      };

      setHistory((prev) => [historyEntry, ...prev.slice(0, 9)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    }
  }, [numerator, denominator, decimalInput, percentageInput, conversionType]);

  /**
   * Xóa tất cả input và kết quả
   */
  const clear = useCallback(() => {
    setNumerator('');
    setDenominator('');
    setDecimalInput('');
    setPercentageInput('');
    setResult('');
    setError('');
  }, []);

  /**
   * Xóa lịch sử chuyển đổi
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    // State values
    numerator,
    denominator,
    decimalInput,
    percentageInput,
    conversionType,
    result,
    error,
    history,

    // State setters
    setNumerator,
    setDenominator,
    setDecimalInput,
    setPercentageInput,
    setConversionType,

    // Actions
    convert,
    clear,
    clearHistory,
  };
};
