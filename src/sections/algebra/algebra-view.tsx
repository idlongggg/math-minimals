'use client';

import { paths } from 'src/routes/paths';
import {
  SubjectTabsView,
  type TopicItem,
} from 'src/components/subject-tabs-view';

const ALGEBRA_TOPICS: TopicItem[] = [
  {
    id: 'basic-expressions',
    title: 'Biểu thức đại số',
    description:
      'Học về biểu thức đại số, phép toán cơ bản và rút gọn biểu thức',
    path: paths.dashboard.algebra.basic.expressions,
    icon: 'solar:calculator-bold',
    color: '#3b82f6',
  },
  {
    id: 'equations',
    title: 'Phương trình',
    description: 'Giải các phương trình bậc nhất, bậc hai và hệ phương trình',
    path: paths.dashboard.algebra.basic.equations,
    icon: 'solar:calculator-bold',
    color: '#10b981',
  },
  {
    id: 'inequalities',
    title: 'Bất phương trình',
    description: 'Giải và biểu diễn bất phương trình trên trục số',
    path: paths.dashboard.algebra.basic.inequalities,
    icon: 'solar:calculator-bold',
    color: '#f59e0b',
  },
  {
    id: 'factoring',
    title: 'Phân tích thừa số',
    description: 'Phân tích đa thức thành tích các thừa số',
    path: paths.dashboard.algebra.basic.factoring,
    icon: 'solar:calculator-bold',
    color: '#ef4444',
  },
  {
    id: 'polynomials',
    title: 'Đa thức',
    description: 'Các phép toán với đa thức và tính chất của đa thức',
    path: paths.dashboard.algebra.basic.polynomials,
    icon: 'solar:calculator-bold',
    color: '#8b5cf6',
  },
  {
    id: 'functions',
    title: 'Hàm số và đồ thị',
    description: 'Các loại hàm số và cách vẽ đồ thị hàm số',
    path: paths.dashboard.algebra.functions.root,
    icon: 'solar:chart-bold',
    color: '#06b6d4',
  },
  {
    id: 'linear-algebra',
    title: 'Đại số tuyến tính',
    description: 'Ma trận, định thức và hệ phương trình tuyến tính',
    path: paths.dashboard.algebra.linear.root,
    icon: 'solar:calculator-bold',
    color: '#ec4899',
  },
];

export function AlgebraView() {
  return (
    <SubjectTabsView
      title="Đại số và giải tích"
      description="Khám phá thế giới đại số từ cơ bản đến nâng cao với các công cụ giải phương trình, phân tích đa thức và hàm số."
      subjectTitle="Đại số và giải tích"
      subjectDescription="Đại số là một nhánh quan trọng của toán học, nghiên cứu về các cấu trúc toán học trừu tượng và các quy tắc thao tác với chúng. Từ đại số cơ bản đến đại số tuyến tính và giải tích hàm số."
      topics={ALGEBRA_TOPICS}
    />
  );
}
