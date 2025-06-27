# Hide Avatar Feature

## Tổng quan

Tính năng ẩn avatar cho phép ẩn hoặc hiện avatar trên thanh nav bar thông qua URL parameter.

## Cách sử dụng

### Ẩn avatar
Thêm parameter `hideAvatar=true` hoặc `hideAvatar=1` vào URL:

```
http://localhost:8083/dashboard?hideAvatar=true
http://localhost:8083/dashboard/arithmetic?hideAvatar=1
```

### Hiện avatar (mặc định)
Không thêm parameter hoặc set `hideAvatar=false`:

```
http://localhost:8083/dashboard
http://localhost:8083/dashboard/arithmetic?hideAvatar=false
```

## Các thay đổi được thực hiện

### 1. Cập nhật SettingsState type
- Thêm `hideAvatar?: boolean` vào `src/components/settings/types.ts`

### 2. Cập nhật default settings
- Thêm `hideAvatar: false` vào `src/components/settings/settings-config.ts`

### 3. Tạo hook useUrlParams  
- File mới: `src/hooks/use-url-params.ts`
- Đọc `hideAvatar` parameter từ URL trực tiếp mà không lưu cache

### 4. Cập nhật DashboardLayout
- Import và sử dụng `useUrlParams` hook thay vì `useUrlSettings`
- Thêm biến `isAvatarHidden` từ `urlParams.hideAvatar`
- Cập nhật logic render trong `rightArea`:
  - Ẩn `AccountDrawer` khi `isAvatarHidden = true`
  - Di chuyển `LanguagePopover` ra ngoài cùng (sau `SettingsButton`) khi avatar bị ẩn
  - Giữ nguyên vị trí `LanguagePopover` bình thường khi avatar hiển thị

### 5. Loại bỏ cache settings
- Xóa `hideAvatar` khỏi `SettingsState` type
- Xóa `hideAvatar` khỏi default settings  
- Đảm bảo tính năng chỉ hoạt động dựa trên URL parameters

## Logic hoạt động

Khi `hideAvatar=true`:
- ✅ Ẩn AccountDrawer (avatar button)
- ✅ Di chuyển LanguagePopover ra ngoài cùng
- ✅ Thứ tự hiển thị: Searchbar → Notifications → Contacts → Settings → Language

Khi `hideAvatar=false` (mặc định):
- ✅ Hiện AccountDrawer bình thường
- ✅ Giữ nguyên vị trí LanguagePopover
- ✅ Thứ tự hiển thị: Searchbar → Language → Notifications → Contacts → Settings → Avatar

## Tương thích

- ✅ Tương thích với tất cả nav layouts (vertical, horizontal, mini)
- ✅ Tương thích với nav colors (integrate, apparent)  
- ✅ Responsive trên mobile và desktop
- ✅ Không ảnh hưởng đến các tính năng khác
- ✅ Có thể kết hợp với `hideMenu` parameter

## Ví dụ URLs

```bash
# Trang chính với avatar ẩn
http://localhost:8083/dashboard?hideAvatar=true

# Arithmetic section với avatar ẩn  
http://localhost:8083/dashboard/arithmetic?hideAvatar=true

# Calculator với avatar ẩn
http://localhost:8083/dashboard/tools/calculators/basic?hideAvatar=true

# Kết hợp ẩn cả menu và avatar
http://localhost:8083/dashboard?hideMenu=true&hideAvatar=true

# Kết hợp với params khác
http://localhost:8083/dashboard?hideAvatar=true&tab=overview
```
