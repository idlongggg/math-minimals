import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  // Math icons - Updated with appropriate Iconify icons
  arithmetic: icon('ic-calculator'), // Calculator for basic arithmetic
  algebra: icon('ic-function'), // Function symbol for algebra
  geometry: icon('ic-geometry'), // Geometry shapes
  statistics: icon('ic-chart-bar'), // Bar chart for statistics
  chart: icon('ic-chart-line'), // Line chart for graphs
  probability: icon('ic-dice'), // Dice for probability
  vector: icon('ic-vector'), // Vector arrows
  advanced: icon('ic-sigma'), // Sigma symbol for advanced math
  calculus: icon('ic-integral'), // Integral symbol for calculus
  trigonometry: icon('ic-triangle'), // Triangle for trigonometry
  plane: icon('ic-square'), // Square for plane geometry
  spatial: icon('ic-cube'), // Cube for spatial geometry
  distribution: icon('ic-bell-curve'), // Bell curve for distributions
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * Số học cơ bản và đại số
   */
  {
    subheader: 'Số học cơ bản và đại số',
    items: [
      {
        title: 'Số học cơ bản',
        path: paths.dashboard.algebra.arithmetic.root,
        icon: ICONS.arithmetic,
        children: [
          { title: 'Chuyển đổi cơ số', path: paths.dashboard.algebra.arithmetic.baseConversion },
          {
            title: 'Phép chia và số dư',
            path: paths.dashboard.algebra.arithmetic.divisionRemainder,
          },
          {
            title: 'Ước số và bội số',
            path: paths.dashboard.algebra.arithmetic.divisorsMultiples,
          },
          { title: 'Số nguyên tố', path: paths.dashboard.algebra.arithmetic.primeNumbers },
          {
            title: 'Thừa số và số vô tỷ',
            path: paths.dashboard.algebra.arithmetic.factorsIrrationals,
          },
          { title: 'Mẫu số chung', path: paths.dashboard.algebra.arithmetic.commonDenominator },
        ],
      },
      {
        title: 'Phương trình và đại số',
        path: paths.dashboard.algebra.algebraCore.root,
        icon: ICONS.algebra,
        children: [
          { title: 'Giải phương trình', path: paths.dashboard.algebra.algebraCore.solveEquations },
          {
            title: 'Triển khai phương trình',
            path: paths.dashboard.algebra.algebraCore.expandEquations,
          },
        ],
      },
    ],
  },
  /**
   * Hình học và đo lường
   */
  {
    subheader: 'Hình học và đo lường',
    items: [
      {
        title: 'Hình học mặt phẳng',
        path: paths.dashboard.geometry.plane.root,
        icon: ICONS.plane,
        children: [
          { title: 'Điểm và đoạn thẳng', path: paths.dashboard.geometry.plane.pointsSegments },
          { title: 'Các dạng đường thẳng', path: paths.dashboard.geometry.plane.lines },
          { title: 'Góc và phép quay', path: paths.dashboard.geometry.plane.angles },
          { title: 'Hình tam giác', path: paths.dashboard.geometry.plane.triangles },
          { title: 'Hình vuông', path: paths.dashboard.geometry.plane.squares },
          { title: 'Hình chữ nhật', path: paths.dashboard.geometry.plane.rectangles },
          { title: 'Hình bình hành', path: paths.dashboard.geometry.plane.parallelograms },
          { title: 'Hình thoi', path: paths.dashboard.geometry.plane.rhombuses },
          { title: 'Đa giác', path: paths.dashboard.geometry.plane.polygons },
          { title: 'Đường tròn', path: paths.dashboard.geometry.plane.circles },
        ],
      },
      {
        title: 'Hình học không gian',
        path: paths.dashboard.geometry.spatial.root,
        icon: ICONS.spatial,
        children: [
          { title: 'Hình lập phương', path: paths.dashboard.geometry.spatial.cubes },
          { title: 'Hình hộp chữ nhật', path: paths.dashboard.geometry.spatial.rectangularPrisms },
          { title: 'Hình trụ', path: paths.dashboard.geometry.spatial.cylinders },
          { title: 'Hình nón', path: paths.dashboard.geometry.spatial.cones },
          { title: 'Hình chóp', path: paths.dashboard.geometry.spatial.pyramids },
          { title: 'Hình cầu', path: paths.dashboard.geometry.spatial.spheres },
        ],
      },
      {
        title: 'Vector và lượng giác',
        path: paths.dashboard.algebra.algebraCore.vectorProduct,
        icon: ICONS.trigonometry,
        children: [
          { title: 'Tích vector', path: paths.dashboard.algebra.algebraCore.vectorProduct },
        ],
      },
    ],
  },
  /**
   * Hàm số và đồ thị
   */
  {
    subheader: 'Hàm số và đồ thị',
    items: [
      {
        title: 'Hàm số cơ bản',
        path: paths.dashboard.algebra.graphs.root,
        icon: ICONS.chart,
        children: [
          { title: 'Hàm số tuyến tính', path: paths.dashboard.algebra.graphs.linear },
          { title: 'Hàm số bậc hai', path: paths.dashboard.algebra.graphs.quadratic },
          { title: 'Hàm số bậc ba', path: paths.dashboard.algebra.graphs.cubic },
          { title: 'Hàm số căn bậc', path: paths.dashboard.algebra.graphs.radical },
          { title: 'Hàm số giá trị tuyệt đối', path: paths.dashboard.algebra.graphs.modulus },
        ],
      },
      {
        title: 'Hàm số nâng cao',
        path: paths.dashboard.algebra.graphs.exponential,
        icon: ICONS.calculus,
        children: [
          { title: 'Hàm số mũ', path: paths.dashboard.algebra.graphs.exponential },
          { title: 'Hàm số logarit', path: paths.dashboard.algebra.graphs.logarithmic },
          { title: 'Hàm số lượng giác', path: paths.dashboard.algebra.graphs.trigonometric },
          { title: 'Hàm số giới hạn', path: paths.dashboard.algebra.graphs.limit },
        ],
      },
    ],
  },
  /**
   * Thống kê và xác suất
   */
  {
    subheader: 'Thống kê và xác suất',
    items: [
      {
        title: 'Biểu đồ và dữ liệu',
        path: paths.dashboard.statistics.charts.root,
        icon: ICONS.chart,
        children: [
          { title: 'Bảng tần số', path: paths.dashboard.statistics.charts.frequencyTable },
          { title: 'Biểu đồ cột đơn', path: paths.dashboard.statistics.charts.singleColumn },
          { title: 'Biểu đồ cột kép', path: paths.dashboard.statistics.charts.doubleColumn },
          { title: 'Biểu đồ cột chồng', path: paths.dashboard.statistics.charts.stackedColumn },
          { title: 'Biểu đồ đường', path: paths.dashboard.statistics.charts.line },
          { title: 'Biểu đồ quạt', path: paths.dashboard.statistics.charts.pie },
          { title: 'Biểu đồ miền', path: paths.dashboard.statistics.charts.area },
          { title: 'Biểu đồ tranh', path: paths.dashboard.statistics.charts.pictograph },
        ],
      },
      {
        title: 'Thống kê mô tả',
        path: paths.dashboard.statistics.stats.root,
        icon: ICONS.statistics,
        children: [
          { title: 'Trung bình và trung vị', path: paths.dashboard.statistics.stats.meanMedian },
          { title: 'Độ lệch chuẩn', path: paths.dashboard.statistics.stats.standardDeviation },
          { title: 'Mẫu và phương sai', path: paths.dashboard.statistics.stats.sampleVariance },
          { title: 'Hệ số tương quan', path: paths.dashboard.statistics.stats.correlation },
          { title: 'Đường hồi quy', path: paths.dashboard.statistics.stats.regression },
          { title: 'Hồi quy phân tích', path: paths.dashboard.statistics.stats.regressionAnalysis },
          {
            title: 'Thống kê nâng cao',
            path: paths.dashboard.statistics.stats.interpolation,
            children: [
              { title: 'Đa thức nội suy', path: paths.dashboard.statistics.stats.interpolation },
              { title: 'Kiểm định thống kê', path: paths.dashboard.statistics.stats.testing },
              { title: 'Phân tích sigma', path: paths.dashboard.statistics.stats.sigma },
            ],
          },
        ],
      },
      {
        title: 'Xác suất cơ bản',
        path: paths.dashboard.statistics.probability.root,
        icon: ICONS.probability,
        children: [
          { title: 'Phân phối nhị thức', path: paths.dashboard.statistics.probability.binomial },
          { title: 'Phân phối chuẩn', path: paths.dashboard.statistics.probability.normal },
          { title: 'Phân phối Poisson', path: paths.dashboard.statistics.probability.poisson },
          {
            title: 'Phân phối nâng cao',
            path: paths.dashboard.statistics.probability.student,
            children: [
              { title: 'Phân phối Student', path: paths.dashboard.statistics.probability.student },
              { title: 'Phân phối Gamma', path: paths.dashboard.statistics.probability.gamma },
              { title: 'Phân phối Weibull', path: paths.dashboard.statistics.probability.weibull },
              {
                title: 'Phân phối Log-normal',
                path: paths.dashboard.statistics.probability.logNormal,
              },
              {
                title: 'Phân phối Logistic',
                path: paths.dashboard.statistics.probability.logistic,
              },
              { title: 'Phân phối Pascal', path: paths.dashboard.statistics.probability.pascal },
              { title: 'Phân phối Cauchy', path: paths.dashboard.statistics.probability.cauchy },
              {
                title: 'Phân phối siêu bội',
                path: paths.dashboard.statistics.probability.hypergeometric,
              },
            ],
          },
        ],
      },
    ],
  },
];
