// Types for factors and irrationals functionality

export interface PrimeFactorization {
  number: number;
  factors: { prime: number; power: number }[];
  factorString: string;
  isSquareFree: boolean;
  isPrimePower: boolean;
}

export interface IrrationalNumber {
  name: string;
  value: number;
  latex: string;
  description: string;
}

export interface GcdLcmPair {
  a: number;
  b: number;
  gcd: number;
  lcm: number;
  gcdFactors: { prime: number; power: number }[];
  lcmFactors: { prime: number; power: number }[];
}

export interface HistoryItem {
  id: string;
  type: 'factorization' | 'gcd-lcm' | 'irrational';
  data: any;
  timestamp: Date;
}

export interface QuickFactorization {
  label: string;
  example: string;
}

export interface QuickPair {
  label: string;
  a: string;
  b: string;
}
