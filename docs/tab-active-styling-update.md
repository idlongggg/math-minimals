# TabManager Active Tab Styling - Black Background

## Thay đổi đã thực hiện

Đã cập nhật `TabManager` để tab active có nền đen trong light mode và nền sáng trong dark mode.

### Styling mới cho tab active:

```typescript
'&.Mui-selected': {
  color: 'background.paper',     // Text màu sáng
  fontWeight: 600,
  backgroundColor: 'text.primary', // Nền đen/sáng tự động theo theme
  borderRadius: 1,
  
  // Icon cũng có màu sáng
  '& .MuiSvgIcon-root': {
    color: 'background.paper',
  },
  '& .MuiTab-iconWrapper': {
    color: 'background.paper',
  },
}
```

### Hiệu ứng hover:

```typescript
'&:hover': {
  color: isActive ? 'background.paper' : tabColor,
  opacity: 0.8,
  backgroundColor: isActive ? 'text.primary' : 'action.hover',
  borderRadius: 1,
}
```

## Cách hoạt động:

### **Light Mode:**
- Tab active: **Nền đen** (`text.primary` = đen) + **Text trắng** (`background.paper` = trắng)
- Tab không active: Nền trong suốt + Text màu theme

### **Dark Mode:**
- Tab active: **Nền sáng** (`text.primary` = trắng) + **Text đen** (`background.paper` = đen)  
- Tab không active: Nền trong suốt + Text màu theme

## Áp dụng cho:

✅ Tất cả các trang arithmetic đã được refactor sẽ tự động có styling mới:
- base-conversion-view.tsx
- prime-numbers-view.tsx
- fraction-view.tsx
- common-denominator-view-refactored.tsx
- divisors-multiples-view.tsx
- factors-irrationals-view.tsx
- division-with-remainder-view.tsx

## Test:

1. Mở bất kỳ trang arithmetic nào
2. Click vào các tab khác nhau
3. Quan sát tab active có nền đen (light mode) hoặc nền sáng (dark mode)
4. Thử switch giữa light/dark mode để kiểm tra

## Ưu điểm:

- ✅ **Contrast cao**: Tab active nổi bật rõ ràng
- ✅ **Responsive theme**: Tự động thay đổi theo light/dark mode
- ✅ **Consistent**: Áp dụng cho toàn bộ dự án
- ✅ **Accessible**: Text và icon luôn readable trên background
