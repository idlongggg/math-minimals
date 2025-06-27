# Hide Menu Feature

## Tổng quan

Tính năng ẩn menu cho phép ẩn hoặc hiện navigation menu thông qua URL parameter.

## Cách sử dụng

### Ẩn menu
Thêm parameter `hideMenu=true` hoặc `hideMenu=1` vào URL:

```
http://localhost:8083/dashboard?hideMenu=true
http://localhost:8083/dashboard/arithmetic?hideMenu=1
```

### Hiện menu (mặc định)
Không thêm parameter hoặc set `hideMenu=false`:

```
http://localhost:8083/dashboard
http://localhost:8083/dashboard/arithmetic?hideMenu=false
```

## Các thay đổi được thực hiện

### 1. Cập nhật SettingsState type
- Thêm `hideMenu?: boolean` vào `src/components/settings/types.ts`

### 2. Cập nhật default settings
- Thêm `hideMenu: false` vào `src/components/settings/settings-config.ts`

### 3. Tạo hook useUrlParams
- File mới: `src/hooks/use-url-params.ts`
- Đọc URL parameters trực tiếp mà không lưu cache

### 4. Cập nhật DashboardLayout
- Import và sử dụng `useUrlParams` hook thay vì `useUrlSettings`
- Đọc `hideMenu` trực tiếp từ URL parameters
- Cập nhật logic render để ẩn/hiện:
  - Navigation menu (vertical/horizontal)
  - Mobile menu button
  - Logo positioning
  - Sidebar padding

### 5. Loại bỏ cache settings
- Xóa `hideMenu` khỏi `SettingsState` type
- Xóa `hideMenu` khỏi default settings
- Đảm bảo tính năng chỉ hoạt động dựa trên URL parameters

## Logic hoạt động

Khi `hideMenu=true`:
- ✅ Ẩn vertical navigation sidebar
- ✅ Ẩn horizontal navigation menu
- ✅ Ẩn mobile menu button  
- ✅ Hiện logo ở header (như horizontal layout)
- ✅ Loại bỏ sidebar padding
- ✅ Tự động transition smooth

Khi `hideMenu=false` (mặc định):
- ✅ Hiện navigation menu bình thường
- ✅ Giữ nguyên tất cả layout settings khác

## Tương thích

- ✅ Tương thích với tất cả nav layouts (vertical, horizontal, mini)
- ✅ Tương thích với nav colors (integrate, apparent)  
- ✅ Responsive trên mobile và desktop
- ✅ Smooth transitions
- ✅ Không lưu cache - chỉ hoạt động dựa trên URL parameters

## Ví dụ URLs

```bash
# Trang chính với menu ẩn
http://localhost:8083/dashboard?hideMenu=true

# Arithmetic section với menu ẩn  
http://localhost:8083/dashboard/arithmetic?hideMenu=true

# Calculator với menu ẩn
http://localhost:8083/dashboard/tools/calculators/basic?hideMenu=true

# Kết hợp với params khác
http://localhost:8083/dashboard?hideMenu=true&tab=overview
```
