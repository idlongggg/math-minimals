import type { CommonDenominatorResult, Fraction } from '../types';

/**
 * Tính ước số chung lớn nhất (GCD)
 */
export const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

/**
 * Tính bội số chung nhỏ nhất (LCM) của hai số
 */
export const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

/**
 * Tính LCM của nhiều số
 */
export const lcmMultiple = (numbers: number[]): number => {
  return numbers.reduce((acc, num) => lcm(acc, num), 1);
};

/**
 * Rút gọn phân số
 */
export const simplifyFraction = (fraction: Fraction): Fraction => {
  if (fraction.denominator === 0) {
    throw new Error('Mẫu số không thể bằng 0');
  }

  const divisor = gcd(Math.abs(fraction.numerator), Math.abs(fraction.denominator));
  let numerator = fraction.numerator / divisor;
  let denominator = fraction.denominator / divisor;

  // Đảm bảo mẫu số luôn dương
  if (denominator < 0) {
    numerator = -numerator;
    denominator = -denominator;
  }

  return { numerator, denominator };
};

/**
 * Parse phân số từ string
 */
export const parseFraction = (input: string): Fraction | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Xử lý số nguyên
  if (!/\//.test(trimmed)) {
    const num = parseInt(trimmed);
    if (isNaN(num)) return null;
    return { numerator: num, denominator: 1 };
  }

  // Xử lý phân số
  const parts = trimmed.split('/');
  if (parts.length !== 2) return null;

  const numerator = parseInt(parts[0].trim());
  const denominator = parseInt(parts[1].trim());

  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
    return null;
  }

  return simplifyFraction({ numerator, denominator });
};

/**
 * Chuyển đổi phân số về mẫu số chung
 */
export const convertToCommonDenominator = (
  fractions: Fraction[]
): CommonDenominatorResult => {
  if (fractions.length === 0) {
    throw new Error('Phải có ít nhất một phân số');
  }

  // Tìm LCM của tất cả mẫu số
  const denominators = fractions.map(f => f.denominator);
  const commonDenominator = lcmMultiple(denominators);

  // Chuyển đổi tất cả phân số về mẫu số chung
  const convertedFractions = fractions.map(fraction => ({
    numerator: fraction.numerator * (commonDenominator / fraction.denominator),
    denominator: commonDenominator,
  }));

  return {
    lcm: commonDenominator,
    fractions,
    convertedFractions,
  };
};

/**
 * Định dạng phân số thành string
 */
export const formatFraction = (fraction: Fraction): string => {
  if (fraction.denominator === 1) {
    return fraction.numerator.toString();
  }
  return `${fraction.numerator}/${fraction.denominator}`;
};

/**
 * Định dạng phân số cho LaTeX
 */
export const formatFractionLatex = (fraction: Fraction): string => {
  if (fraction.denominator === 1) {
    return fraction.numerator.toString();
  }
  return `\\frac{${fraction.numerator}}{${fraction.denominator}}`;
};
