import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auto redirect rules for dashboard paths
  const redirectRules: Record<string, string> = {
    '/dashboard/tools': '/dashboard/tools/calculators/basic',
    '/dashboard/tools/calculators': '/dashboard/tools/calculators/basic',
    '/dashboard/tools/converters': '/dashboard/tools/converters/units',
    '/dashboard/tools/generators': '/dashboard/tools/generators/random',
    '/dashboard/tools/solvers': '/dashboard/tools/solvers/differential',
    '/dashboard/arithmetic': '/dashboard/arithmetic/base-conversion',
    '/dashboard/algebra': '/dashboard/algebra/basic/expressions',
    '/dashboard/algebra/basic': '/dashboard/algebra/basic/expressions',
    '/dashboard/algebra/functions': '/dashboard/algebra/functions/linear',
    '/dashboard/algebra/linear': '/dashboard/algebra/linear/matrix',
    '/dashboard/calculus': '/dashboard/calculus/derivative',
    '/dashboard/geometry': '/dashboard/geometry/plane/points-segments',
    '/dashboard/geometry/plane': '/dashboard/geometry/plane/points-segments',
    '/dashboard/geometry/spatial': '/dashboard/geometry/spatial/prisms',
    '/dashboard/geometry/coordinate': '/dashboard/geometry/coordinate/cartesian',
    '/dashboard/trigonometry': '/dashboard/trigonometry/basic/ratios',
    '/dashboard/trigonometry/basic': '/dashboard/trigonometry/basic/ratios',
    '/dashboard/statistics': '/dashboard/statistics/charts/pictograph',
    '/dashboard/statistics/charts': '/dashboard/statistics/charts/pictograph',
    '/dashboard/statistics/descriptive': '/dashboard/statistics/descriptive/central-tendency',
    '/dashboard/statistics/probability': '/dashboard/statistics/probability/basic',
    '/dashboard/statistics/distributions': '/dashboard/statistics/distributions/discrete',
  };

  // Check if current path needs redirect
  if (redirectRules[pathname]) {
    return NextResponse.redirect(new URL(redirectRules[pathname], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/tools',
    '/dashboard/tools/calculators',
    '/dashboard/tools/converters', 
    '/dashboard/tools/generators',
    '/dashboard/tools/solvers',
    '/dashboard/arithmetic',
    '/dashboard/algebra',
    '/dashboard/algebra/basic',
    '/dashboard/algebra/functions',
    '/dashboard/algebra/linear',
    '/dashboard/calculus',
    '/dashboard/geometry',
    '/dashboard/geometry/plane',
    '/dashboard/geometry/spatial',
    '/dashboard/geometry/coordinate',
    '/dashboard/trigonometry',
    '/dashboard/trigonometry/basic',
    '/dashboard/statistics',
    '/dashboard/statistics/charts',
    '/dashboard/statistics/descriptive',
    '/dashboard/statistics/probability',
    '/dashboard/statistics/distributions',
  ]
};
