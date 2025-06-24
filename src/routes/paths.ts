// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    // Đại số và giải tích
    algebra: {
      root: `${ROOTS.DASHBOARD}/algebra`,
      // Đại số
      algebraCore: {
        root: `${ROOTS.DASHBOARD}/algebra/core`,
        baseConversion: `${ROOTS.DASHBOARD}/algebra/core/base-conversion`,
        solveEquations: `${ROOTS.DASHBOARD}/algebra/core/solve-equations`,
        expandEquations: `${ROOTS.DASHBOARD}/algebra/core/expand-equations`,
        commonDenominator: `${ROOTS.DASHBOARD}/algebra/core/common-denominator`,
        divisionRemainder: `${ROOTS.DASHBOARD}/algebra/core/division-remainder`,
        primeNumbers: `${ROOTS.DASHBOARD}/algebra/core/prime-numbers`,
        vectorProduct: `${ROOTS.DASHBOARD}/algebra/core/vector-product`,
        factorsIrrationals: `${ROOTS.DASHBOARD}/algebra/core/factors-irrationals`,
        divisorsMultiples: `${ROOTS.DASHBOARD}/algebra/core/divisors-multiples`,
      },
      // Đồ thị
      graphs: {
        root: `${ROOTS.DASHBOARD}/algebra/graphs`,
        quadratic: `${ROOTS.DASHBOARD}/algebra/graphs/quadratic`,
        cubic: `${ROOTS.DASHBOARD}/algebra/graphs/cubic`,
        radical: `${ROOTS.DASHBOARD}/algebra/graphs/radical`,
        exponential: `${ROOTS.DASHBOARD}/algebra/graphs/exponential`,
        logarithmic: `${ROOTS.DASHBOARD}/algebra/graphs/logarithmic`,
        trigonometric: `${ROOTS.DASHBOARD}/algebra/graphs/trigonometric`,
        limit: `${ROOTS.DASHBOARD}/algebra/graphs/limit`,
        modulus: `${ROOTS.DASHBOARD}/algebra/graphs/modulus`,
        linear: `${ROOTS.DASHBOARD}/algebra/graphs/linear`,
      },
    },
    // Xác suất và thống kê
    statistics: {
      root: `${ROOTS.DASHBOARD}/statistics`,
      // Biểu đồ
      charts: {
        root: `${ROOTS.DASHBOARD}/statistics/charts`,
        pictograph: `${ROOTS.DASHBOARD}/statistics/charts/pictograph`,
        line: `${ROOTS.DASHBOARD}/statistics/charts/line`,
        area: `${ROOTS.DASHBOARD}/statistics/charts/area`,
        singleColumn: `${ROOTS.DASHBOARD}/statistics/charts/single-column`,
        doubleColumn: `${ROOTS.DASHBOARD}/statistics/charts/double-column`,
        stackedColumn: `${ROOTS.DASHBOARD}/statistics/charts/stacked-column`,
        pie: `${ROOTS.DASHBOARD}/statistics/charts/pie`,
        frequencyTable: `${ROOTS.DASHBOARD}/statistics/charts/frequency-table`,
      },
      // Thống kê
      stats: {
        root: `${ROOTS.DASHBOARD}/statistics/stats`,
        interpolation: `${ROOTS.DASHBOARD}/statistics/stats/interpolation`,
        standardDeviation: `${ROOTS.DASHBOARD}/statistics/stats/standard-deviation`,
        regression: `${ROOTS.DASHBOARD}/statistics/stats/regression`,
        correlation: `${ROOTS.DASHBOARD}/statistics/stats/correlation`,
        regressionAnalysis: `${ROOTS.DASHBOARD}/statistics/stats/regression-analysis`,
        testing: `${ROOTS.DASHBOARD}/statistics/stats/testing`,
        sampleVariance: `${ROOTS.DASHBOARD}/statistics/stats/sample-variance`,
        meanMedian: `${ROOTS.DASHBOARD}/statistics/stats/mean-median`,
        sigma: `${ROOTS.DASHBOARD}/statistics/stats/sigma`,
      },
      // Xác suất
      probability: {
        root: `${ROOTS.DASHBOARD}/statistics/probability`,
        normal: `${ROOTS.DASHBOARD}/statistics/probability/normal`,
        student: `${ROOTS.DASHBOARD}/statistics/probability/student`,
        cauchy: `${ROOTS.DASHBOARD}/statistics/probability/cauchy`,
        weibull: `${ROOTS.DASHBOARD}/statistics/probability/weibull`,
        gamma: `${ROOTS.DASHBOARD}/statistics/probability/gamma`,
        logNormal: `${ROOTS.DASHBOARD}/statistics/probability/log-normal`,
        logistic: `${ROOTS.DASHBOARD}/statistics/probability/logistic`,
        binomial: `${ROOTS.DASHBOARD}/statistics/probability/binomial`,
        pascal: `${ROOTS.DASHBOARD}/statistics/probability/pascal`,
        poisson: `${ROOTS.DASHBOARD}/statistics/probability/poisson`,
        hypergeometric: `${ROOTS.DASHBOARD}/statistics/probability/hypergeometric`,
      },
    },
    // Hình học và đo lường
    geometry: {
      root: `${ROOTS.DASHBOARD}/geometry`,
      // Hình học mặt phẳng
      plane: {
        root: `${ROOTS.DASHBOARD}/geometry/plane`,
        pointsSegments: `${ROOTS.DASHBOARD}/geometry/plane/points-segments`,
        lines: `${ROOTS.DASHBOARD}/geometry/plane/lines`,
        angles: `${ROOTS.DASHBOARD}/geometry/plane/angles`,
        triangles: `${ROOTS.DASHBOARD}/geometry/plane/triangles`,
        parallelograms: `${ROOTS.DASHBOARD}/geometry/plane/parallelograms`,
        rectangles: `${ROOTS.DASHBOARD}/geometry/plane/rectangles`,
        rhombuses: `${ROOTS.DASHBOARD}/geometry/plane/rhombuses`,
        squares: `${ROOTS.DASHBOARD}/geometry/plane/squares`,
        polygons: `${ROOTS.DASHBOARD}/geometry/plane/polygons`,
        circles: `${ROOTS.DASHBOARD}/geometry/plane/circles`,
      },
      // Hình học không gian
      spatial: {
        root: `${ROOTS.DASHBOARD}/geometry/spatial`,
        cubes: `${ROOTS.DASHBOARD}/geometry/spatial/cubes`,
        rectangularPrisms: `${ROOTS.DASHBOARD}/geometry/spatial/rectangular-prisms`,
        cylinders: `${ROOTS.DASHBOARD}/geometry/spatial/cylinders`,
        cones: `${ROOTS.DASHBOARD}/geometry/spatial/cones`,
        pyramids: `${ROOTS.DASHBOARD}/geometry/spatial/pyramids`,
        spheres: `${ROOTS.DASHBOARD}/geometry/spatial/spheres`,
      },
    },
  },
};
