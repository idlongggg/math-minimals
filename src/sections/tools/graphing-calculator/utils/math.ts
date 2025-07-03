/**
 * Parse and evaluate mathematical expression safely
 */
export function evaluateExpression(expression: string, x: number): number {
  try {
    // Replace mathematical functions and constants
    const expr = expression
      .replace(/\^/g, '**')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/abs/g, 'Math.abs')
      .replace(/pi/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/x/g, x.toString());

    // Simple validation to prevent dangerous code execution
    if (!/^[0-9+\-*/().\s Math.sincotanlgqrbspiPIE]+$/.test(expr)) {
      throw new Error('Invalid expression');
    }

    const result = eval(expr);
    return typeof result === 'number' ? result : NaN;
  } catch {
    return NaN;
  }
}

/**
 * Generate points for a function within given bounds
 */
export function generatePoints(
  expression: string,
  xMin: number,
  xMax: number,
  numPoints: number = 1000
): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  const step = (xMax - xMin) / numPoints;

  for (let x = xMin; x <= xMax; x += step) {
    const y = evaluateExpression(expression, x);
    if (!isNaN(y) && isFinite(y)) {
      points.push({ x, y });
    }
  }

  return points;
}

/**
 * Transform mathematical coordinates to canvas coordinates
 */
export function transformX(x: number, xMin: number, xMax: number, width: number): number {
  return ((x - xMin) / (xMax - xMin)) * width;
}

export function transformY(y: number, yMin: number, yMax: number, height: number): number {
  return height - ((y - yMin) / (yMax - yMin)) * height;
}

/**
 * Transform canvas coordinates back to mathematical coordinates
 */
export function inverseTransformX(canvasX: number, xMin: number, xMax: number, width: number): number {
  return xMin + (canvasX / width) * (xMax - xMin);
}

export function inverseTransformY(canvasY: number, yMin: number, yMax: number, height: number): number {
  return yMax - (canvasY / height) * (yMax - yMin);
}

/**
 * Calculate optimal grid step size
 */
export function calculateGridStep(min: number, max: number, divisions: number = 10): number {
  const range = max - min;
  const roughStep = range / divisions;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const normalizedStep = roughStep / magnitude;
  
  if (normalizedStep <= 1) return magnitude;
  if (normalizedStep <= 2) return 2 * magnitude;
  if (normalizedStep <= 5) return 5 * magnitude;
  return 10 * magnitude;
}

/**
 * Check if a point is within canvas bounds
 */
export function isPointInBounds(
  canvasX: number,
  canvasY: number,
  width: number,
  height: number
): boolean {
  return canvasX >= 0 && canvasX <= width && canvasY >= 0 && canvasY <= height;
}

/**
 * Validate mathematical expression
 */
export function validateExpression(expression: string): { isValid: boolean; error?: string } {
  if (!expression.trim()) {
    return { isValid: false, error: 'Expression cannot be empty' };
  }

  // Check for valid characters only
  const validPattern = /^[0-9+\-*/().\s xsincogtanlqrbspiPIE^]+$/;
  if (!validPattern.test(expression)) {
    return { isValid: false, error: 'Expression contains invalid characters' };
  }

  // Test with a sample value
  try {
    const result = evaluateExpression(expression, 1);
    if (isNaN(result)) {
      return { isValid: false, error: 'Expression is not valid' };
    }
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Expression evaluation failed' };
  }
}
