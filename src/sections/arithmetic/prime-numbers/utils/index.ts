// Utility functions for prime numbers

import { MAX_RANGE_SIZE, MAX_SAFE_NUMBER } from '../constants';
import type { PrimeCheckResult, SieveStep } from '../types';

/**
 * Check if a number is prime using basic algorithm
 */
export function isPrime(num: number): boolean {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

/**
 * Find all factors of a number
 */
export function findFactors(num: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

/**
 * Check if number is prime and generate explanation
 */
export function checkPrime(num: number): PrimeCheckResult {
  const primeResult = isPrime(num);
  let explanation = '';
  let factors: number[] = [];

  if (num < 2) {
    explanation = `Số ${num} không phải là số nguyên tố vì số nguyên tố phải lớn hơn hoặc bằng 2.`;
  } else if (num === 2) {
    explanation = 'Số 2 là số nguyên tố duy nhất là số chẵn.';
  } else if (primeResult) {
    explanation = `Số ${num} là số nguyên tố vì chỉ có 2 ước số: 1 và ${num}.`;
    factors = [1, num];
  } else {
    factors = findFactors(num);
    explanation = `Số ${num} không phải là số nguyên tố vì có ${factors.length} ước số: ${factors.join(', ')}.`;
  }

  return {
    number: num,
    isPrime: primeResult,
    factors: factors.length > 0 ? factors : undefined,
    explanation,
  };
}

/**
 * Find prime numbers in a range
 */
export function findPrimesInRange(start: number, end: number): number[] {
  const primes: number[] = [];
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

/**
 * Generate primes using Sieve of Eratosthenes
 */
export function sieveOfEratosthenes(limit: number): number[] {
  const sieve = new Array(limit + 1).fill(true);
  sieve[0] = sieve[1] = false;

  for (let i = 2; i <= Math.sqrt(limit); i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = false;
      }
    }
  }

  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (sieve[i]) {
      primes.push(i);
    }
  }

  return primes;
}

/**
 * Generate sieve steps for visualization
 */
export function generateSieveSteps(limit: number): SieveStep[] {
  const steps: SieveStep[] = [];
  const sieve = new Array(limit + 1).fill(true);
  sieve[0] = sieve[1] = false;

  // Initial step
  steps.push({
    step: 1,
    description: `Tạo danh sách từ 2 đến ${limit}`,
    crossedOut: [0, 1],
    remaining: Array.from({ length: limit - 1 }, (_, i) => i + 2),
  });

  let stepCount = 2;
  for (let i = 2; i <= Math.sqrt(limit); i++) {
    if (sieve[i]) {
      const crossedOut: number[] = [];
      for (let j = i * i; j <= limit; j += i) {
        if (sieve[j]) {
          sieve[j] = false;
          crossedOut.push(j);
        }
      }

      if (crossedOut.length > 0) {
        const remaining: number[] = [];
        for (let k = 2; k <= limit; k++) {
          if (sieve[k]) {
            remaining.push(k);
          }
        }

        steps.push({
          step: stepCount++,
          description: `Loại bỏ bội số của ${i}`,
          crossedOut,
          remaining,
        });
      }
    }
  }

  return steps;
}

/**
 * Validate prime check input
 */
export function validatePrimeInput(input: string): string | null {
  const num = parseInt(input.trim());

  if (!input.trim()) {
    return 'Vui lòng nhập một số';
  }

  if (isNaN(num)) {
    return 'Vui lòng nhập một số nguyên hợp lệ';
  }

  if (num < 0) {
    return 'Vui lòng nhập số nguyên dương';
  }

  if (num > MAX_SAFE_NUMBER) {
    return `Vui lòng nhập số nhỏ hơn ${MAX_SAFE_NUMBER.toLocaleString()} để tối ưu hiệu suất`;
  }

  return null;
}

/**
 * Validate range input for prime generation
 */
export function validateRangeInput(start: string, end: string): string | null {
  const startNum = parseInt(start.trim());
  const endNum = parseInt(end.trim());

  if (!start.trim() || !end.trim()) {
    return 'Vui lòng nhập khoảng số hợp lệ';
  }

  if (isNaN(startNum) || isNaN(endNum)) {
    return 'Vui lòng nhập khoảng số hợp lệ';
  }

  if (startNum < 0 || endNum < 0) {
    return 'Vui lòng nhập số nguyên dương';
  }

  if (startNum > endNum) {
    return 'Số bắt đầu phải nhỏ hơn hoặc bằng số kết thúc';
  }

  if (endNum - startNum > MAX_RANGE_SIZE) {
    return `Khoảng tìm kiếm quá lớn. Vui lòng giới hạn trong ${MAX_RANGE_SIZE.toLocaleString()} số`;
  }

  return null;
}
