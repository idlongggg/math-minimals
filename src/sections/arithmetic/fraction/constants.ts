import type { QuickOperation } from './types';

// Các phép toán nhanh được định nghĩa sẵn
export const QUICK_OPERATIONS: QuickOperation[] = [
  {
    label: '1/2 + 1/3',
    operation: 'add',
    fractions: [
      { numerator: 1, denominator: 2 },
      { numerator: 1, denominator: 3 },
    ],
  },
  {
    label: '3/4 - 1/6',
    operation: 'subtract',
    fractions: [
      { numerator: 3, denominator: 4 },
      { numerator: 1, denominator: 6 },
    ],
  },
  {
    label: '2/3 × 3/5',
    operation: 'multiply',
    fractions: [
      { numerator: 2, denominator: 3 },
      { numerator: 3, denominator: 5 },
    ],
  },
  {
    label: '5/8 ÷ 2/3',
    operation: 'divide',
    fractions: [
      { numerator: 5, denominator: 8 },
      { numerator: 2, denominator: 3 },
    ],
  },
  {
    label: '3/4 ⇄ 0.75',
    operation: 'convert',
    fractions: [{ numerator: 3, denominator: 4 }],
  },
  {
    label: '1/5 ⇄ 20%',
    operation: 'convert',
    fractions: [{ numerator: 1, denominator: 5 }],
  },
];

// Các loại chuyển đổi được hỗ trợ
export const CONVERSION_TYPES = {
  fraction: 'Phân số',
  decimal: 'Số thập phân',
  percentage: 'Phần trăm',
} as const;
