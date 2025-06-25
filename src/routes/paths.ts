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
    // Công cụ toán học
    tools: {
      root: `${ROOTS.DASHBOARD}/tools`,
      // Máy tính
      calculators: {
        root: `${ROOTS.DASHBOARD}/tools/calculators`,
        basic: `${ROOTS.DASHBOARD}/tools/calculators/basic`,
        scientific: `${ROOTS.DASHBOARD}/tools/calculators/scientific`,
        graphing: `${ROOTS.DASHBOARD}/tools/calculators/graphing`,
        matrix: `${ROOTS.DASHBOARD}/tools/calculators/matrix`,
        complex: `${ROOTS.DASHBOARD}/tools/calculators/complex`,
        derivative: `${ROOTS.DASHBOARD}/tools/calculators/derivative`,
        integral: `${ROOTS.DASHBOARD}/tools/calculators/integral`,
        limit: `${ROOTS.DASHBOARD}/tools/calculators/limit`,
        sequence: `${ROOTS.DASHBOARD}/tools/calculators/sequence`,
      },
      // Công cụ chuyển đổi
      converters: {
        root: `${ROOTS.DASHBOARD}/tools/converters`,
        units: `${ROOTS.DASHBOARD}/tools/converters/units`,
        coordinates: `${ROOTS.DASHBOARD}/tools/converters/coordinates`,
        angle: `${ROOTS.DASHBOARD}/tools/converters/angle`,
      },
      // Giải phương trình
      solvers: {
        root: `${ROOTS.DASHBOARD}/tools/solvers`,
        equation: `${ROOTS.DASHBOARD}/tools/solvers/equation`,
        system: `${ROOTS.DASHBOARD}/tools/solvers/system`,
        inequality: `${ROOTS.DASHBOARD}/tools/solvers/inequality`,
        differential: `${ROOTS.DASHBOARD}/tools/solvers/differential`,
        optimization: `${ROOTS.DASHBOARD}/tools/solvers/optimization`,
      },
      // Trình tạo
      generators: {
        root: `${ROOTS.DASHBOARD}/tools/generators`,
        random: `${ROOTS.DASHBOARD}/tools/generators/random`,
        prime: `${ROOTS.DASHBOARD}/tools/generators/prime`,
        fibonacci: `${ROOTS.DASHBOARD}/tools/generators/fibonacci`,
        pattern: `${ROOTS.DASHBOARD}/tools/generators/pattern`,
        graph: `${ROOTS.DASHBOARD}/tools/generators/graph`,
      },
    },
    // Số học cơ bản
    arithmetic: {
      root: `${ROOTS.DASHBOARD}/arithmetic`,
      baseConversion: `${ROOTS.DASHBOARD}/arithmetic/base-conversion`,
      commonDenominator: `${ROOTS.DASHBOARD}/arithmetic/common-denominator`,
      divisionRemainder: `${ROOTS.DASHBOARD}/arithmetic/division-with-remainder`,
      primeNumbers: `${ROOTS.DASHBOARD}/arithmetic/prime-numbers`,
      factorsIrrationals: `${ROOTS.DASHBOARD}/arithmetic/factors-irrationals`,
      divisorsMultiples: `${ROOTS.DASHBOARD}/arithmetic/divisors-multiples`,
      fractions: `${ROOTS.DASHBOARD}/arithmetic/fractions`,
    },
    // Đại số
    algebra: {
      root: `${ROOTS.DASHBOARD}/algebra`,
      // Đại số cơ bản
      basic: {
        root: `${ROOTS.DASHBOARD}/algebra/basic`,
        expressions: `${ROOTS.DASHBOARD}/algebra/basic/expressions`,
        equations: `${ROOTS.DASHBOARD}/algebra/basic/equations`,
        inequalities: `${ROOTS.DASHBOARD}/algebra/basic/inequalities`,
        factoring: `${ROOTS.DASHBOARD}/algebra/basic/factoring`,
        polynomials: `${ROOTS.DASHBOARD}/algebra/basic/polynomials`,
      },
      // Đồ thị và hàm số
      functions: {
        root: `${ROOTS.DASHBOARD}/algebra/functions`,
        linear: `${ROOTS.DASHBOARD}/algebra/functions/linear`,
        quadratic: `${ROOTS.DASHBOARD}/algebra/functions/quadratic`,
        polynomial: `${ROOTS.DASHBOARD}/algebra/functions/polynomial`,
        rational: `${ROOTS.DASHBOARD}/algebra/functions/rational`,
        exponential: `${ROOTS.DASHBOARD}/algebra/functions/exponential`,
        logarithmic: `${ROOTS.DASHBOARD}/algebra/functions/logarithmic`,
        trigonometric: `${ROOTS.DASHBOARD}/algebra/functions/trigonometric`,
        inverse: `${ROOTS.DASHBOARD}/algebra/functions/inverse`,
        composite: `${ROOTS.DASHBOARD}/algebra/functions/composite`,
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
        quadrilaterals: `${ROOTS.DASHBOARD}/geometry/plane/quadrilaterals`,
        polygons: `${ROOTS.DASHBOARD}/geometry/plane/polygons`,
        circles: `${ROOTS.DASHBOARD}/geometry/plane/circles`,
        conics: `${ROOTS.DASHBOARD}/geometry/plane/conics`,
      },
      // Hình học không gian
      spatial: {
        root: `${ROOTS.DASHBOARD}/geometry/spatial`,
        prisms: `${ROOTS.DASHBOARD}/geometry/spatial/prisms`,
        pyramids: `${ROOTS.DASHBOARD}/geometry/spatial/pyramids`,
        cylinders: `${ROOTS.DASHBOARD}/geometry/spatial/cylinders`,
        cones: `${ROOTS.DASHBOARD}/geometry/spatial/cones`,
        spheres: `${ROOTS.DASHBOARD}/geometry/spatial/spheres`,
        surfaces: `${ROOTS.DASHBOARD}/geometry/spatial/surfaces`,
      },
      // Hình học tọa độ
      coordinate: {
        root: `${ROOTS.DASHBOARD}/geometry/coordinate`,
        cartesian: `${ROOTS.DASHBOARD}/geometry/coordinate/cartesian`,
        polar: `${ROOTS.DASHBOARD}/geometry/coordinate/polar`,
        parametric: `${ROOTS.DASHBOARD}/geometry/coordinate/parametric`,
        vectors: `${ROOTS.DASHBOARD}/geometry/coordinate/vectors`,
      },
    },
    // Lượng giác
    trigonometry: {
      root: `${ROOTS.DASHBOARD}/trigonometry`,
      // Lượng giác cơ bản
      basic: {
        root: `${ROOTS.DASHBOARD}/trigonometry/basic`,
        ratios: `${ROOTS.DASHBOARD}/trigonometry/basic/ratios`,
        identities: `${ROOTS.DASHBOARD}/trigonometry/basic/identities`,
        equations: `${ROOTS.DASHBOARD}/trigonometry/basic/equations`,
        graphs: `${ROOTS.DASHBOARD}/trigonometry/basic/graphs`,
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
        histogram: `${ROOTS.DASHBOARD}/statistics/charts/histogram`,
        boxplot: `${ROOTS.DASHBOARD}/statistics/charts/boxplot`,
        scatter: `${ROOTS.DASHBOARD}/statistics/charts/scatter`,
      },
      // Thống kê mô tả
      descriptive: {
        root: `${ROOTS.DASHBOARD}/statistics/descriptive`,
        centralTendency: `${ROOTS.DASHBOARD}/statistics/descriptive/central-tendency`,
        dispersion: `${ROOTS.DASHBOARD}/statistics/descriptive/dispersion`,
        distribution: `${ROOTS.DASHBOARD}/statistics/descriptive/distribution`,
        correlation: `${ROOTS.DASHBOARD}/statistics/descriptive/correlation`,
        regression: `${ROOTS.DASHBOARD}/statistics/descriptive/regression`,
      },
      // Xác suất
      probability: {
        root: `${ROOTS.DASHBOARD}/statistics/probability`,
        basic: `${ROOTS.DASHBOARD}/statistics/probability/basic`,
        conditional: `${ROOTS.DASHBOARD}/statistics/probability/conditional`,
        bayes: `${ROOTS.DASHBOARD}/statistics/probability/bayes`,
        distributions: {
          root: `${ROOTS.DASHBOARD}/statistics/probability/distributions`,
          discrete: `${ROOTS.DASHBOARD}/statistics/probability/distributions/discrete`,
          continuous: `${ROOTS.DASHBOARD}/statistics/probability/distributions/continuous`,
          normal: `${ROOTS.DASHBOARD}/statistics/probability/distributions/normal`,
          binomial: `${ROOTS.DASHBOARD}/statistics/probability/distributions/binomial`,
        },
      },
    },
  },
};
