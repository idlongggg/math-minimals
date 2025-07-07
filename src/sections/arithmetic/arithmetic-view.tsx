'use client';

import { paths } from 'src/routes/paths';

import type { TopicItem } from 'src/components/subject-tabs/types';

import { SubjectView } from 'src/components/subject-tabs';

// ----------------------------------------------------------------------

const ARITHMETIC_TOPICS: TopicItem[] = [
  {
    id: 'base-conversion',
    title: 'Chuyển đổi cơ số',
    description:
      'Chuyển đổi giữa các hệ cơ số khác nhau (nhị phân, bát phân, thập phân, thập lục phân)',
    path: paths.dashboard.arithmetic.baseConversion,
    icon: 'solar:refresh-circle-bold',
    color: '#3b82f6',
  },
  {
    id: 'common-denominator',
    title: 'Mẫu số chung',
    description: 'Tìm mẫu số chung nhỏ nhất và quy đồng phân số',
    path: paths.dashboard.arithmetic.commonDenominator,
    icon: 'solar:calculator-bold',
    color: '#10b981',
  },
  {
    id: 'division-remainder',
    title: 'Phép chia và số dư',
    description: 'Thực hiện phép chia có dư và phân tích thuật toán Euclid',
    path: paths.dashboard.arithmetic.divisionRemainder,
    icon: 'solar:calculator-bold',
    color: '#f59e0b',
  },
  {
    id: 'prime-numbers',
    title: 'Số nguyên tố',
    description: 'Kiểm tra số nguyên tố, tìm các số nguyên tố trong khoảng',
    path: paths.dashboard.arithmetic.primeNumbers,
    icon: 'solar:atom-bold',
    color: '#ef4444',
  },
  {
    id: 'factors-irrationals',
    title: 'Thừa số và số vô tỷ',
    description: 'Phân tích thừa số nguyên tố và làm việc với số vô tỷ',
    path: paths.dashboard.arithmetic.factorsIrrationals,
    icon: 'solar:calculator-bold',
    color: '#8b5cf6',
  },
  {
    id: 'divisors-multiples',
    title: 'Ước số và bội số',
    description: 'Tìm ước số, bội số, ƯCLN và BCNN',
    path: paths.dashboard.arithmetic.divisorsMultiples,
    icon: 'solar:calculator-bold',
    color: '#06b6d4',
  },
  {
    id: 'fractions',
    title: 'Phân số & Chuyển đổi',
    description: 'Chuyển đổi giữa phân số, số thập phân và phần trăm',
    path: paths.dashboard.arithmetic.fractions,
    icon: 'solar:calculator-bold',
    color: '#ec4899',
  },
];

// ----------------------------------------------------------------------

export function ArithmeticView() {
  return (
    <SubjectView
      title="Số học cơ bản"
      description="Học và thực hành các khái niệm số học cơ bản: chuyển đổi cơ số, số nguyên tố, phân số và nhiều hơn nữa."
      subjectTitle="Số học cơ bản"
      subjectDescription="Số học cơ bản là nền tảng của toán học, bao gồm các phép toán cơ bản với số tự nhiên, số nguyên, phân số và số thập phân. Tại đây bạn sẽ học về các khái niệm cơ bản như chuyển đổi hệ cơ số, số nguyên tố, ước số, bội số và các phép toán với phân số."
      topics={ARITHMETIC_TOPICS}
    />
  );
}
