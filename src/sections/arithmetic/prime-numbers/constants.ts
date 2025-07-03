// Constants for prime numbers functionality

import type { QuickCheck } from './types';

export const QUICK_CHECKS: QuickCheck[] = [
  { label: 'Số nguyên tố nhỏ', example: '7' },
  { label: 'Số nguyên tố lớn', example: '97' },
  { label: 'Số hợp hợp', example: '15' },
  { label: 'Số nguyên tố lớn', example: '101' },
  { label: 'Số chẵn', example: '14' },
  { label: 'Số nguyên tố đặc biệt', example: '2' },
];

// Danh sách 100 số nguyên tố đầu tiên
export const FIRST_100_PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
  421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
  509, 521, 523, 541, 547,
];

export const MAX_SAFE_NUMBER = 1000000;
export const MAX_RANGE_SIZE = 10000;
export const MAX_HISTORY_ITEMS = 50;

export const PRIME_FACTS = [
  'Số 2 là số nguyên tố duy nhất là số chẵn',
  'Có vô hạn số nguyên tố (định lý Euclid)',
  'Mọi số nguyên lớn hơn 1 đều có thể phân tích thành tích các số nguyên tố',
  'Khoảng cách giữa các số nguyên tố liên tiếp có thể rất lớn',
  'Số nguyên tố lớn nhất được biết có hàng triệu chữ số',
];
