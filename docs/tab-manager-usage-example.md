# TabManager Component - Hướng dẫn sử dụng

## Tổng quan
`TabManager` là component tab dùng chung cho toàn bộ dự án, không chỉ riêng cho arithmetic.

## Cấu trúc thư mục
```
src/components/
├── tab-manager/           # ✅ Component dùng chung chính
│   ├── tab-manager.tsx
│   └── index.ts
├── arithmetic-tabs/       # Wrapper cho arithmetic pages  
└── subject-tabs/          # Wrapper cho subject pages
```

## Interface đầu vào

### TabManagerTabConfig
```typescript
interface TabManagerTabConfig {
  value: string;               // ID tab (required)
  label: string;              // Tên hiển thị (required) 
  icon?: React.ReactElement;  // Icon component
  colorKey?: string;          // Key màu từ theme
  disabled?: boolean;         // Disable tab
  sx?: Record<string, any>;   // Custom styling
}
```

## Cách sử dụng trực tiếp

### 1. Import component
```typescript
import { useTabManager } from 'src/components/tab-manager';
import { Iconify } from 'src/components/iconify';
```

### 2. Tạo data tabs
```typescript
const tabsData: TabManagerTabConfig[] = [
  {
    value: 'overview',
    label: 'Tổng quan',
    icon: <Iconify icon="solar:flag-bold" sx={{ color: '#1976d2' }} />,
    colorKey: 'primary'
  },
  {
    value: 'calculator', 
    label: 'Tính toán',
    icon: <Iconify icon="solar:calculator-bold" sx={{ color: '#388e3c' }} />,
    colorKey: 'success'
  },
  {
    value: 'history',
    label: 'Lịch sử',
    icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: '#9c27b0' }} />,
    colorKey: 'secondary'
  }
];
```

### 3. Sử dụng hook
```typescript
const { currentTab, renderTabs, handleTabChange } = useTabManager({
  tabs: tabsData,
  defaultTab: 'overview',
  onTabChange: (tabValue) => {
    console.log('Tab changed to:', tabValue);
  },
  enableColorSync: true
});
```

### 4. Render trong component
```typescript
export function MyPage() {
  const { currentTab, renderTabs } = useTabManager({
    tabs: tabsData,
    defaultTab: 'overview'
  });

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewContent />;
      case 'calculator':
        return <CalculatorContent />;
      case 'history':
        return <HistoryContent />;
      default:
        return null;
    }
  };

  return (
    <Box>
      {renderTabs()}
      <Box sx={{ mt: 3 }}>
        {renderContent()}
      </Box>
    </Box>
  );
}
```

## Ví dụ hoàn chỉnh

```typescript
'use client';

import { Box } from '@mui/material';
import { useTabManager } from 'src/components/tab-manager';
import { Iconify } from 'src/components/iconify';
import type { TabManagerTabConfig } from 'src/components/tab-manager';

const EXAMPLE_TABS: TabManagerTabConfig[] = [
  {
    value: 'dashboard',
    label: 'Bảng điều khiển',
    icon: <Iconify icon="solar:widget-bold" sx={{ color: '#1976d2' }} />
  },
  {
    value: 'analytics',
    label: 'Phân tích',
    icon: <Iconify icon="solar:chart-bold" sx={{ color: '#388e3c' }} />
  },
  {
    value: 'settings',
    label: 'Cài đặt',
    icon: <Iconify icon="solar:settings-bold" sx={{ color: '#f57c00' }} />
  }
];

export function ExamplePage() {
  const { currentTab, renderTabs } = useTabManager({
    tabs: EXAMPLE_TABS,
    defaultTab: 'dashboard',
    onTabChange: (tab) => console.log('Current tab:', tab)
  });

  return (
    <Box>
      {/* Render tabs */}
      {renderTabs()}
      
      {/* Render content based on current tab */}
      <Box sx={{ mt: 3, p: 2 }}>
        {currentTab === 'dashboard' && <div>Dashboard content</div>}
        {currentTab === 'analytics' && <div>Analytics content</div>}
        {currentTab === 'settings' && <div>Settings content</div>}
      </Box>
    </Box>
  );
}
```

## Kết luận

✅ **Tab component đã đạt yêu cầu:**
- Là component dùng chung, không chỉ cho arithmetic
- Vị trí tổ chức file đúng
- Interface đầu vào rõ ràng: mảng object với icon, color, label
- Cách sử dụng đơn giản: chỉ cần truyền data array

✅ **Ưu điểm:**
- Tách biệt logic và UI
- Hỗ trợ color sync
- Có wrapper cho từng domain
- TypeScript support đầy đủ

🔧 **Có thể cải thiện:**
- Icon color có thể được tự động từ colorKey
- Thêm examples và documentation
