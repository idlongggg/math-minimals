import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  // Math icons - Tools and Utilities
  tools: icon('ic-tools'),
  calculator: icon('ic-calculator'),
  converter: icon('ic-converter'),
  solver: icon('ic-solver'),
  generator: icon('ic-generator'),
  // Basic Math
  arithmetic: icon('ic-calculator'),
  algebra: icon('ic-function'),
  // Geometry
  geometry: icon('ic-geometry'),
  plane: icon('ic-square'),
  spatial: icon('ic-cube'),
  coordinate: icon('ic-coordinate'),
  // Trigonometry
  trigonometry: icon('ic-triangle'),
  // Statistics and Probability
  statistics: icon('ic-chart-bar'),
  chart: icon('ic-chart-line'),
  probability: icon('ic-dice'),
  distribution: icon('ic-bell-curve'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * Công cụ toán học cơ bản
   */
  {
    subheader: 'Công cụ toán học cơ bản',
    items: [
      {
        title: 'Test Scroll',
        path: '/dashboard/test-scroll',
        icon: ICONS.tools,
      },
      {
        title: 'Máy tính cơ bản',
        path: paths.dashboard.tools.calculators.root,
        icon: ICONS.calculator,
        children: [
          { title: 'Máy tính cơ bản', path: paths.dashboard.tools.calculators.basic },
          { title: 'Máy tính khoa học', path: paths.dashboard.tools.calculators.scientific },
          { title: 'Máy tính đồ thị', path: paths.dashboard.tools.calculators.graphing },
          { title: 'Số phức', path: paths.dashboard.tools.calculators.complex },
        ],
      },
      {
        title: 'Công cụ chuyển đổi',
        path: paths.dashboard.tools.converters.root,
        icon: ICONS.converter,
        children: [{ title: 'Chuyển đổi đơn vị', path: paths.dashboard.tools.converters.units }],
      },
      {
        title: 'Trình tạo',
        path: paths.dashboard.tools.generators.root,
        icon: ICONS.generator,
        children: [
          { title: 'Số ngẫu nhiên', path: paths.dashboard.tools.generators.random },
          { title: 'Dãy Fibonacci', path: paths.dashboard.tools.generators.fibonacci },
          { title: 'Mẫu số học', path: paths.dashboard.tools.generators.pattern },
        ],
      },
    ],
  },
  /**
   * Số học và Đại số cơ bản
   */
  {
    subheader: 'Số học và Đại số cơ bản',
    items: [
      {
        title: 'Số học cơ bản',
        path: paths.dashboard.arithmetic.root,
        icon: ICONS.arithmetic,
        children: [
          { title: 'Chuyển đổi cơ số', path: paths.dashboard.arithmetic.baseConversion },
          { title: 'Mẫu số chung', path: paths.dashboard.arithmetic.commonDenominator },
          { title: 'Phép chia và số dư', path: paths.dashboard.arithmetic.divisionRemainder },
          { title: 'Số nguyên tố', path: paths.dashboard.arithmetic.primeNumbers },
          { title: 'Thừa số và số vô tỷ', path: paths.dashboard.arithmetic.factorsIrrationals },
          { title: 'Ước số và bội số', path: paths.dashboard.arithmetic.divisorsMultiples },
          { title: 'Phân số & Chuyển đổi', path: paths.dashboard.arithmetic.fractions },
        ],
      },
      {
        title: 'Đại số cơ bản',
        path: paths.dashboard.algebra.basic.root,
        icon: ICONS.algebra,
        children: [
          { title: 'Biểu thức đại số', path: paths.dashboard.algebra.basic.expressions },
          { title: 'Phương trình', path: paths.dashboard.algebra.basic.equations },
          { title: 'Bất phương trình', path: paths.dashboard.algebra.basic.inequalities },
          { title: 'Phân tích thừa số', path: paths.dashboard.algebra.basic.factoring },
          { title: 'Đa thức', path: paths.dashboard.algebra.basic.polynomials },
        ],
      },
    ],
  },
  /**
   * Hàm số và Đại số nâng cao
   */
  {
    subheader: 'Hàm số và Đại số nâng cao',
    items: [
      {
        title: 'Hàm số và đồ thị',
        path: paths.dashboard.algebra.functions.root,
        icon: ICONS.chart,
        children: [
          { title: 'Hàm tuyến tính', path: paths.dashboard.algebra.functions.linear },
          { title: 'Hàm bậc hai', path: paths.dashboard.algebra.functions.quadratic },
          { title: 'Hàm đa thức', path: paths.dashboard.algebra.functions.polynomial },
          { title: 'Hàm hữu tỷ', path: paths.dashboard.algebra.functions.rational },
          { title: 'Hàm mũ', path: paths.dashboard.algebra.functions.exponential },
          { title: 'Hàm logarit', path: paths.dashboard.algebra.functions.logarithmic },
          { title: 'Hàm lượng giác', path: paths.dashboard.algebra.functions.trigonometric },
          { title: 'Hàm ngược', path: paths.dashboard.algebra.functions.inverse },
          { title: 'Hàm hợp', path: paths.dashboard.algebra.functions.composite },
        ],
      },
      {
        title: 'Đại số tuyến tính',
        path: paths.dashboard.tools.calculators.root,
        icon: ICONS.solver,
        children: [
          { title: 'Máy tính ma trận', path: paths.dashboard.tools.calculators.matrix },
          { title: 'Hệ phương trình', path: paths.dashboard.tools.solvers.system },
        ],
      },
      {
        title: 'Giải phương trình nâng cao',
        path: paths.dashboard.tools.solvers.root,
        icon: ICONS.solver,
        children: [
          { title: 'Phương trình vi phân', path: paths.dashboard.tools.solvers.differential },
          { title: 'Tối ưu hóa', path: paths.dashboard.tools.solvers.optimization },
        ],
      },
    ],
  },
  /**
   * Giải tích
   */
  {
    subheader: 'Giải tích',
    items: [
      {
        title: 'Công cụ giải tích',
        path: paths.dashboard.tools.calculators.root,
        icon: ICONS.calculator,
        children: [
          { title: 'Đạo hàm', path: paths.dashboard.tools.calculators.derivative },
          { title: 'Tích phân', path: paths.dashboard.tools.calculators.integral },
          { title: 'Giới hạn', path: paths.dashboard.tools.calculators.limit },
          { title: 'Dãy số', path: paths.dashboard.tools.calculators.sequence },
        ],
      },
    ],
  },
  /**
   * Hình học và lượng giác
   */
  {
    subheader: 'Hình học và lượng giác',
    items: [
      {
        title: 'Hình học mặt phẳng',
        path: paths.dashboard.geometry.plane.root,
        icon: ICONS.plane,
        children: [
          { title: 'Điểm và đoạn thẳng', path: paths.dashboard.geometry.plane.pointsSegments },
          { title: 'Đường thẳng', path: paths.dashboard.geometry.plane.lines },
          { title: 'Góc', path: paths.dashboard.geometry.plane.angles },
          { title: 'Tam giác', path: paths.dashboard.geometry.plane.triangles },
          { title: 'Tứ giác', path: paths.dashboard.geometry.plane.quadrilaterals },
          { title: 'Đa giác', path: paths.dashboard.geometry.plane.polygons },
          { title: 'Đường tròn', path: paths.dashboard.geometry.plane.circles },
          { title: 'Đường conic', path: paths.dashboard.geometry.plane.conics },
        ],
      },
      {
        title: 'Hình học không gian',
        path: paths.dashboard.geometry.spatial.root,
        icon: ICONS.spatial,
        children: [
          { title: 'Lăng trụ', path: paths.dashboard.geometry.spatial.prisms },
          { title: 'Chóp', path: paths.dashboard.geometry.spatial.pyramids },
          { title: 'Hình trụ', path: paths.dashboard.geometry.spatial.cylinders },
          { title: 'Hình nón', path: paths.dashboard.geometry.spatial.cones },
          { title: 'Hình cầu', path: paths.dashboard.geometry.spatial.spheres },
          { title: 'Mặt cong', path: paths.dashboard.geometry.spatial.surfaces },
        ],
      },
      {
        title: 'Hình học tọa độ',
        path: paths.dashboard.geometry.coordinate.root,
        icon: ICONS.coordinate,
        children: [
          { title: 'Tọa độ Descartes', path: paths.dashboard.geometry.coordinate.cartesian },
          { title: 'Tọa độ cực', path: paths.dashboard.geometry.coordinate.polar },
          { title: 'Tọa độ tham số', path: paths.dashboard.geometry.coordinate.parametric },
          { title: 'Vector', path: paths.dashboard.geometry.coordinate.vectors },
        ],
      },
      {
        title: 'Lượng giác cơ bản',
        path: paths.dashboard.trigonometry.basic.root,
        icon: ICONS.trigonometry,
        children: [
          { title: 'Tỷ số lượng giác', path: paths.dashboard.trigonometry.basic.ratios },
          { title: 'Đồng nhất thức', path: paths.dashboard.trigonometry.basic.identities },
          { title: 'Phương trình lượng giác', path: paths.dashboard.trigonometry.basic.equations },
          { title: 'Đồ thị hàm lượng giác', path: paths.dashboard.trigonometry.basic.graphs },
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
          { title: 'Biểu đồ tranh', path: paths.dashboard.statistics.charts.pictograph },
          { title: 'Biểu đồ đường', path: paths.dashboard.statistics.charts.line },
          { title: 'Biểu đồ miền', path: paths.dashboard.statistics.charts.area },
          { title: 'Biểu đồ cột đơn', path: paths.dashboard.statistics.charts.singleColumn },
          { title: 'Biểu đồ cột kép', path: paths.dashboard.statistics.charts.doubleColumn },
          { title: 'Biểu đồ cột chồng', path: paths.dashboard.statistics.charts.stackedColumn },
          { title: 'Biểu đồ quạt', path: paths.dashboard.statistics.charts.pie },
          { title: 'Bảng tần số', path: paths.dashboard.statistics.charts.frequencyTable },
          { title: 'Histogram', path: paths.dashboard.statistics.charts.histogram },
          { title: 'Box plot', path: paths.dashboard.statistics.charts.boxplot },
          { title: 'Biểu đồ phân tán', path: paths.dashboard.statistics.charts.scatter },
        ],
      },
      {
        title: 'Thống kê mô tả',
        path: paths.dashboard.statistics.descriptive.root,
        icon: ICONS.statistics,
        children: [
          {
            title: 'Xu hướng trung tâm',
            path: paths.dashboard.statistics.descriptive.centralTendency,
          },
          { title: 'Độ phân tán', path: paths.dashboard.statistics.descriptive.dispersion },
          { title: 'Phân phối dữ liệu', path: paths.dashboard.statistics.descriptive.distribution },
          { title: 'Tương quan', path: paths.dashboard.statistics.descriptive.correlation },
          { title: 'Hồi quy', path: paths.dashboard.statistics.descriptive.regression },
        ],
      },
      {
        title: 'Xác suất cơ bản',
        path: paths.dashboard.statistics.probability.root,
        icon: ICONS.probability,
        children: [
          { title: 'Xác suất cơ bản', path: paths.dashboard.statistics.probability.basic },
          {
            title: 'Xác suất có điều kiện',
            path: paths.dashboard.statistics.probability.conditional,
          },
          { title: 'Định lý Bayes', path: paths.dashboard.statistics.probability.bayes },
        ],
      },
      {
        title: 'Phân phối xác suất',
        path: paths.dashboard.statistics.probability.distributions.root,
        icon: ICONS.distribution,
        children: [
          {
            title: 'Phân phối rời rạc',
            path: paths.dashboard.statistics.probability.distributions.discrete,
          },
          {
            title: 'Phân phối liên tục',
            path: paths.dashboard.statistics.probability.distributions.continuous,
          },
          {
            title: 'Phân phối chuẩn',
            path: paths.dashboard.statistics.probability.distributions.normal,
          },
          {
            title: 'Phân phối nhị thức',
            path: paths.dashboard.statistics.probability.distributions.binomial,
          },
        ],
      },
    ],
  },
];
