# SubjectTabsView Component

Component tái sử dụng cho việc hiển thị các subject có tabs trong ứng dụng Math.

## Tổng quan

`SubjectTabsView` là một component được thiết kế để tái sử dụng cho tất cả các page subject (arithmetic, algebra, geometry, v.v.) trong ứng dụng Math. Component này cung cấp một giao diện nhất quán với tabs và hiển thị danh sách topics.

## Tính năng

- **Tabs mặc định**: Overview, Topics, Practice, Guide
- **Tùy chỉnh tabs**: Có thể override tabs mặc định
- **Hiển thị topics**: Grid view (Overview) và List view (Topics)
- **Responsive design**: Tự động adapt theo kích thước màn hình
- **Custom content**: Có thể inject custom content cho Practice và Guide tabs

## Interface

### TopicItem
```typescript
interface TopicItem {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  color: string;
}
```

### TabConfig
```typescript
interface TabConfig {
  value: string;
  label: string;
  icon: string;
}
```

### SubjectTabsViewProps
```typescript
interface SubjectTabsViewProps {
  title: string;                              // Tiêu đề của page
  description: string;                        // Mô tả của page
  subjectTitle: string;                       // Tiêu đề trong tab Overview
  subjectDescription: string;                 // Mô tả trong tab Overview
  topics: TopicItem[];                        // Danh sách topics
  tabs?: TabConfig[];                         // Custom tabs (optional)
  defaultTab?: string;                        // Tab mặc định (optional)
  renderCustomTab?: (tabValue: string) => React.ReactNode; // Custom tab renderer
  practiceContent?: React.ReactNode;          // Custom practice content
  guideContent?: React.ReactNode;             // Custom guide content
}
```

## Cách sử dụng

### 1. Sử dụng cơ bản

```tsx
import { SubjectTabsView, type TopicItem } from 'src/components/subject-tabs-view';

const TOPICS: TopicItem[] = [
  {
    id: 'topic-1',
    title: 'Chủ đề 1',
    description: 'Mô tả chủ đề 1',
    path: '/path/to/topic-1',
    icon: 'solar:calculator-bold',
    color: '#3b82f6',
  },
  // ... thêm topics
];

export function MySubjectView() {
  return (
    <SubjectTabsView
      title="Tên môn học"
      description="Mô tả môn học"
      subjectTitle="Tên môn học chi tiết"
      subjectDescription="Mô tả chi tiết về môn học..."
      topics={TOPICS}
    />
  );
}
```

### 2. Sử dụng với custom content

```tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const customPracticeContent = (
  <Box>
    <Typography variant="h5" sx={{ mb: 3 }}>
      Bài tập thực hành
    </Typography>
    {/* Custom practice content */}
  </Box>
);

const customGuideContent = (
  <Box>
    <Typography variant="h5" sx={{ mb: 3 }}>
      Hướng dẫn đặc biệt
    </Typography>
    {/* Custom guide content */}
  </Box>
);

export function MySubjectView() {
  return (
    <SubjectTabsView
      title="Tên môn học"
      description="Mô tả môn học"
      subjectTitle="Tên môn học chi tiết"
      subjectDescription="Mô tả chi tiết về môn học..."
      topics={TOPICS}
      practiceContent={customPracticeContent}
      guideContent={customGuideContent}
    />
  );
}
```

### 3. Sử dụng với custom tabs

```tsx
const customTabs = [
  { value: 'overview', label: 'Tổng quan', icon: 'solar:flag-bold' },
  { value: 'topics', label: 'Chủ đề', icon: 'solar:list-bold' },
  { value: 'exercises', label: 'Bài tập', icon: 'solar:pen-bold' },
  { value: 'theory', label: 'Lý thuyết', icon: 'solar:book-bold' },
];

const renderCustomTab = (tabValue: string) => {
  switch (tabValue) {
    case 'exercises':
      return (
        <Box>
          <Typography variant="h5">Bài tập đặc biệt</Typography>
          {/* Custom exercises content */}
        </Box>
      );
    case 'theory':
      return (
        <Box>
          <Typography variant="h5">Lý thuyết</Typography>
          {/* Custom theory content */}
        </Box>
      );
    default:
      return null; // Fallback to default tabs
  }
};

export function MySubjectView() {
  return (
    <SubjectTabsView
      title="Tên môn học"
      description="Mô tả môn học"
      subjectTitle="Tên môn học chi tiết"
      subjectDescription="Mô tả chi tiết về môn học..."
      topics={TOPICS}
      tabs={customTabs}
      defaultTab="overview"
      renderCustomTab={renderCustomTab}
    />
  );
}
```

## Ví dụ thực tế

Xem các file sau để tham khảo cách sử dụng:
- `src/sections/arithmetic/arithmetic-view.tsx`
- `src/sections/algebra/algebra-view.tsx`

## Migration từ code cũ

### Trước khi refactor:
```tsx
export function OldSubjectView() {
  const [currentTab, setCurrentTab] = useState('overview');
  const router = useRouter();
  
  // Lots of render functions and logic...
  
  return (
    <DashboardPageWithTabsLayout>
      {/* Complex tab logic */}
    </DashboardPageWithTabsLayout>
  );
}
```

### Sau khi refactor:
```tsx
export function NewSubjectView() {
  return (
    <SubjectTabsView
      title="Subject Title"
      description="Subject Description"
      subjectTitle="Detailed Title"
      subjectDescription="Detailed Description"
      topics={TOPICS}
    />
  );
}
```

## Lợi ích

1. **Giảm code duplication**: Không cần viết lại logic tabs cho mỗi subject
2. **Consistent UI**: Tất cả subjects có giao diện nhất quán
3. **Easy maintenance**: Chỉ cần update một component cho tất cả subjects
4. **Flexible**: Có thể customize theo nhu cầu từng subject
5. **TypeScript support**: Full type safety với TypeScript

## Performance

Component được tối ưu hóa với:
- React.memo cho các sub-components
- Efficient re-rendering với proper key props
- Lazy loading content chỉ khi cần thiết
