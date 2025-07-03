// Types for division with remainder functionality

export interface DivisionResult {
  quotient: number;
  remainder: number;
  steps: Array<{
    step: number;
    description: string;
    calculation: string;
    result: string;
  }>;
}

export interface HistoryItem {
  id: string;
  dividend: number;
  divisor: number;
  result: DivisionResult;
  timestamp: Date;
}

export interface QuickExample {
  dividend: number;
  divisor: number;
  description: string;
}
