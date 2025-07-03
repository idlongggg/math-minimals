import type { QuickExample, QuickPair } from './types';

// Các ví dụ nhanh cho số đơn lẻ
export const QUICK_EXAMPLES: QuickExample[] = [
  { label: 'Số nhỏ', example: '12' },
  { label: 'Số nguyên tố', example: '17' },
  { label: 'Số chính phương', example: '36' },
  { label: 'Số lớn', example: '60' },
  { label: 'Số có nhiều ước', example: '120' },
  { label: 'Lũy thừa của 2', example: '64' },
];

// Các cặp số để tính GCD/LCM
export const QUICK_PAIRS: QuickPair[] = [
  { label: 'Cặp đơn giản', a: '12', b: '18' },
  { label: 'Số nguyên tố cùng nhau', a: '15', b: '28' },
  { label: 'Một số bội của số kia', a: '24', b: '8' },
  { label: 'Hai số lớn', a: '48', b: '72' },
];
