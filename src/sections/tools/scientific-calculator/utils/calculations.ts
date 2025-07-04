/**
 * Factorial function with validation
 */
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Basic arithmetic operations
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
    case 'mod':
      return firstValue % secondValue;
    case '^':
      return Math.pow(firstValue, secondValue);
    case '=':
      return secondValue;
    default:
      return secondValue;
  }
}

/**
 * Convert degrees to radians
 */
export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 */
export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Scientific function calculations
 */
export function performScientificCalculation(
  func: string,
  value: number,
  isRadianMode: boolean = true
): number {
  const angleValue = isRadianMode ? value : toRadians(value);

  switch (func) {
    case 'sin':
      return Math.sin(angleValue);
    case 'cos':
      return Math.cos(angleValue);
    case 'tan':
      return Math.tan(angleValue);
    case 'log':
      return Math.log10(value);
    case 'ln':
      return Math.log(value);
    case 'sqrt':
      return Math.sqrt(value);
    case 'square':
      return value * value;
    case 'factorial':
      return factorial(value);
    case 'reciprocal':
      return 1 / value;
    case 'pi':
      return Math.PI;
    case 'e':
      return Math.E;
    case 'exp':
      return Math.exp(value);
    default:
      return value;
  }
}

/**
 * Format calculation for history display
 */
export function formatCalculationForHistory(
  func: string,
  value: number,
  result: number,
  previousValue?: number | null
): string {
  switch (func) {
    case 'sin':
    case 'cos':
    case 'tan':
      return `${func}(${value}) = ${result}`;
    case 'log':
      return `log(${value}) = ${result}`;
    case 'ln':
      return `ln(${value}) = ${result}`;
    case 'sqrt':
      return `√(${value}) = ${result}`;
    case 'square':
      return `${value}² = ${result}`;
    case 'factorial':
      return `${value}! = ${result}`;
    case 'reciprocal':
      return `1/${value} = ${result}`;
    case 'pi':
      return `π = ${result}`;
    case 'e':
      return `e = ${result}`;
    case 'exp':
      return `e^${value} = ${result}`;
    case 'power':
      return previousValue !== null
        ? `${previousValue}^${value} = ${result}`
        : `${value}`;
    default:
      return `${value} = ${result}`;
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
 * Check if result is valid and should be displayed
 */
export function isValidResult(result: number): boolean {
  return !isNaN(result) && isFinite(result);
}

/**
 * Format display value with proper precision
 */
export function formatDisplayValue(value: number): string {
  if (!isValidResult(value)) return 'Error';

  // Handle very large or very small numbers
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-10 && value !== 0)) {
    return value.toExponential(6);
  }

  // Handle regular numbers
  const str = value.toString();
  if (str.length > 12) {
    return parseFloat(value.toPrecision(10)).toString();
  }

  return str;
}
