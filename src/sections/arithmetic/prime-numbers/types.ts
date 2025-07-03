// Types for prime numbers functionality

export interface PrimeCheckResult {
  number: number;
  isPrime: boolean;
  factors?: number[];
  explanation: string;
}

export interface HistoryItem {
  id: string;
  number: number;
  isPrime: boolean;
  timestamp: Date;
}

export interface QuickCheck {
  label: string;
  example: string;
}

export interface PrimeGenerationOptions {
  start: number;
  end: number;
  limit?: number;
}

export interface SieveStep {
  step: number;
  description: string;
  crossedOut: number[];
  remaining: number[];
}
