/**
 * Perform basic arithmetic calculations
 */
export function calculate(
  firstValue: number,
  secondValue: number,
  operation: string
): number {
  switch (operation) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '×':
      return firstValue * secondValue;
    case '÷':
      return firstValue / secondValue;
    case '=':
      return secondValue;
    default:
      return secondValue;
  }
}

/**
 * Safe number parsing with fallback
 */
export function safeParseFloat(value: string, fallback: number = 0): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Format display value
 */
export function formatDisplayValue(value: number): string {
  if (!isFinite(value)) return 'Error';

  // Handle very large numbers
  if (Math.abs(value) >= 1e15) {
    return value.toExponential(6);
  }

  // Handle regular numbers
  const str = value.toString();
  if (str.length > 12) {
    return parseFloat(value.toPrecision(10)).toString();
  }

  return str;
}
