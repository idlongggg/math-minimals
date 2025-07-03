// Định nghĩa các types cho phân số
export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
  type: string;
}

export interface QuickOperation {
  label: string;
  operation: string;
  fractions: Fraction[];
}
