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
  tools: icon('ic-calculator'),
  calculator: icon('ic-calculator'),
  converter: icon('ic-converter'),
  solver: icon('ic-solver'),
  generator: icon('ic-generator'),
  // Basic Math
  arithmetic: icon('ic-arithmetic'),
  algebra: icon('ic-algebra'),
  // Geometry
  geometry: icon('ic-square'),
  plane: icon('ic-square'),
  spatial: icon('ic-cube'),
  coordinate: icon('ic-coordinate'),
  // Trigonometry
  trigonometry: icon('ic-triangle'),
  // Statistics and Probability
  statistics: icon('ic-statistics'),
  chart: icon('ic-chart'),
  probability: icon('ic-probability'),
  distribution: icon('ic-distribution'),
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
        title: 'Máy tính cơ bản',
        path: paths.dashboard.root,
        icon: ICONS.calculator,
        children: [
          {
            title: 'Máy tính cơ bản',
            path: paths.dashboard.root,
          },
          {
            title: 'Máy tính khoa học',
            path: paths.dashboard.two,
          },
          {
            title: 'Máy tính đồ thị',
            path: paths.dashboard.three,
          },
          { title: 'Số phức', path: paths.dashboard.group.root },
        ],
      },
      {
        title: 'Công cụ chuyển đổi',
        path: paths.dashboard.two,
        icon: ICONS.converter,
        children: [
          {
            title: 'Chuyển đổi đơn vị',
            path: paths.dashboard.two,
          },
        ],
      },
      {
        title: 'Trình tạo',
        path: paths.dashboard.three,
        icon: ICONS.generator,
        children: [
          {
            title: 'Số ngẫu nhiên',
            path: paths.dashboard.three,
          },
          {
            title: 'Dãy Fibonacci',
            path: paths.dashboard.group.root,
          },
          {
            title: 'Mẫu số học',
            path: paths.dashboard.group.five,
          },
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
        path: paths.dashboard.group.root,
        icon: ICONS.arithmetic,
        children: [
          {
            title: 'Chuyển đổi cơ số',
            path: paths.dashboard.group.root,
          },
          {
            title: 'Mẫu số chung',
            path: paths.dashboard.group.five,
          },
          {
            title: 'Phép chia và số dư',
            path: paths.dashboard.group.six,
          },
          {
            title: 'Số nguyên tố',
            path: paths.dashboard.root,
          },
          {
            title: 'Thừa số và số vô tỷ',
            path: paths.dashboard.two,
          },
          {
            title: 'Ước số và bội số',
            path: paths.dashboard.three,
          },
          {
            title: 'Phân số & Chuyển đổi',
            path: paths.dashboard.group.root,
          },
        ],
      },
      {
        title: 'Đại số cơ bản',
        path: paths.dashboard.group.five,
        icon: ICONS.algebra,
        children: [
          {
            title: 'Biểu thức đại số',
            path: paths.dashboard.group.five,
          },
          {
            title: 'Phương trình',
            path: paths.dashboard.group.six,
          },
          {
            title: 'Bất phương trình',
            path: paths.dashboard.root,
          },
          {
            title: 'Phân tích thừa số',
            path: paths.dashboard.two,
          },
          { title: 'Đa thức', path: paths.dashboard.three },
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
        path: paths.dashboard.group.six,
        icon: ICONS.chart,
        children: [
          {
            title: 'Hàm tuyến tính',
            path: paths.dashboard.group.six,
          },
          {
            title: 'Hàm bậc hai',
            path: paths.dashboard.root,
          },
          {
            title: 'Hàm đa thức',
            path: paths.dashboard.two,
          },
          {
            title: 'Hàm hữu tỷ',
            path: paths.dashboard.three,
          },
          {
            title: 'Hàm mũ',
            path: paths.dashboard.group.root,
          },
          {
            title: 'Hàm logarit',
            path: paths.dashboard.group.five,
          },
          {
            title: 'Hàm lượng giác',
            path: paths.dashboard.group.six,
          },
          {
            title: 'Hàm ngược',
            path: paths.dashboard.root,
          },
          {
            title: 'Hàm hợp',
            path: paths.dashboard.two,
          },
        ],
      },
      {
        title: 'Đại số tuyến tính',
        path: paths.dashboard.three,
        icon: ICONS.solver,
        children: [
          {
            title: 'Máy tính ma trận',
            path: paths.dashboard.three,
          },
          {
            title: 'Hệ phương trình',
            path: paths.dashboard.group.root,
          },
        ],
      },
      {
        title: 'Giải phương trình nâng cao',
        path: paths.dashboard.group.five,
        icon: ICONS.solver,
        children: [
          {
            title: 'Phương trình vi phân',
            path: paths.dashboard.group.five,
          },
          {
            title: 'Tối ưu hóa',
            path: paths.dashboard.group.six,
          },
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
        path: paths.dashboard.root,
        icon: ICONS.calculator,
        children: [
          { title: 'Đạo hàm', path: paths.dashboard.root },
          { title: 'Tích phân', path: paths.dashboard.two },
          { title: 'Giới hạn', path: paths.dashboard.three },
          {
            title: 'Dãy số', path: paths.dashboard.group.root,
          },
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
        path: paths.dashboard.two,
        icon: ICONS.plane,
        children: [
          {
            title: 'Điểm và đoạn thẳng',
            path: paths.dashboard.two,
          },
          { title: 'Đường thẳng', path: paths.dashboard.three },
          { title: 'Góc', path: paths.dashboard.group.root },
          { title: 'Tam giác', path: paths.dashboard.group.five },
          {
            title: 'Tứ giác',
            path: paths.dashboard.group.six,
          },
          { title: 'Đa giác', path: paths.dashboard.root },
          { title: 'Đường tròn', path: paths.dashboard.two },
          { title: 'Đường conic', path: paths.dashboard.three },
        ],
      },
      {
        title: 'Hình học không gian',
        path: paths.dashboard.three,
        icon: ICONS.spatial,
        children: [
          { title: 'Lăng trụ', path: paths.dashboard.three },
          { title: 'Chóp', path: paths.dashboard.group.root },
          {
            title: 'Hình trụ',
            path: paths.dashboard.group.five,
          },
          { title: 'Hình nón', path: paths.dashboard.group.six },
          { title: 'Hình cầu', path: paths.dashboard.root },
          {
            title: 'Mặt cong',
            path: paths.dashboard.two,
          },
        ],
      },
      {
        title: 'Hình học tọa độ',
        path: paths.dashboard.group.root,
        icon: ICONS.coordinate,
        children: [
          {
            title: 'Tọa độ Descartes',
            path: paths.dashboard.group.root,
          },
          {
            title: 'Tọa độ cực',
            path: paths.dashboard.group.five,
          },
          {
            title: 'Tọa độ tham số',
            path: paths.dashboard.group.six,
          },
          {
            title: 'Vector',
            path: paths.dashboard.root,
          },
        ],
      },
      {
        title: 'Lượng giác cơ bản',
        path: paths.dashboard.group.five,
        icon: ICONS.trigonometry,
        children: [
          {
            title: 'Tỷ số lượng giác',
            path: paths.dashboard.group.five,
          },
          {
            title: 'Đồng nhất thức',
            path: paths.dashboard.group.six,
          },
          {
            title: 'Phương trình lượng giác',
            path: paths.dashboard.root,
          },
          {
            title: 'Đồ thị hàm lượng giác',
            path: paths.dashboard.two,
          },
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
        path: paths.dashboard.group.six,
        icon: ICONS.chart,
        children: [
          {
            title: 'Biểu đồ tranh',
            path: paths.dashboard.group.six,
          },
          {
            title: 'Biểu đồ đường',
            path: paths.dashboard.root,
          },
          {
            title: 'Biểu đồ miền',
            path: paths.dashboard.two,
          },
          {
            title: 'Biểu đồ cột đơn',
            path: paths.dashboard.three,
          },
          {
            title: 'Biểu đồ cột kép',
            path: paths.dashboard.group.root,
          },
          {
            title: 'Biểu đồ cột chồng',
            path: paths.dashboard.group.five,
          },
          {
            title: 'Biểu đồ quạt',
            path: paths.dashboard.group.six,
          },
          {
            title: 'Bảng tần số',
            path: paths.dashboard.root,
          },
          {
            title: 'Histogram',
            path: paths.dashboard.two,
          },
          {
            title: 'Box plot',
            path: paths.dashboard.three,
          },
          {
            title: 'Biểu đồ phân tán',
            path: paths.dashboard.group.root,
          },
        ],
      },
      {
        title: 'Thống kê mô tả',
        path: paths.dashboard.root,
        icon: ICONS.statistics,
        children: [
          {
            title: 'Xu hướng trung tâm',
            path: paths.dashboard.root,
          },
          {
            title: 'Độ phân tán',
            path: paths.dashboard.two,
          },
          {
            title: 'Phân phối dữ liệu',
            path: paths.dashboard.three,
          },
          {
            title: 'Tương quan',
            path: paths.dashboard.group.root,
          },
          {
            title: 'Hồi quy',
            path: paths.dashboard.group.five,
          },
        ],
      },
      {
        title: 'Xác suất cơ bản',
        path: paths.dashboard.two,
        icon: ICONS.probability,
        children: [
          {
            title: 'Xác suất cơ bản',
            path: paths.dashboard.two,
          },
          {
            title: 'Xác suất có điều kiện',
            path: paths.dashboard.three,
          },
          {
            title: 'Định lý Bayes',
            path: paths.dashboard.group.root,
          },
        ],
      },
      {
        title: 'Phân phối xác suất',
        path: paths.dashboard.three,
        icon: ICONS.distribution,
        children: [
          {
            title: 'Phân phối rời rạc',
            path: paths.dashboard.three,
          },
          {
            title: 'Phân phối liên tục',
            path: paths.dashboard.group.root,
          },
          {
            title: 'Phân phối chuẩn',
            path: paths.dashboard.group.five,
          },
          {
            title: 'Phân phối nhị thức',
            path: paths.dashboard.group.six,
          },
        ],
      },
    ],
  },
];
