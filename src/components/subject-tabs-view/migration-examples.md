# Migration Examples

Dưới đây là các ví dụ về cách refactor các sections khác để sử dụng `SubjectTabsView`:

## Geometry Section

```tsx
// src/sections/geometry/geometry-view.tsx
'use client';

import { paths } from 'src/routes/paths';
import { SubjectTabsView, type TopicItem } from 'src/components/subject-tabs-view';

const GEOMETRY_TOPICS: TopicItem[] = [
  {
    id: 'plane-geometry',
    title: 'Hình học mặt phẳng',
    description: 'Điểm, đường thẳng, góc, tam giác, tứ giác và đường tròn',
    path: paths.dashboard.geometry.plane.root,
    icon: 'solar:pen-bold',
    color: '#3b82f6',
  },
  {
    id: 'spatial-geometry',
    title: 'Hình học không gian',
    description: 'Hình lăng trụ, chóp, trụ, nón, cầu và các mặt cong',
    path: paths.dashboard.geometry.spatial.root,
    icon: 'solar:box-bold',
    color: '#10b981',
  },
  {
    id: 'coordinate-geometry',
    title: 'Hình học tọa độ',
    description: 'Tọa độ Descartes, cực, tham số và vector',
    path: paths.dashboard.geometry.coordinate.root,
    icon: 'solar:chart-square-outline',
    color: '#f59e0b',
  },
];

export function GeometryView() {
  return (
    <SubjectTabsView
      title="Hình học và đo lường"
      description="Khám phá thế giới hình học từ mặt phẳng đến không gian với các công cụ đo lường và tính toán."
      subjectTitle="Hình học và đo lường"
      subjectDescription="Hình học là ngành toán học nghiên cứu về hình dạng, kích thước, vị trí tương đối của các hình và tính chất của không gian. Từ hình học phẳng cơ bản đến hình học không gian phức tạp."
      topics={GEOMETRY_TOPICS}
    />
  );
}
```

## Statistics Section

```tsx
// src/sections/statistics/statistics-view.tsx
'use client';

import { paths } from 'src/routes/paths';
import { SubjectTabsView, type TopicItem } from 'src/components/subject-tabs-view';

const STATISTICS_TOPICS: TopicItem[] = [
  {
    id: 'descriptive-stats',
    title: 'Thống kê mô tả',
    description: 'Mean, median, mode, standard deviation và các measures khác',
    path: paths.dashboard.statistics.descriptive,
    icon: 'solar:chart-bold',
    color: '#3b82f6',
  },
  {
    id: 'probability',
    title: 'Xác suất',
    description: 'Các quy tắc xác suất cơ bản và phân phối xác suất',
    path: paths.dashboard.statistics.probability,
    icon: 'solar:dice-bold',
    color: '#10b981',
  },
  {
    id: 'inferential-stats',
    title: 'Thống kê suy luận',
    description: 'Kiểm định giả thuyết và khoảng tin cậy',
    path: paths.dashboard.statistics.inferential,
    icon: 'solar:graph-up-bold',
    color: '#f59e0b',
  },
];

export function StatisticsView() {
  return (
    <SubjectTabsView
      title="Thống kê và xác suất"
      description="Tìm hiểu về thống kê mô tả, xác suất và thống kê suy luận với các công cụ tính toán."
      subjectTitle="Thống kê và xác suất"
      subjectDescription="Thống kê và xác suất là những công cụ quan trọng để phân tích dữ liệu và đưa ra quyết định dựa trên bằng chứng. Từ việc mô tả dữ liệu đến dự đoán và suy luận."
      topics={STATISTICS_TOPICS}
    />
  );
}
```

## Calculus Section

