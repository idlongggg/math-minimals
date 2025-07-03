// Types for divisors and multiples functionality

export interface DivisorResult {
  number: number;
  divisors: number[];
  divisorCount: number;
  divisorSum: number;
  isPrime: boolean;
  isPerfectSquare: boolean;
  isPerfectNumber: boolean;
  properDivisors: number[];
}

export interface MultipleResult {
  number: number;
  multiples: number[];
  count: number;
  limit: number;
}

export interface GcdLcmResult {
  a: number;
  b: number;
  gcd: number;
  lcm: number;
  steps: {
    step: number;
    description: string;
    calculation: string;
    result: string;
  }[];
}

export interface HistoryItem {
  id: string;
  type: 'divisor' | 'multiple' | 'gcd-lcm';
  data: any;
  timestamp: Date;
}

export interface QuickExample {
  label: string;
  example: string;
}

export interface QuickPair {
  label: string;
  a: string;
  b: string;
}
