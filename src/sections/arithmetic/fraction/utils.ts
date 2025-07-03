import type { Fraction } from './types';

/**
 * Tìm ước chung lớn nhất của hai số nguyên
 * @param a - Số nguyên thứ nhất
 * @param b - Số nguyên thứ hai
 * @returns Ước chung lớn nhất
 */
export const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

/**
 * Rút gọn phân số về dạng tối giản
 * @param fraction - Phân số cần rút gọn
 * @returns Phân số đã được rút gọn
 */
export const simplifyFraction = (fraction: Fraction): Fraction => {
  if (fraction.denominator === 0) {
    throw new Error('Mẫu số không thể bằng 0');
  }

  const divisor = gcd(fraction.numerator, fraction.denominator);
  let numerator = fraction.numerator / divisor;
  let denominator = fraction.denominator / divisor;

  // Đảm bảo mẫu số luôn dương
  if (denominator < 0) {
    numerator = -numerator;
    denominator = -denominator;
  }

  return { numerator, denominator };
};

/**
 * Chuyển đổi phân số thành số thập phân
 * @param fraction - Phân số cần chuyển đổi
 * @returns Giá trị thập phân
 */
export const fractionToDecimal = (fraction: Fraction): number =>
  fraction.numerator / fraction.denominator;

/**
 * Chuyển đổi số thập phân thành phân số
 * @param decimal - Số thập phân cần chuyển đổi
 * @returns Phân số tương ứng
 */
export const decimalToFraction = (decimal: number): Fraction => {
  // Xử lý dấu âm
  const sign = decimal < 0 ? -1 : 1;
  decimal = Math.abs(decimal);

  // Xử lý số nguyên
  if (decimal % 1 === 0) {
    return { numerator: sign * decimal, denominator: 1 };
  }

  // Phương pháp đơn giản cho các số thập phân thông thường
  const tolerance = 1e-6;
  for (let denominator = 1; denominator <= 10000; denominator++) {
    const numerator = Math.round(decimal * denominator);
    if (Math.abs(decimal - numerator / denominator) < tolerance) {
      return simplifyFraction({ numerator: sign * numerator, denominator });
    }
  }

  // Phương pháp dự phòng: sử dụng chuỗi
  const str = decimal.toString();
  const decimalPlaces = str.split('.')[1]?.length || 0;
  const denominator = Math.pow(10, decimalPlaces);
  const numerator = decimal * denominator;

  return simplifyFraction({
    numerator: sign * Math.round(numerator),
    denominator,
  });
};

/**
 * Cộng hai phân số
 * @param f1 - Phân số thứ nhất
 * @param f2 - Phân số thứ hai
 * @returns Tổng của hai phân số
 */
export const addFractions = (f1: Fraction, f2: Fraction): Fraction => {
  const numerator =
    f1.numerator * f2.denominator + f2.numerator * f1.denominator;
  const denominator = f1.denominator * f2.denominator;
  return simplifyFraction({ numerator, denominator });
};

/**
 * Trừ hai phân số
 * @param f1 - Số bị trừ
 * @param f2 - Số trừ
 * @returns Hiệu của hai phân số
 */
export const subtractFractions = (f1: Fraction, f2: Fraction): Fraction => {
  const numerator =
    f1.numerator * f2.denominator - f2.numerator * f1.denominator;
  const denominator = f1.denominator * f2.denominator;
  return simplifyFraction({ numerator, denominator });
};

/**
 * Nhân hai phân số
 * @param f1 - Phân số thứ nhất
 * @param f2 - Phân số thứ hai
 * @returns Tích của hai phân số
 */
export const multiplyFractions = (f1: Fraction, f2: Fraction): Fraction => {
  const numerator = f1.numerator * f2.numerator;
  const denominator = f1.denominator * f2.denominator;
  return simplifyFraction({ numerator, denominator });
};

/**
 * Chia hai phân số
 * @param f1 - Số bị chia
 * @param f2 - Số chia
 * @returns Thương của hai phân số
 */
export const divideFractions = (f1: Fraction, f2: Fraction): Fraction => {
  if (f2.numerator === 0) {
    throw new Error('Không thể chia cho 0');
  }
  const numerator = f1.numerator * f2.denominator;
  const denominator = f1.denominator * f2.numerator;
  return simplifyFraction({ numerator, denominator });
};

/**
 * Định dạng phân số thành chuỗi LaTeX để hiển thị
 * @param fraction - Phân số cần định dạng
 * @returns Chuỗi LaTeX
 */
export const formatFraction = (fraction: Fraction): string => {
  if (fraction.denominator === 1) {
    return fraction.numerator.toString();
  }
  return `\\frac{${fraction.numerator}}{${fraction.denominator}}`;
};