```tsx
// src/sections/calculus/calculus-view.tsx
'use client';

import { paths } from 'src/routes/paths';
import { SubjectTabsView, type TopicItem } from 'src/components/subject-tabs-view';

const CALCULUS_TOPICS: TopicItem[] = [
  {
    id: 'limits',
    title: 'Giới hạn',
    description: 'Khái niệm giới hạn và tính liên tục của hàm số',
    path: paths.dashboard.calculus.limits,
    icon: 'solar:infinity-bold',
    color: '#3b82f6',
  },
  {
    id: 'derivatives',
    title: 'Đạo hàm',
    description: 'Quy tắc đạo hàm và ứng dụng của đạo hàm',
    path: paths.dashboard.calculus.derivatives,
    icon: 'solar:chart-square-bold',
    color: '#10b981',
  },
  {
    id: 'integrals',
    title: 'Tích phân',
    description: 'Tích phân xác định, bất định và ứng dụng',
    path: paths.dashboard.calculus.integrals,
    icon: 'solar:graph-up-bold',
    color: '#f59e0b',
  },
];

export function CalculusView() {
  return (
    <SubjectTabsView
      title="Giải tích"
      description="Khám phá thế giới giải tích với giới hạn, đạo hàm và tích phân."
      subjectTitle="Giải tích"
      subjectDescription="Giải tích là nhánh toán học nghiên cứu về sự biến thiên và tích lũy. Nó bao gồm việc nghiên cứu giới hạn, đạo hàm, tích phân và chuỗi vô hạn."
      topics={CALCULUS_TOPICS}
    />
  );
}
```

## Trigonometry Section

```tsx
// src/sections/trigonometry/trigonometry-view.tsx
'use client';

import { paths } from 'src/routes/paths';
import { SubjectTabsView, type TopicItem } from 'src/components/subject-tabs-view';

const TRIGONOMETRY_TOPICS: TopicItem[] = [
  {
    id: 'basic-functions',
    title: 'Hàm lượng giác cơ bản',
    description: 'Sin, cos, tan và các tính chất cơ bản',
    path: paths.dashboard.trigonometry.basic,
    icon: 'solar:pie-chart-bold',
    color: '#3b82f6',
  },
  {
    id: 'identities',
    title: 'Đồng nhất thức',
    description: 'Các đồng nhất thức lượng giác quan trọng',
    path: paths.dashboard.trigonometry.identities,
    icon: 'solar:calculator-bold',
    color: '#10b981',
  },
  {
    id: 'equations',
    title: 'Phương trình lượng giác',
    description: 'Giải các phương trình lượng giác cơ bản và nâng cao',
    path: paths.dashboard.trigonometry.equations,
    icon: 'solar:graph-bold',
    color: '#f59e0b',
  },
];

export function TrigonometryView() {
  return (
    <SubjectTabsView
      title="Lượng giác"
      description="Tìm hiểu về các hàm lượng giác, đồng nhất thức và phương trình lượng giác."
      subjectTitle="Lượng giác"
      subjectDescription="Lượng giác là nhánh toán học nghiên cứu mối quan hệ giữa các góc và cạnh của tam giác, cũng như các hàm số tuần hoàn liên quan."
      topics={TRIGONOMETRY_TOPICS}
    />
  );
}
```

## Custom Tabs Example

```tsx
// Ví dụ với custom tabs
export function CustomSubjectView() {
  const customTabs = [
    { value: 'overview', label: 'Tổng quan', icon: 'solar:flag-bold' },
    { value: 'topics', label: 'Chủ đề', icon: 'solar:list-bold' },
    { value: 'simulator', label: 'Mô phỏng', icon: 'solar:monitor-bold' },
    { value: 'examples', label: 'Ví dụ', icon: 'solar:lightbulb-bold' },
  ];

  const renderCustomTab = (tabValue: string) => {
    switch (tabValue) {
      case 'simulator':
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Mô phỏng
            </Typography>
            {/* Interactive simulator component */}
          </Box>
        );
      case 'examples':
        return (
          <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Ví dụ minh họa
            </Typography>
            {/* Examples component */}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <SubjectTabsView
      title="Môn học với tabs tùy chỉnh"
      description="Ví dụ về việc sử dụng custom tabs"
      subjectTitle="Môn học đặc biệt"
      subjectDescription="Môn học này có các tabs đặc biệt..."
      topics={TOPICS}
      tabs={customTabs}
      renderCustomTab={renderCustomTab}
    />
  );
}
