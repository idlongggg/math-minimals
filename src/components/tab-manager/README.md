# TabManager Component - Style Defaults

## Tổng quan

`TabManager` là component tab dùng chung cho toàn bộ dự án với hỗ trợ **style presets** và **custom styles**.

## Tính năng chính

- ✅ **Style presets**: 5 style mặc định có sẵn
- ✅ **Custom styles**: Có thể tùy chỉnh style riêng
- ✅ **Default configs**: Các config tab phổ biến
- ✅ **TypeScript support**: Type-safe hoàn toàn
- ✅ **Color sync**: Tích hợp với tab color context

## Style Presets

### 1. `default` (mặc định)
- Tương phản cao, minimal design
- Tab được chọn: nền đen, chữ trắng
- Thích hợp cho: Tất cả các trang

### 2. `bordered`
- Có border cho container và tab
- Tab được chọn: border màu primary
- Thích hợp cho: Trang cần phân biệt rõ ràng

### 3. `underlined`
- Có underline indicator
- Tab được chọn: màu primary, có underline
- Thích hợp cho: Trang truyền thống

### 4. `elevated`
- Có shadow cho container và tab
- Tab được chọn: shadow nổi bật
- Thích hợp cho: Trang cần hiệu ứng đẹp

### 5. `soft`
- Màu sắc nhẹ nhàng
- Tab được chọn: nền màu primary.lighter
- Thích hợp cho: Trang cần giao diện dịu mắt

## Cách sử dụng

### 1. Sử dụng style preset

```typescript
import { useTabManager } from 'src/components/tab-manager';

const { renderTabs } = useTabManager({
  tabs: myTabs,
  stylePreset: 'bordered', // 'default', 'underlined', 'elevated', 'soft'
});
```

### 2. Sử dụng custom styles

```typescript
const { renderTabs } = useTabManager({
  tabs: myTabs,
  customStyles: {
    container: {
      backgroundColor: 'primary.lighter',
      borderRadius: 2,
      p: 1,
    },
    tab: {
      '&.Mui-selected': {
        color: 'primary.main',
        backgroundColor: 'background.paper',
        transform: 'scale(1.05)',
      },
    },
  },
});
```

### 3. Kết hợp preset và custom

```typescript
const { renderTabs } = useTabManager({
  tabs: myTabs,
  stylePreset: 'soft',
  customStyles: {
    container: { p: 2 },
    tab: { minHeight: 56 },
  },
});
```

### 4. Sử dụng default configs

```typescript
import { DEFAULT_TAB_CONFIGS } from 'src/components/tab-manager';

const { renderTabs } = useTabManager({
  tabs: DEFAULT_TAB_CONFIGS.calculator, // 'overview', 'subject', 'calculator'
  stylePreset: 'elevated',
});
```

## Default Tab Configs

### `DEFAULT_TAB_CONFIGS.overview`
```typescript
[
  { value: 'overview', label: 'Tổng quan', colorKey: 'primary' },
  { value: 'details', label: 'Chi tiết', colorKey: 'secondary' },
  { value: 'settings', label: 'Cài đặt', colorKey: 'info' },
]
```

### `DEFAULT_TAB_CONFIGS.calculator`
```typescript
[
  { value: 'main', label: 'Tính toán', colorKey: 'primary' },
  { value: 'history', label: 'Lịch sử', colorKey: 'secondary' },
  { value: 'guide', label: 'Hướng dẫn', colorKey: 'info' },
]
```

### `DEFAULT_TAB_CONFIGS.subject`
```typescript
[
  { value: 'overview', label: 'Tổng quan', colorKey: 'primary' },
  { value: 'topics', label: 'Chủ đề', colorKey: 'secondary' },
  { value: 'practice', label: 'Luyện tập', colorKey: 'success' },
  { value: 'guide', label: 'Hướng dẫn', colorKey: 'info' },
]
```

## Utility Functions

### `getTabManagerStyles(preset)`
```typescript
import { getTabManagerStyles } from 'src/components/tab-manager';

const styles = getTabManagerStyles('bordered');
// Returns: { container: {...}, tab: {...} }
```

### `mergeTabManagerStyles(customStyles, preset)`
```typescript
import { mergeTabManagerStyles } from 'src/components/tab-manager';

const styles = mergeTabManagerStyles(
  { container: { p: 2 } },
  'soft'
);
```

## Ví dụ hoàn chỉnh

```typescript
'use client';

import { Box } from '@mui/material';
import { useTabManager, DEFAULT_TAB_CONFIGS } from 'src/components/tab-manager';

export function MyPage() {
  const { currentTab, renderTabs } = useTabManager({
    tabs: DEFAULT_TAB_CONFIGS.calculator,
    defaultTab: 'main',
    stylePreset: 'elevated',
    customStyles: {
      container: {
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 1,
      },
    },
    onTabChange: (tab) => console.log('Current tab:', tab),
  });

  const renderContent = () => {
    switch (currentTab) {
      case 'main':
        return <CalculatorContent />;
      case 'history':
        return <HistoryContent />;
      case 'guide':
        return <GuideContent />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {renderTabs()}
      <Box sx={{ mt: 3 }}>
        {renderContent()}
      </Box>
    </Box>
  );
}
```

## Migration từ code cũ

### Trước (hardcoded styles)
```typescript
const { renderTabs } = useTabManager({
  tabs: myTabs,
  tabsProps: {
    sx: {
      '& .MuiTab-root': {
        minHeight: 48,
        // ... nhiều styles
      }
    }
  }
});
```

### Sau (sử dụng presets)
```typescript
const { renderTabs } = useTabManager({
  tabs: myTabs,
  stylePreset: 'default', // hoặc preset khác
});
```

## Lợi ích

1. **Consistency**: Tất cả tabs có style nhất quán
2. **Maintainability**: Chỉ cần sửa ở một nơi
3. **Flexibility**: Có thể tùy chỉnh khi cần
4. **Developer Experience**: Ít code hơn, dễ sử dụng hơn
5. **Type Safety**: TypeScript support đầy đủ

## File Structure

```
src/components/tab-manager/
├── tab-manager.tsx              # Main component
├── tab-manager-default-styles.ts # Style definitions
├── tab-manager-examples.tsx     # Usage examples
├── index.ts                     # Exports
└── README.md                    # Documentation
```
