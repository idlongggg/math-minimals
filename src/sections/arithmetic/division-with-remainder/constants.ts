// Constants for division with remainder functionality

import type { QuickExample } from './types';

export const QUICK_EXAMPLES: QuickExample[] = [
  { dividend: 17, divisor: 5, description: 'Chia đơn giản' },
  { dividend: 100, divisor: 7, description: 'Chia có dư lớn' },
  { dividend: 256, divisor: 15, description: 'Chia số lớn' },
  { dividend: 1000, divisor: 23, description: 'Chia phức tạp' },
  { dividend: 75, divisor: 8, description: 'Chia thông thường' },
  { dividend: 144, divisor: 11, description: 'Chia có dư nhỏ' },
];

export const TABLE_DIVISORS = [3, 4, 5] as const;
export const TABLE_START_NUMBER = 10;
export const TABLE_ROWS_COUNT = 15;
export const MAX_HISTORY_ITEMS = 50;
