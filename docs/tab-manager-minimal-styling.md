# TabManager - Minimal Styling Update

## Cập nhật 2024-01-XX

### Mục tiêu
Loại bỏ hoàn toàn các hiệu ứng động khỏi TabManager để đạt được style tối giản theo yêu cầu:
- Chỉ có icon + màu icon + chữ in đậm cho tab active
- Không có hiệu ứng hover, transition, transform, boxShadow
- Style đơn giản và sạch sẽ

### Các thay đổi đã thực hiện

#### 1. Loại bỏ hiệu ứng động
- **Loại bỏ**: `transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'`
- **Loại bỏ**: `position: 'relative'` và `overflow: 'hidden'` không cần thiết
- **Loại bỏ**: `boxShadow: (theme) => theme.shadows[1]` khỏi tab active

#### 2. Loại bỏ hiệu ứng hover
- **Loại bỏ**: `'&:hover:not(.Mui-selected)'` block hoàn toàn
- **Loại bỏ**: `transform: 'translateY(-1px)'` - hiệu ứng nâng tab
- **Loại bỏ**: `backgroundColor: 'action.hover'` - đổi màu nền khi hover

#### 3. Loại bỏ hiệu ứng focus phức tạp
- **Loại bỏ**: `'&.Mui-focusVisible'` block với outline phức tạp
- Tab sẽ sử dụng focus mặc định của browser (đơn giản hơn)

### Style cuối cùng
```tsx
sx={{
  // Base styles - minimal and clean
  minHeight: 48,
  px: 2,
  py: 1.5,
  borderRadius: 1,
  
  // Default colors
  color: 'text.secondary',
  backgroundColor: 'transparent',
  
  // Active state styling - simple and high contrast
  '&.Mui-selected': {
    color: 'background.paper',
    fontWeight: 600,
    backgroundColor: 'text.primary',
    borderRadius: 1,
    
    // Ensure icons are also styled
    '& .MuiSvgIcon-root': {
      color: 'background.paper',
    },
    '& .MuiTab-iconWrapper': {
      color: 'background.paper',
    },
  },
  
  // Disabled state
  '&.Mui-disabled': {
    color: 'text.disabled',
    backgroundColor: 'transparent',
  },
  
  // Custom sx override
  ...tab.sx,
}}
```

### Kết quả
- Tab không có hiệu ứng động khi hover
- Tab active chỉ có: nền đen (light mode) / nền sáng (dark mode)
- Text và icon có màu sáng khi active, in đậm
- Style tối giản, sạch sẽ, dễ sử dụng
- Vẫn giữ được accessibility cơ bản

### Tác động
- Tất cả các trang arithmetic đã sử dụng TabManager sẽ có style mới
- Không cần thay đổi code implementation tại các trang
- Performance nhẹ hơn do không có transition/animation
