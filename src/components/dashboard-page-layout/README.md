# Dashboard Page Layout Components

Để tối ưu hóa và tái sử dụng layout cho tất cả các trang dashboard, chúng ta đã tạo ra hệ thống layout modular với các component riêng biệt:

## Kiến trúc mới (Refactored)

### 1. DashboardPageContainer
Component cha chứa layout cơ bản và header cố định (title + description).

### 2. DashboardPageHeader  
Component header cố định với title và description.

### 3. DashboardPageContent
Component content scrollable cho các trang thông thường.

### 4. DashboardPageWithTabsContent
Component content đặc biệt cho các trang có tabs - tabs cố định, chỉ content scrollable.

## Cách sử dụng

### 1. DashboardPageLayout (Refactored)

Component layout cơ bản với header cố định (title + description) và content scrollable.

```tsx
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

export function YourView() {
  return (
    <DashboardPageLayout 
      title="Tiêu đề trang"
      description="Mô tả trang (tùy chọn)"
      maxWidth="xl" // xs | sm | md | lg | xl (mặc định: xl)
    >
      {/* Nội dung scrollable */}
      <YourContent />
    </DashboardPageLayout>
  );
}
```

### Props:

- `title`: string (bắt buộc) - Tiêu đề trang
- `description`: string (tùy chọn) - Mô tả trang
- `children`: ReactNode - Nội dung chính
- `maxWidth`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' - Độ rộng tối đa
- `sx`: SxProps - Style cho container chính
- `headerSx`: SxProps - Style cho phần header
- `contentSx`: SxProps - Style cho phần content

### 2. DashboardPageWithTabsLayout (Refactored)

Component layout đặc biệt cho các trang có tabs, với **header cố định, tabs cố định**, và **chỉ content scrollable**.

### Đặc điểm:
- ✅ Header cố định (title + description)
- ✅ Tabs cố định (không bị cuộn theo trang)
- ✅ Chỉ content bên dưới tabs mới được cuộn
- ✅ Layout tối ưu cho trải nghiệm người dùng

### Sử dụng:

```tsx
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { CustomTabs } from 'src/components/custom-tabs';
import Tab from '@mui/material/Tab';

export function YourViewWithTabs() {
  const [currentTab, setCurrentTab] = useState('tab1');

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
      <Tab value="tab1" label="Tab 1" />
      <Tab value="tab2" label="Tab 2" />
    </CustomTabs>
  );

  return (
    <DashboardPageWithTabsLayout 
      title="Tiêu đề trang"
      description="Mô tả trang"
      tabs={renderTabs()}
    >
      {currentTab === 'tab1' && <Tab1Content />}
      {currentTab === 'tab2' && <Tab2Content />}
    </DashboardPageWithTabsLayout>
  );
}
```

### Props:

Tất cả props của `DashboardPageLayout` cộng thêm:
- `tabs`: ReactNode (bắt buộc) - Component tabs
- `tabsSx`: SxProps - Style cho phần tabs

## 3. Sử dụng Modular Components (Advanced)

Nếu bạn cần tùy chỉnh layout phức tạp hơn, bạn có thể sử dụng các component riêng biệt:

### DashboardPageContainer + DashboardPageContent

```tsx
import { 
  DashboardPageContainer,
  DashboardPageContent 
} from 'src/components/dashboard-page-layout';

export function CustomView() {
  return (
    <DashboardPageContainer title="Custom Title" description="Custom Description">
      <DashboardPageContent>
        <YourContent />
      </DashboardPageContent>
    </DashboardPageContainer>
  );
}
```

### DashboardPageContainer + DashboardPageWithTabsContent

```tsx
import { 
  DashboardPageContainer,
  DashboardPageWithTabsContent 
} from 'src/components/dashboard-page-layout';

export function CustomTabsView() {
  return (
    <DashboardPageContainer title="Custom Title" description="Custom Description">
      <DashboardPageWithTabsContent tabs={renderTabs()}>
        <YourTabContent />
      </DashboardPageWithTabsContent>
    </DashboardPageContainer>
  );
}
```

### Chỉ sử dụng DashboardPageHeader

```tsx
import { 
  DashboardPageContainer,
  DashboardPageHeader 
} from 'src/components/dashboard-page-layout';

export function FullyCustomView() {
  return (
    <DashboardPageContainer title="Title" description="Description">
      <DashboardPageHeader title="Override Title" />
      <CustomContent />
      <CustomFooter />
    </DashboardPageContainer>
  );
}
```

## Ví dụ migration

### Trước đây (BlankView):

```tsx
export function BlankView({ title = 'Blank', sx }: Props) {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4">{title}</Typography>
      {renderContent()}
    </DashboardContent>
  );
}
```

### Sau khi migration:

```tsx
export function BlankView({ title = 'Blank', description, sx }: Props) {
  return (
    <DashboardPageLayout title={title} description={description}>
      {renderContent()}
    </DashboardPageLayout>
  );
}
```

### Lợi ích:

1. **Consistency**: Tất cả các trang có layout đồng nhất
2. **Responsive**: Tự động responsive và scrollable
3. **Maintainable**: Dễ bảo trì và cập nhật
4. **Reusable**: Tái sử dụng được cho tất cả các trang
5. **Flexible**: Có thể customize thông qua props

### Checklist migration:

- [ ] Import `DashboardPageLayout` hoặc `DashboardPageWithTabsLayout`
- [ ] Thay thế `DashboardContent` và layout wrapper
- [ ] Di chuyển title và description ra props
- [ ] Kiểm tra responsive và scrolling
- [ ] Test trên các màn hình khác nhau
