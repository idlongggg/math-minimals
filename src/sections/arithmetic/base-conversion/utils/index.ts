// Utility functions for base conversion

import { DIGITS_MAP } from '../constants';

/**
 * Check if a digit is valid for the given base
 */
export function isValidDigit(digit: string, base: number): boolean {
  const charCode = digit.toUpperCase().charCodeAt(0);
  if (digit >= '0' && digit <= '9') {
    return parseInt(digit) < base;
  }
  if (digit >= 'A' && digit <= 'Z') {
    return charCode - 65 + 10 < base;
  }
  return false;
}

/**
 * Check if a number string is valid for the given base
 */
export function isValidNumber(value: string, base: number): boolean {
  if (!value) return false;
  return value.split('').every((digit) => isValidDigit(digit, base));
}

/**
 * Convert a number from one base to another
 */
export function convertBase(
  value: string,
  sourceBase: number,
  targetBase: number
): string {
  if (!value) return '';

  try {
    // Convert to decimal first
    let decimal = 0;
    const digits = value.toUpperCase().split('').reverse();

    for (let i = 0; i < digits.length; i++) {
      const digit = digits[i];
      let digitValue: number;

      if (digit >= '0' && digit <= '9') {
        digitValue = parseInt(digit);
      } else if (digit >= 'A' && digit <= 'Z') {
        digitValue = digit.charCodeAt(0) - 65 + 10;
      } else {
        throw new Error('Invalid character');
      }

      if (digitValue >= sourceBase) {
        throw new Error(`Invalid digit '${digit}' for base ${sourceBase}`);
      }

      decimal += digitValue * Math.pow(sourceBase, i);
    }

    if (targetBase === 10) {
      return decimal.toString();
    }

    // Convert from decimal to target base
    if (decimal === 0) return '0';

    let convertedResult = '';
    while (decimal > 0) {
      convertedResult = DIGITS_MAP[decimal % targetBase] + convertedResult;
      decimal = Math.floor(decimal / targetBase);
    }

    return convertedResult;
  } catch {
    throw new Error('Conversion failed');
  }
}

/**
 * Generate detailed conversion steps
 */
export function generateConversionSteps(
  value: string,
  sourceBase: number,
  targetBase: number
): Array<{
  step: number;
  description: string;
  calculation: string;
  result: string;
}> {
  const steps: Array<{
    step: number;
    description: string;
    calculation: string;
    result: string;
  }> = [];

  if (sourceBase === targetBase) {
    steps.push({
      step: 1,
      description: 'Cùng hệ cơ số',
      calculation: `${value}_{(${sourceBase})} = ${value}_{(${targetBase})}`,
      result: value,
    });
    return steps;
  }

  // Step 1: Convert to decimal if not already
  if (sourceBase !== 10) {
    const digits = value.toUpperCase().split('').reverse();
    let calculation = '';
    let decimal = 0;

    for (let i = 0; i < digits.length; i++) {
      const digit = digits[i];
      let digitValue: number;

      if (digit >= '0' && digit <= '9') {
        digitValue = parseInt(digit);
      } else {
        digitValue = digit.charCodeAt(0) - 65 + 10;
      }

      if (i > 0) calculation += ' + ';
      calculation += `${digit} \\times ${sourceBase}^{${i}}`;
      if (i > 0)
        calculation += ` = ${digitValue} \\times ${Math.pow(sourceBase, i)}`;

      decimal += digitValue * Math.pow(sourceBase, i);
    }

    steps.push({
      step: 1,
      description: `Chuyển từ hệ ${sourceBase} sang thập phân`,
      calculation,
      result: decimal.toString(),
    });

    if (targetBase === 10) return steps;
  }

  // Step 2: Convert from decimal to target base
  const decimalValue =
    sourceBase === 10 ? parseInt(value) : parseInt(steps[0].result);
  if (targetBase !== 10) {
    let remaining = decimalValue;
    let calculation = '';
    const divisions: string[] = [];

    while (remaining > 0) {
      const quotient = Math.floor(remaining / targetBase);
      const remainder = remaining % targetBase;
      const remainderChar =
        remainder < 10
          ? remainder.toString()
          : String.fromCharCode(65 + remainder - 10);

      divisions.push(
        `${remaining} \\div ${targetBase} = ${quotient} \\text{ dư } ${remainderChar}`
      );
      remaining = quotient;
    }

    calculation = divisions.join('\\\\');

    steps.push({
      step: steps.length + 1,
      description: `Chuyển từ thập phân sang hệ ${targetBase}`,
      calculation,
      result: convertBase(value, sourceBase, targetBase),
    });
  }

  return steps;
}

/**
 * Validate conversion input
 */
export function validateConversionInput(
  value: string,
  fromBase: number,
  toBase: number
): string | null {
  if (!value.trim()) {
    return 'Vui lòng nhập số cần chuyển đổi';
  }

  if (fromBase < 2 || fromBase > 36) {
    return 'Hệ cơ số nguồn phải từ 2 đến 36';
  }

  if (toBase < 2 || toBase > 36) {
    return 'Hệ cơ số đích phải từ 2 đến 36';
  }

  if (!isValidNumber(value.trim(), fromBase)) {
    return `Số "${value}" không hợp lệ cho hệ cơ số ${fromBase}`;
  }

  return null;
}
