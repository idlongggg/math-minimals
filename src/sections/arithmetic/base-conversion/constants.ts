// Constants for base conversion functionality

import type { BaseInfo, QuickConversion } from './types';

export const QUICK_CONVERSIONS: QuickConversion[] = [
  { label: 'Thập phân → Nhị phân', from: 10, to: 2, example: '255' },
  { label: 'Thập phân → Thập lục phân', from: 10, to: 16, example: '255' },
  { label: 'Nhị phân → Thập phân', from: 2, to: 10, example: '11111111' },
  { label: 'Thập lục phân → Thập phân', from: 16, to: 10, example: 'FF' },
  { label: 'Bát phân → Thập phân', from: 8, to: 10, example: '377' },
  { label: 'Thập phân → Bát phân', from: 10, to: 8, example: '255' },
];

export const BASE_NAMES: Record<number, string> = {
  2: 'Nhị phân (Binary)',
  8: 'Bát phân (Octal)',
  10: 'Thập phân (Decimal)',
  16: 'Thập lục phân (Hexadecimal)',
  3: 'Tam phân (Ternary)',
  4: 'Tứ phân (Quaternary)',
  5: 'Ngũ phân (Quinary)',
  6: 'Lục phân (Senary)',
  7: 'Thất phân (Septenary)',
  9: 'Cửu phân (Nonary)',
  11: 'Thập nhất phân (Undecimal)',
  12: 'Thập nhị phân (Duodecimal)',
};

export const BASE_LATEX_NOTATION: Record<number, string> = {
  2: '_{(2)}',
  8: '_{(8)}',
  10: '_{(10)}',
  16: '_{(16)}',
  3: '_{(3)}',
  4: '_{(4)}',
  5: '_{(5)}',
  6: '_{(6)}',
  7: '_{(7)}',
  9: '_{(9)}',
  11: '_{(11)}',
  12: '_{(12)}',
};

export const COMMON_BASES = [2, 8, 10, 16] as const;
export const ALL_BASES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16] as const;

export const BASE_INFO: BaseInfo[] = [
  {
    base: 2,
    name: 'Nhị phân (Binary)',
    description: 'Hệ cơ số 2, chỉ sử dụng các chữ số 0 và 1',
    digits: '0, 1',
    examples: ['101', '1111', '10101'],
  },
  {
    base: 8,
    name: 'Bát phân (Octal)',
    description: 'Hệ cơ số 8, sử dụng các chữ số từ 0 đến 7',
    digits: '0, 1, 2, 3, 4, 5, 6, 7',
    examples: ['377', '123', '777'],
  },
  {
    base: 10,
    name: 'Thập phân (Decimal)',
    description: 'Hệ cơ số 10, sử dụng các chữ số từ 0 đến 9',
    digits: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
    examples: ['255', '123', '999'],
  },
  {
    base: 16,
    name: 'Thập lục phân (Hexadecimal)',
    description: 'Hệ cơ số 16, sử dụng các chữ số từ 0 đến 9 và A đến F',
    digits: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F',
    examples: ['FF', 'ABC', '123'],
  },
];

export const MAX_HISTORY_ITEMS = 50;
export const DIGITS_MAP = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
