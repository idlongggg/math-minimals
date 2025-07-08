import { redirect } from 'next/navigation';

import { CONFIG } from 'src/global-config';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Math Tool - ${CONFIG.appName}` };

type Props = {
  params: { slug: string[] };
};

export default function Page({ params }: Props) {
  const { slug } = params;
  const path = slug.join('/');

  // Auto redirect rules
  const redirectRules: Record<string, string> = {
    'tools': '/dashboard/tools/calculators/basic',
    'tools/calculators': '/dashboard/tools/calculators/basic',
    'tools/converters': '/dashboard/tools/converters/units',
    'tools/generators': '/dashboard/tools/generators/random',
    'tools/solvers': '/dashboard/tools/solvers/differential',
    'arithmetic': '/dashboard/arithmetic/base-conversion',
    'algebra': '/dashboard/algebra/basic/expressions',
    'algebra/basic': '/dashboard/algebra/basic/expressions',
    'algebra/functions': '/dashboard/algebra/functions/linear',
    'algebra/linear': '/dashboard/algebra/linear/matrix',
    'calculus': '/dashboard/calculus/derivative',
    'geometry': '/dashboard/geometry/plane/points-segments',
    'geometry/plane': '/dashboard/geometry/plane/points-segments',
    'geometry/spatial': '/dashboard/geometry/spatial/prisms',
    'geometry/coordinate': '/dashboard/geometry/coordinate/cartesian',
    'trigonometry': '/dashboard/trigonometry/basic/ratios',
    'trigonometry/basic': '/dashboard/trigonometry/basic/ratios',
    'statistics': '/dashboard/statistics/charts/pictograph',
    'statistics/charts': '/dashboard/statistics/charts/pictograph',
    'statistics/descriptive': '/dashboard/statistics/descriptive/central-tendency',
    'statistics/probability': '/dashboard/statistics/probability/basic',
    'statistics/distributions': '/dashboard/statistics/distributions/discrete',
  };

  // Check if current path needs redirect
  if (redirectRules[path]) {
    redirect(redirectRules[path]);
  }

  return <BlankView title="Math Tool" />;
}
