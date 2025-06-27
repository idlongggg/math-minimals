# Custom Components Usage Guidelines

## Ưu tiên sử dụng Custom Components trong dự án

Để đảm bảo tính nhất quán và khả năng tùy chỉnh trong tương lai, hãy ưu tiên sử dụng các custom components thay vì Material UI components trực tiếp:

### 1. Layout Components
- ✅ **DashboardPageLayout** thay vì `Container` 
- ✅ **DashboardPageWithTabsLayout** cho các trang có tabs
- ✅ **DashboardPageContainer, DashboardPageContent** cho custom layout

### 2. Custom UI Components
- ✅ **CustomTabs + CustomTab** thay vì `Tabs + Tab`
- ✅ **CustomPopover** thay vì `Popover`
- ✅ **CustomCard, CustomCardContent, CustomCardHeader** thay vì `Card, CardContent, CardHeader`
- ✅ **CustomButton** thay vì `Button`
- ✅ **CustomTextField** thay vì `TextField`
- ✅ **CustomAlert** thay vì `Alert`
- ✅ **Iconify** thay vì Material UI icons

### 3. Utility Components
- ✅ **Scrollbar** cho custom scrollbar styling
- ✅ **Label** cho labels với custom styling
- ✅ **LoadingScreen** cho loading states
- ✅ **SearchNotFound** cho empty states

### 4. Các Component vẫn có thể sử dụng trực tiếp MUI
Những component này có thể sử dụng trực tiếp từ MUI nếu chưa có custom version:
- `Box` - component cơ bản cho layout
- `Typography` - text styling
- `Stack` - flexbox layout helper
- `Grid` - grid layout system
- `FormControl, InputLabel, MenuItem, Select` - form controls phức tạp
- `Chip` - tag component

### 5. Migration Strategy

#### Ưu tiên cao:
1. **Layout**: Sử dụng DashboardPageLayout thay vì Container
2. **Tabs**: Thay thế Tab + Tabs bằng CustomTab + CustomTabs  
3. **Popover**: Sử dụng CustomPopover
4. **Icons**: Sử dụng Iconify thay vì MUI icons

#### Ưu tiên trung bình:
1. **Cards**: Thay thế Card components bằng Custom versions
2. **Buttons**: Sử dụng CustomButton
3. **TextFields**: Sử dụng CustomTextField cho form inputs
4. **Alerts**: Sử dụng CustomAlert

### 6. Example Usage

```tsx
// ❌ Old way - trực tiếp sử dụng MUI
import { Container, Card, CardContent, Button, Tab, Tabs, Alert } from '@mui/material';

function OldComponent() {
  return (
    <Container>
      <Card>
        <CardContent>
          <Alert severity="info">Information</Alert>
          <Tabs>
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
          </Tabs>
          <Button variant="contained">Click me</Button>
        </CardContent>
      </Card>
    </Container>
  );
}

// ✅ New way - ưu tiên Custom components
import { 
  DashboardPageLayout,
  CustomCard, CustomCardContent,
  CustomTabs, CustomTab,
  CustomButton,
  CustomAlert 
} from 'src/components';

function NewComponent() {
  return (
    <DashboardPageLayout title="Page Title">
      <CustomCard>
        <CustomCardContent>
          <CustomAlert severity="info">Information</CustomAlert>
          <CustomTabs>
            <CustomTab label="Tab 1" />
            <CustomTab label="Tab 2" />
          </CustomTabs>
          <CustomButton variant="contained">Click me</CustomButton>
        </CustomCardContent>
      </CustomCard>
    </DashboardPageLayout>
  );
}
```

### 7. Files Updated
Đã cập nhật các file sau để ưu tiên custom components:

1. `src/sections/tools/scientific-calculator-view.tsx` - sử dụng DashboardPageLayout
2. `src/sections/arithmetic/arithmetic-view.tsx` - sử dụng CustomTab  
3. Tạo mới các custom components:
   - `src/components/custom-tabs/custom-tab.tsx`
   - `src/components/custom-card/`
   - `src/components/custom-button/`
   - `src/components/custom-text-field/`
   - `src/components/custom-alert/`

### 8. Next Steps
Để hoàn thiện migration:

1. **Cập nhật index exports**: Thêm custom components vào main exports
2. **Update existing pages**: Thay thế MUI components trong các sections
3. **Create more wrappers**: Tạo thêm custom components cho FormControl, Select, etc.
4. **Documentation**: Cập nhật docs và examples
5. **Testing**: Đảm bảo tất cả thay đổi hoạt động đúng

### 9. Benefits
- **Consistency**: Giao diện nhất quán across toàn bộ app
- **Customization**: Dễ dàng customize styling và behavior
- **Maintainability**: Centralized component logic
- **Future-proof**: Dễ upgrade và thay đổi design system
- **Bundle size**: Có thể optimize imports và reduce bundle size
