// Types for base conversion functionality

export interface ConversionResult {
  input: string;
  fromBase: number;
  toBase: number;
  result: string;
  steps?: Array<{
    step: number;
    description: string;
    calculation: string;
    result: string;
  }>;
}

export interface HistoryItem {
  id: string;
  input: string;
  fromBase: number;
  toBase: number;
  result: string;
  timestamp: Date;
}

export interface QuickConversion {
  label: string;
  from: number;
  to: number;
  example: string;
}

export interface BaseInfo {
  base: number;
  name: string;
  description: string;
  digits: string;
  examples: string[];
}
