import type { GcdLcmPair, PrimeFactorization } from '../types';

/**
 * Kiểm tra số nguyên tố
 */
export const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

/**
 * Phân tích thừa số nguyên tố
 */
export const primeFactorization = (n: number): PrimeFactorization => {
  if (n <= 1) {
    throw new Error('Số phải lớn hơn 1');
  }

  const factors: { prime: number; power: number }[] = [];
  let remaining = n;

  // Kiểm tra thừa số 2
  if (remaining % 2 === 0) {
    let power = 0;
    while (remaining % 2 === 0) {
      remaining /= 2;
      power++;
    }
    factors.push({ prime: 2, power });
  }

  // Kiểm tra các thừa số lẻ
  for (let i = 3; i <= Math.sqrt(remaining); i += 2) {
    if (remaining % i === 0) {
      let power = 0;
      while (remaining % i === 0) {
        remaining /= i;
        power++;
      }
      factors.push({ prime: i, power });
    }
  }

  // Nếu còn lại một số lớn hơn 1, nó là số nguyên tố
  if (remaining > 1) {
    factors.push({ prime: remaining, power: 1 });
  }

  // Tạo chuỗi biểu diễn
  const factorString = factors
    .map(({ prime, power }) => (power === 1 ? `${prime}` : `${prime}^${power}`))
    .join(' × ');

  // Kiểm tra square-free (không có thừa số nào có lũy thừa > 1)
  const isSquareFree = factors.every((f) => f.power === 1);

  // Kiểm tra prime power (chỉ có một thừa số nguyên tố)
  const isPrimePower = factors.length === 1;

  return {
    number: n,
    factors,
    factorString,
    isSquareFree,
    isPrimePower,
  };
};

/**
 * Tính GCD từ phân tích thừa số nguyên tố
 */
export const gcdFromFactorization = (
  factorsA: { prime: number; power: number }[],
  factorsB: { prime: number; power: number }[]
): { prime: number; power: number }[] => {
  const gcdFactors: { prime: number; power: number }[] = [];

  // Tạo map cho factorsA để tra cứu nhanh
  const mapA = new Map(factorsA.map((f) => [f.prime, f.power]));

  // Duyệt qua factorsB và tìm min power
  for (const { prime, power } of factorsB) {
    const powerA = mapA.get(prime) || 0;
    const minPower = Math.min(powerA, power);
    if (minPower > 0) {
      gcdFactors.push({ prime, power: minPower });
    }
  }

  return gcdFactors;
};

/**
 * Tính LCM từ phân tích thừa số nguyên tố
 */
export const lcmFromFactorization = (
  factorsA: { prime: number; power: number }[],
  factorsB: { prime: number; power: number }[]
): { prime: number; power: number }[] => {
  const lcmFactors: { prime: number; power: number }[] = [];

  // Tạo map cho factorsA và factorsB
  const mapA = new Map(factorsA.map((f) => [f.prime, f.power]));
  const mapB = new Map(factorsB.map((f) => [f.prime, f.power]));

  // Tập hợp tất cả các số nguyên tố
  const allPrimes = new Set([...mapA.keys(), ...mapB.keys()]);

  // Tính max power cho mỗi số nguyên tố
  for (const prime of allPrimes) {
    const powerA = mapA.get(prime) || 0;
    const powerB = mapB.get(prime) || 0;
    const maxPower = Math.max(powerA, powerB);
    lcmFactors.push({ prime, power: maxPower });
  }

  return lcmFactors.sort((a, b) => a.prime - b.prime);
};

/**
 * Tính giá trị số từ phân tích thừa số
 */
export const calculateFromFactors = (
  factors: { prime: number; power: number }[]
): number =>
  factors.reduce(
    (result, { prime, power }) => result * Math.pow(prime, power),
    1
  );

/**
 * Tính GCD và LCM với phân tích thừa số
 */
export const gcdLcmWithFactorization = (a: number, b: number): GcdLcmPair => {
  const factorsA = primeFactorization(a);
  const factorsB = primeFactorization(b);

  const gcdFactors = gcdFromFactorization(factorsA.factors, factorsB.factors);
  const lcmFactors = lcmFromFactorization(factorsA.factors, factorsB.factors);

  const gcd = calculateFromFactors(gcdFactors);
  const lcm = calculateFromFactors(lcmFactors);

  return {
    a,
    b,
    gcd,
    lcm,
    gcdFactors,
    lcmFactors,
  };
};

/**
 * Tính số Euler totient φ(n)
 */
export const eulerTotient = (n: number): number => {
  const factors = primeFactorization(n);
  return factors.factors.reduce(
    (result, { prime, power }) =>
      result * (Math.pow(prime, power) - Math.pow(prime, power - 1)),
    1
  );
};

/**
 * Tìm tất cả ước số từ phân tích thừa số nguyên tố
 */
export const getDivisorsFromFactorization = (
  factors: { prime: number; power: number }[]
): number[] => {
  const divisors: number[] = [1];

  for (const { prime, power } of factors) {
    const newDivisors: number[] = [];
    for (let p = 1; p <= power; p++) {
      const primePower = Math.pow(prime, p);
      for (const divisor of divisors) {
        newDivisors.push(divisor * primePower);
      }
    }
    divisors.push(...newDivisors);
  }

  return divisors.sort((a, b) => a - b);
};
