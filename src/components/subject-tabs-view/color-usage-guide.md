# Subject Tabs View - Color Usage Guide

## Cách sử dụng màu sắc cho tabs

Subject Tabs View hiện đã hỗ trợ tùy chỉnh màu sắc cho từng tab. Dưới đây là cách sử dụng:

### 1. Cấu hình màu cho tabs tùy chỉnh

```typescript
import { SubjectTabsView, TabConfig } from 'src/components/subject-tabs-view';

const customTabs: TabConfig[] = [
  {
    value: 'basics',
    label: 'Cơ bản',
    icon: 'solar:book-bold',
    color: '#1976d2', // Màu xanh dương
  },
  {
    value: 'advanced',
    label: 'Nâng cao', 
    icon: 'solar:star-bold',
    color: '#d32f2f', // Màu đỏ
  },
  {
    value: 'examples',
    label: 'Ví dụ',
    icon: 'solar:code-bold', 
    color: '#388e3c', // Màu xanh lá
  },
];

// Sử dụng trong component
<SubjectTabsView
  title="Học Toán"
  description="Khám phá các chủ đề toán học"
  subjectTitle="Đại số"
  subjectDescription="Học các khái niệm cơ bản về đại số"
  topics={topics}
  tabs={customTabs} // Sử dụng tabs tùy chỉnh với màu sắc
/>
```

### 2. Sử dụng tabs mặc định (đã có màu sắc)

Nếu không truyền prop `tabs`, component sẽ sử dụng tabs mặc định với màu sắc được thiết kế sẵn:

- **Tổng quan** (`overview`): Màu xanh dương (`#1976d2`)
- **Chủ đề** (`topics`): Màu xanh lá (`#388e3c`) 
- **Luyện tập** (`practice`): Màu cam (`#f57c00`)
- **Hướng dẫn** (`guide`): Màu tím (`#7b1fa2`)

```typescript
<SubjectTabsView
  title="Học Toán"
  description="Khám phá các chủ đề toán học"
  subjectTitle="Hình học"
  subjectDescription="Học các khái niệm cơ bản về hình học"
  topics={topics}
  // Không cần truyền tabs - sẽ dùng mặc định với màu sắc
/>
```

### 3. Hiệu ứng màu sắc

Khi sử dụng màu sắc cho tabs:

- **Icon**: Hiển thị với màu tương ứng khi tab được chọn
- **Text**: Màu chữ sẽ thay đổi theo màu của tab khi được chọn
- **Hover effect**: Khi hover vào tab, màu sẽ hiển thị với độ mờ 0.8
- **Indicator background**: Nền của indicator sẽ có màu nhạt tương ứng với tab được chọn
- **Smooth transitions**: Tất cả hiệu ứng đều có transition mượt mà

### 4. Lưu ý khi chọn màu sắc

- Sử dụng mã màu hex (`#1976d2`) hoặc tên màu CSS
- Nên chọn màu có độ tương phản tốt với nền
- Màu sắc nên thống nhất với design system của ứng dụng
- Có thể sử dụng màu từ Material-UI palette

### 5. Ví dụ với màu Material-UI

```typescript
import { useTheme } from '@mui/material/styles';

const ExampleComponent = () => {
  const theme = useTheme();
  
  const tabs: TabConfig[] = [
    {
      value: 'info',
      label: 'Thông tin',
      icon: 'solar:info-circle-bold',
      color: theme.palette.info.main,
    },
    {
      value: 'warning',
      label: 'Cảnh báo',
      icon: 'solar:danger-triangle-bold', 
      color: theme.palette.warning.main,
    },
    {
      value: 'success',
      label: 'Thành công',
      icon: 'solar:check-circle-bold',
      color: theme.palette.success.main,
    },
  ];

  return (
    <SubjectTabsView
      // ... other props
      tabs={tabs}
    />
  );
};
```

## Tính năng mới

- ✅ Hỗ trợ tùy chỉnh màu sắc cho từng tab
- ✅ Icon hiển thị với màu tương ứng
- ✅ Hiệu ứng hover và transition mượt mà
- ✅ Indicator background với màu nhạt tương ứng
- ✅ Tương thích ngược với code cũ
- ✅ Sử dụng màu mặc định nếu không chỉ định màu
