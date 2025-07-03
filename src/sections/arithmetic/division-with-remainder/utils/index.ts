// Utility functions for division with remainder calculations

import type { DivisionResult } from '../types';

/**
 * Calculate division with remainder and detailed steps
 */
export function calculateDivision(dividend: number, divisor: number): DivisionResult {
  if (divisor === 0) {
    throw new Error('Không thể chia cho 0');
  }

  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  // Create detailed calculation steps
  const steps: DivisionResult['steps'] = [
    {
      step: 1,
      description: 'Thiết lập phép chia',
      calculation: `${dividend} \\div ${divisor}`,
      result: 'Tìm thương và số dư',
    },
    {
      step: 2,
      description: 'Tính thương (làm tròn xuống)',
      calculation: `\\lfloor \\frac{${dividend}}{${divisor}} \\rfloor = \\lfloor ${(dividend / divisor).toFixed(2)} \\rfloor`,
      result: `${quotient}`,
    },
    {
      step: 3,
      description: 'Tính số dư',
      calculation: `${dividend} - (${quotient} \\times ${divisor}) = ${dividend} - ${quotient * divisor}`,
      result: `${remainder}`,
    },
    {
      step: 4,
      description: 'Kiểm tra kết quả',
      calculation: `${quotient} \\times ${divisor} + ${remainder} = ${quotient * divisor} + ${remainder} = ${dividend} \\checkmark`,
      result: `Kết quả chính xác`,
    },
  ];

  return { quotient, remainder, steps };
}

/**
 * Validate input values for division
 */
export function validateDivisionInput(dividend: string, divisor: string): string | null {
  if (!dividend.trim() || !divisor.trim()) {
    return 'Vui lòng nhập đầy đủ số bị chia và số chia';
  }

  const a = parseInt(dividend);
  const b = parseInt(divisor);

  if (isNaN(a) || isNaN(b)) {
    return 'Vui lòng nhập số nguyên hợp lệ';
  }

  if (a < 0 || b < 0) {
    return 'Vui lòng nhập số nguyên dương';
  }

  return null;
}

/**
 * Generate division table for given number and divisors
 */
export function generateDivisionTable(num: number, divisors: readonly number[]) {
  return divisors.map(divisor => ({
    divisor,
    quotient: Math.floor(num / divisor),
    remainder: num % divisor,
  }));
}
