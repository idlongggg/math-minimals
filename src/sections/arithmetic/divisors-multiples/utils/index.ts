import type { DivisorResult, GcdLcmResult, MultipleResult } from '../types';

/**
 * Tìm tất cả ước số của một số
 */
export const findAllDivisors = (num: number): number[] => {
  const divisors: number[] = [];
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      divisors.push(i);
      if (i !== Math.sqrt(num)) {
        divisors.push(num / i);
      }
    }
  }
  return divisors.sort((a, b) => a - b);
};

/**
 * Kiểm tra số nguyên tố
 */
export const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

/**
 * Kiểm tra số chính phương
 */
export const isPerfectSquare = (num: number): boolean => {
  const sqrt = Math.sqrt(num);
  return sqrt === Math.floor(sqrt);
};

/**
 * Kiểm tra số hoàn hảo
 */
export const isPerfectNumber = (num: number): boolean => {
  const divisors = findAllDivisors(num);
  const properDivisors = divisors.filter(d => d !== num);
  const sum = properDivisors.reduce((acc, d) => acc + d, 0);
  return sum === num;
};

/**
 * Tính GCD bằng thuật toán Euclidean
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
 * Tính LCM bằng công thức: LCM(a,b) = |a*b| / GCD(a,b)
 */
export const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

/**
 * Tính GCD với các bước chi tiết
 */
export const gcdWithSteps = (a: number, b: number): GcdLcmResult => {
  const originalA = a;
  const originalB = b;
  const steps: GcdLcmResult['steps'] = [];
  let stepCount = 0;

  steps.push({
    step: ++stepCount,
    description: 'Bắt đầu với hai số',
    calculation: `GCD(${a}, ${b})`,
    result: 'Bắt đầu thuật toán Euclidean',
  });

  while (b !== 0) {
    const quotient = Math.floor(a / b);
    const remainder = a % b;
    
    steps.push({
      step: ++stepCount,
      description: `Chia ${a} cho ${b}`,
      calculation: `${a} = ${b} × ${quotient} + ${remainder}`,
      result: `Số dư: ${remainder}`,
    });

    a = b;
    b = remainder;
  }

  const gcdResult = a;
  const lcmResult = (originalA * originalB) / gcdResult;

  steps.push({
    step: ++stepCount,
    description: 'Kết quả cuối cùng',
    calculation: `GCD = ${gcdResult}, LCM = ${originalA} × ${originalB} ÷ ${gcdResult}`,
    result: `GCD = ${gcdResult}, LCM = ${lcmResult}`,
  });

  return {
    a: originalA,
    b: originalB,
    gcd: gcdResult,
    lcm: lcmResult,
    steps,
  };
};

/**
 * Phân tích ước số chi tiết
 */
export const analyzeDivisors = (num: number): DivisorResult => {
  const divisors = findAllDivisors(num);
  const properDivisors = divisors.filter(d => d !== num);
  const divisorSum = divisors.reduce((acc, d) => acc + d, 0);

  return {
    number: num,
    divisors,
    divisorCount: divisors.length,
    divisorSum,
    isPrime: isPrime(num),
    isPerfectSquare: isPerfectSquare(num),
    isPerfectNumber: isPerfectNumber(num),
    properDivisors,
  };
};

/**
 * Tìm bội số của một số
 */
export const findMultiples = (num: number, count: number): MultipleResult => {
  const multiples: number[] = [];
  for (let i = 1; i <= count; i++) {
    multiples.push(num * i);
  }

  return {
    number: num,
    multiples,
    count,
    limit: num * count,
  };
};
