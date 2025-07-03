// Types for common denominator functionality

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface CommonDenominatorResult {
  lcm: number;
  fractions: Fraction[];
  convertedFractions: Fraction[];
}

export interface HistoryItem {
  id: string;
  inputFractions: string[];
  lcm: number;
  fractions: Fraction[];
  convertedFractions: Fraction[];
  timestamp: Date;
}

export interface QuickExample {
  fractions: string[];
  description: string;
}
