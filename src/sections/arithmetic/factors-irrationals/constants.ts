import type { QuickPair, IrrationalNumber, QuickFactorization } from './types';

export const QUICK_FACTORIZATIONS: QuickFactorization[] = [
  { label: 'Số nhỏ', example: '12' },
  { label: 'Số nguyên tố', example: '17' },
  { label: 'Lũy thừa hoàn hảo', example: '64' },
  { label: 'Số lớn', example: '360' },
  { label: 'Số có nhiều thừa số', example: '120' },
  { label: 'Số chính phương', example: '144' },
];

export const QUICK_GCD_LCM: QuickPair[] = [
  { label: 'Hai số đơn giản', a: '12', b: '18' },
  { label: 'Hai số nguyên tố cùng nhau', a: '15', b: '28' },
  { label: 'Một số là bội của số kia', a: '24', b: '8' },
  { label: 'Hai số lớn', a: '48', b: '72' },
];

export const COMMON_IRRATIONALS: IrrationalNumber[] = [
  {
    name: 'π (Pi)',
    value: Math.PI,
    latex: '\\pi',
    description: 'Tỉ số chu vi và đường kính hình tròn',
  },
  {
    name: 'e (Euler)',
    value: Math.E,
    latex: 'e',
    description: 'Cơ số logarit tự nhiên',
  },
  {
    name: '√2',
    value: Math.sqrt(2),
    latex: '\\sqrt{2}',
    description: 'Căn bậc hai của 2',
  },
  {
    name: '√3',
    value: Math.sqrt(3),
    latex: '\\sqrt{3}',
    description: 'Căn bậc hai của 3',
  },
  {
    name: '√5',
    value: Math.sqrt(5),
    latex: '\\sqrt{5}',
    description: 'Căn bậc hai của 5',
  },
  {
    name: 'φ (Golden ratio)',
    value: (1 + Math.sqrt(5)) / 2,
    latex: '\\phi = \\frac{1 + \\sqrt{5}}{2}',
    description: 'Tỉ lệ vàng',
  },
  {
    name: '√π',
    value: Math.sqrt(Math.PI),
    latex: '\\sqrt{\\pi}',
    description: 'Căn bậc hai của π',
  },
  {
    name: 'ln(2)',
    value: Math.log(2),
    latex: '\\ln(2)',
    description: 'Logarit tự nhiên của 2',
  },
];
