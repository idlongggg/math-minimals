export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
}

export const PAGE_METADATA: Record<string, PageMetadata> = {
  // Arithmetic pages
  'arithmetic.primeNumbers': {
    title: 'Số nguyên tố',
    description: 'Công cụ kiểm tra và tìm số nguyên tố với các thuật toán tối ưu.',
    keywords: ['số nguyên tố', 'prime numbers', 'số học', 'arithmetic'],
  },
  'arithmetic.gcd': {
    title: 'Ước chung lớn nhất',
    description: 'Tính ước chung lớn nhất (GCD) và bội chung nhỏ nhất (LCM) của các số.',
    keywords: ['gcd', 'lcm', 'ước chung', 'bội chung'],
  },
  'arithmetic.factors': {
    title: 'Phân tích thừa số',
    description: 'Phân tích một số thành các thừa số nguyên tố.',
    keywords: ['thừa số', 'factors', 'phân tích'],
  },

  // Algebra pages
  'algebra.linear.matrix': {
    title: 'Máy tính ma trận',
    description: 'Tính toán với ma trận: cộng, trừ, nhân, định thức, nghịch đảo.',
    keywords: ['ma trận', 'matrix', 'đại số tuyến tính'],
  },
  'algebra.linear.system': {
    title: 'Hệ phương trình tuyến tính',
    description: 'Giải hệ phương trình tuyến tính bằng các phương pháp khác nhau.',
    keywords: ['hệ phương trình', 'linear system', 'đại số'],
  },

  // Geometry pages
  'geometry.basic.area': {
    title: 'Tính diện tích',
    description: 'Tính diện tích các hình học cơ bản: tam giác, tứ giác, hình tròn.',
    keywords: ['diện tích', 'area', 'hình học'],
  },
  'geometry.basic.volume': {
    title: 'Tính thể tích',
    description: 'Tính thể tích các khối hình học: hình cầu, hình trụ, hình nón.',
    keywords: ['thể tích', 'volume', 'hình học không gian'],
  },

  // Calculus pages
  'calculus.derivative': {
    title: 'Đạo hàm',
    description: 'Tính đạo hàm của các hàm số với công cụ symbolic và numerical.',
    keywords: ['đạo hàm', 'derivative', 'giải tích'],
  },
  'calculus.integral': {
    title: 'Tích phân',
    description: 'Tính tích phân xác định và bất định của các hàm số.',
    keywords: ['tích phân', 'integral', 'giải tích'],
  },

  // Statistics pages
  'statistics.descriptive': {
    title: 'Thống kê mô tả',
    description: 'Tính toán các chỉ số thống kê: trung bình, trung vị, độ lệch chuẩn.',
    keywords: ['thống kê', 'statistics', 'mô tả'],
  },
  'statistics.probability': {
    title: 'Xác suất',
    description: 'Tính toán xác suất và các phân phối xác suất.',
    keywords: ['xác suất', 'probability', 'phân phối'],
  },

  // Trigonometry pages
  'trigonometry.basic': {
    title: 'Lượng giác cơ bản',
    description: 'Tính toán các hàm lượng giác: sin, cos, tan và các hàm ngược.',
    keywords: ['lượng giác', 'trigonometry', 'sin', 'cos', 'tan'],
  },
  'trigonometry.identities': {
    title: 'Đồng nhất thức lượng giác',
    description: 'Khám phá và chứng minh các đồng nhất thức lượng giác.',
    keywords: ['đồng nhất thức', 'identities', 'lượng giác'],
  },

  // Tools pages
  'tools.calculator': {
    title: 'Máy tính khoa học',
    description: 'Máy tính khoa học với các chức năng toán học nâng cao.',
    keywords: ['máy tính', 'calculator', 'khoa học'],
  },
  'tools.converter': {
    title: 'Chuyển đổi đơn vị',
    description: 'Chuyển đổi giữa các đơn vị đo lường khác nhau.',
    keywords: ['chuyển đổi', 'converter', 'đơn vị'],
  },

  // Dashboard page
  dashboard: {
    title: 'Bảng điều khiển',
    description: 'Trang chính hiển thị tổng quan về các công cụ toán học và thống kê sử dụng.',
    keywords: ['dashboard', 'bảng điều khiển', 'tổng quan', 'math tools'],
  },

  // Default for unknown pages
  default: {
    title: 'Trang không xác định',
    description: 'Trang này chưa được cấu hình metadata.',
    keywords: [],
  },
} as const;

/**
 * Get page metadata by key
 */
export function getPageMetadata(key: string): PageMetadata {
  return PAGE_METADATA[key] || PAGE_METADATA.default;
}

/**
 * Get page title by key
 */
export function getPageTitle(key: string): string {
  return getPageMetadata(key).title;
}

/**
 * Get page description by key
 */
export function getPageDescription(key: string): string {
  return getPageMetadata(key).description;
}
