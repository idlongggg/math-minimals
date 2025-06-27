# Dashboard Page Layout Components

Bộ component layout cho dashboard với thiết kế cố định title/description và nội dung có thể scroll.

## Tính năng chính

- ✅ **Title và Description cố định** - Không bị scroll, luôn hiển thị ở đầu trang
- ✅ **Nội dung có thể scroll** - Phần content bên dưới có thể scroll độc lập
- ✅ **Hỗ trợ tabs** - Tabs cố định, chỉ nội dung tab scroll
- ✅ **Metadata tập trung** - Quản lý title/description trong file constants
- ✅ **Responsive** - Tương thích với mọi kích thước màn hình
- ✅ **Tái sử dụng cao** - Component modularity

## Cấu trúc Layout

```
┌─────────────────────────────────────┐
│ Title (cố định)                     │
│ Description (cố định)               │
├─────────────────────────────────────┤
│ Tabs (cố định, nếu có)             │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │ Nội dung (có thể scroll)        │ │
│ │                                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Components

### 1. DashboardPageLayoutWithMetadata
Layout cơ bản không có tabs, sử dụng metadata system.

```tsx
import { DashboardPageLayoutWithMetadata } from 'src/components/dashboard-page-layout';

function MyView() {
  return (
    <DashboardPageLayoutWithMetadata pageKey="tools.calculator">
      <Card>
        <CardContent>
          Nội dung của page...
        </CardContent>
      </Card>
    </DashboardPageLayoutWithMetadata>
  );
}
```

### 2. DashboardPageWithTabsLayoutAndMetadata  
Layout có tabs, sử dụng metadata system.

```tsx
import { DashboardPageWithTabsLayoutAndMetadata } from 'src/components/dashboard-page-layout';
import { CustomTabs } from 'src/components/custom-tabs';

function MyTabsView() {
  const [currentTab, setCurrentTab] = useState('tab1');

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
      <Tab value="tab1" label="Tab 1" />
      <Tab value="tab2" label="Tab 2" />
    </CustomTabs>
  );

  return (
    <DashboardPageWithTabsLayoutAndMetadata 
      pageKey="arithmetic.primeNumbers"
      tabs={renderTabs()}
    >
      {currentTab === 'tab1' && <Tab1Content />}
      {currentTab === 'tab2' && <Tab2Content />}
    </DashboardPageWithTabsLayoutAndMetadata>
  );
}
```

## Metadata System

### 1. Định nghĩa metadata trong `src/constants/page-metadata.ts`

```typescript
export const PAGE_METADATA: Record<string, PageMetadata> = {
  'arithmetic.primeNumbers': {
    title: 'Số nguyên tố',
    description: 'Công cụ kiểm tra và tìm số nguyên tố với các thuật toán tối ưu.',
    keywords: ['số nguyên tố', 'prime numbers'],
  },
  'tools.calculator': {
    title: 'Máy tính khoa học',
    description: 'Máy tính khoa học với các chức năng toán học nâng cao.',
    keywords: ['máy tính', 'calculator'],
  },
  // ... thêm các page khác
};
```

### 2. Sử dụng hook `usePageMetadata`

```tsx
import { usePageMetadata } from 'src/hooks/use-page-metadata';

function MyComponent() {
  const metadata = usePageMetadata('arithmetic.primeNumbers');
  // metadata = { title: 'Số nguyên tố', description: '...', keywords: [...] }
}
```

## Props

### DashboardPageLayoutWithMetadata Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageKey` | `string` | ✅ | - | Key để lấy metadata từ constants |
| `children` | `ReactNode` | ✅ | - | Nội dung của page |
| `maxWidth` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | ❌ | `'xl'` | Độ rộng tối đa của container |
| `title` | `string` | ❌ | - | Override title từ metadata |
| `description` | `string` | ❌ | - | Override description từ metadata |
| `sx` | `SxProps<Theme>` | ❌ | - | Style cho container |
| `headerSx` | `SxProps<Theme>` | ❌ | - | Style cho header |
| `contentSx` | `SxProps<Theme>` | ❌ | - | Style cho content area |

### DashboardPageWithTabsLayoutAndMetadata Props

Tương tự như trên, plus:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tabs` | `ReactNode` | ✅ | - | Tabs component |
| `tabsSx` | `SxProps<Theme>` | ❌ | - | Style cho tabs area |

## Migration Guide

### Từ layout cũ sang layout mới

**Trước (layout cũ):**
```tsx
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';

function PrimeNumbersView() {
  return (
    <DashboardPageWithTabsLayout 
      title="Số nguyên tố"
      description="Công cụ kiểm tra và tìm số nguyên tố với các thuật toán tối ưu."
      tabs={renderTabs()}
    >
      {children}
    </DashboardPageWithTabsLayout>
  );
}
```

**Sau (layout mới):**
```tsx
import { DashboardPageWithTabsLayoutAndMetadata } from 'src/components/dashboard-page-layout';

function PrimeNumbersView() {
  return (
    <DashboardPageWithTabsLayoutAndMetadata 
      pageKey="arithmetic.primeNumbers"
      tabs={renderTabs()}
    >
      {children}
    </DashboardPageWithTabsLayoutAndMetadata>
  );
}
```

### Lợi ích của layout mới

1. **Metadata tập trung**: Dễ quản lý title/description của tất cả pages
2. **Tái sử dụng cao**: Không cần lặp lại code cho mỗi page
3. **Consistency**: Đảm bảo tính nhất quán về UI/UX
4. **SEO friendly**: Metadata có thể dễ dàng extend cho SEO
5. **Maintainability**: Dễ bảo trì và cập nhật

## Example Pages

- **Với tabs**: Đã được tích hợp sẵn trong các section
- **Không tabs**: Các view thông thường trong sections
- **Thực tế**: `src/sections/arithmetic/prime-numbers-view.tsx` (đã được cập nhật)

## Backward Compatibility

Layout cũ vẫn được giữ lại để đảm bảo tương thích ngược:
- `DashboardPageLayout` 
- `DashboardPageWithTabsLayout`

Các page hiện tại có thể từ từ migrate sang layout mới khi có thời gian.
