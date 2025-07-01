'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  CustomCard,
  CustomCardContent,
  CustomCardHeader,
} from 'src/components/custom-card';
import { DashboardPageLayoutWithMetadata } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type StatColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

const OVERVIEW_STATS = [
  {
    title: 'Tổng số công cụ',
    value: '24',
    icon: 'solar:pen-bold' as const,
    color: 'primary' as StatColor,
    description: 'Các công cụ toán học có sẵn',
  },
  {
    title: 'Lượt sử dụng hôm nay',
    value: '156',
    icon: 'solar:eye-bold' as const,
    color: 'info' as StatColor,
    description: 'Số lượt truy cập trong ngày',
  },
  {
    title: 'Công thức được lưu',
    value: '89',
    icon: 'solar:heart-bold' as const,
    color: 'success' as StatColor,
    description: 'Công thức đã được đánh dấu',
  },
  {
    title: 'Thời gian trực tuyến',
    value: '99.9%',
    icon: 'solar:info-circle-bold' as const,
    color: 'warning' as StatColor,
    description: 'Tỷ lệ uptime hệ thống',
  },
];

const OVERVIEW_TOOLS = [
  {
    title: 'Máy tính số nguyên tố',
    description: 'Kiểm tra và tìm các số nguyên tố',
    category: 'Số học',
    icon: 'solar:pen-bold' as const,
    color: 'primary' as StatColor,
  },
  {
    title: 'Giải phương trình',
    description: 'Giải các phương trình bậc 1, 2, 3',
    category: 'Đại số',
    icon: 'solar:pen-bold' as const,
    color: 'info' as StatColor,
  },
  {
    title: 'Tính diện tích hình học',
    description: 'Tính diện tích các hình cơ bản',
    category: 'Hình học',
    icon: 'solar:copy-bold' as const,
    color: 'success' as StatColor,
  },
  {
    title: 'Đạo hàm và tích phân',
    description: 'Tính toán vi tích phân',
    category: 'Giải tích',
    icon: 'solar:eye-bold' as const,
    color: 'warning' as StatColor,
  },
  {
    title: 'Thống kê cơ bản',
    description: 'Tính mean, median, mode',
    category: 'Thống kê',
    icon: 'solar:info-circle-bold' as const,
    color: 'error' as StatColor,
  },
  {
    title: 'Chuyển đổi đơn vị',
    description: 'Chuyển đổi giữa các đơn vị',
    category: 'Công cụ',
    icon: 'solar:restart-bold' as const,
    color: 'secondary' as StatColor,
  },
];

const RECENT_ACTIVITIES = [
  {
    action: 'Tính số nguyên tố',
    time: '5 phút trước',
    result: 'Tìm thấy 25 số nguyên tố trong khoảng 1-100',
  },
  {
    action: 'Giải phương trình bậc 2',
    time: '12 phút trước',
    result: 'x₁ = 2, x₂ = -3',
  },
  {
    action: 'Tính diện tích tam giác',
    time: '23 phút trước',
    result: 'S = 15.5 cm²',
  },
  {
    action: 'Đạo hàm hàm số',
    time: '1 giờ trước',
    result: "f'(x) = 2x + 3",
  },
];

export function DashboardOverviewView() {
  const theme = useTheme();
  const [selectedTool, setSelectedTool] = useState<number | null>(null);

  const renderStats = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        mb: 4,
        '& > *': {
          flex: {
            xs: '1 1 100%',
            sm: '1 1 calc(50% - 12px)',
            md: '1 1 calc(25% - 18px)',
          },
        },
      }}
    >
      {OVERVIEW_STATS.map((stat, index) => (
        <CustomCard
          key={stat.title}
          sx={{
            p: 3,
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(theme.palette[stat.color].main, 0.1),
            }}
          >
            <Iconify
              icon={stat.icon}
              width={32}
              sx={{ color: theme.palette[stat.color].main }}
            />
          </Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {stat.value}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {stat.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stat.description}
          </Typography>
        </CustomCard>
      ))}
    </Box>
  );

  const renderToolGrid = () => (
    <CustomCard sx={{ mb: 4 }}>
      <CustomCardHeader
        title="Công cụ toán học"
        subheader="Các công cụ được sử dụng phổ biến nhất"
        sx={{ pb: 0 }}
      />

      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            '& > *': {
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 12px)',
                md: '1 1 calc(33.333% - 16px)',
              },
            },
          }}
        >
          {OVERVIEW_TOOLS.map((tool, index) => (
            <Paper
              key={tool.title}
              sx={{
                p: 3,
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border:
                  selectedTool === index
                    ? `2px solid ${theme.palette.primary.main}`
                    : '1px solid transparent',
              }}
              onClick={() => setSelectedTool(index)}
            >
              <Stack spacing={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(theme.palette[tool.color].main, 0.1),
                  }}
                >
                  <Iconify
                    icon={tool.icon}
                    width={24}
                    sx={{ color: theme.palette[tool.color].main }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    {tool.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {tool.description}
                  </Typography>
                  <Typography variant="caption" color="primary.main">
                    {tool.category}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>
    </CustomCard>
  );

  const renderRecentActivity = () => (
    <Card>
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${theme.vars?.palette?.divider || theme.palette.divider}`,
        }}
      >
        <Typography variant="h5">Hoạt động gần đây</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Các tính toán được thực hiện gần đây
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          {RECENT_ACTIVITIES.map((activity, index) => (
            <Box key={index}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    mt: 1,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    {activity.action}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    {activity.result}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {activity.time}
                  </Typography>
                </Box>
              </Stack>
              {index < RECENT_ACTIVITIES.length - 1 && (
                <Divider sx={{ mt: 2 }} />
              )}
            </Box>
          ))}
        </Stack>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:list-bold" />}
          >
            Xem tất cả hoạt động
          </Button>
        </Box>
      </Box>
    </Card>
  );

  const renderQuickActions = () => (
    <CustomCard sx={{ mb: 4 }}>
      <CustomCardHeader title="Thao tác nhanh" />
      <CustomCardContent>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:pen-bold" />}
            sx={{ minWidth: 200 }}
          >
            Mở máy tính khoa học
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:camera-add-bold" />}
            sx={{ minWidth: 200 }}
          >
            Tạo công thức mới
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:heart-bold" />}
            sx={{ minWidth: 200 }}
          >
            Công thức đã lưu
          </Button>
        </Stack>
      </CustomCardContent>
    </CustomCard>
  );

  const renderExampleContent = () => (
    <Stack spacing={4}>
      {/* Quick Actions */}
      {renderQuickActions()}

      {/* Stats Grid */}
      {renderStats()}

      {/* Tool Grid */}
      {renderToolGrid()}

      {/* Recent Activity */}
      {renderRecentActivity()}

      {/* Additional Example Content for Scrolling */}
      <Card>
        <Box
          sx={{
            p: 3,
            borderBottom: `1px solid ${theme.vars?.palette?.divider || theme.palette.divider}`,
          }}
        >
          <Typography variant="h5">Thông tin hệ thống</Typography>
        </Box>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              '& > *': {
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' },
              },
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Trạng thái máy chủ
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">CPU Usage</Typography>
                  <Typography variant="body2" color="success.main">
                    23%
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Memory Usage</Typography>
                  <Typography variant="body2" color="warning.main">
                    67%
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Disk Space</Typography>
                  <Typography variant="body2" color="info.main">
                    45%
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Phiên bản
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">Frontend: v2.1.0</Typography>
                <Typography variant="body2">Backend API: v1.8.3</Typography>
                <Typography variant="body2">
                  Database: PostgreSQL 14.2
                </Typography>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* More example content */}
      {Array.from({ length: 5 }, (_, i) => (
        <Card key={i}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Ví dụ Section {i + 1}
            </Typography>
            <Typography variant="body1" paragraph>
              Đây là nội dung ví dụ để minh họa việc cuộn trang. Trang dashboard
              này được thiết kế với header cố định và phần nội dung có thể cuộn
              được. Metadata đã được cấu hình đầy đủ với tiêu đề và mô tả phù
              hợp.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bạn có thể thêm nhiều nội dung khác vào đây để tạo ra một trang
              dashboard đầy đủ tính năng. Layout này sử dụng Material-UI
              components và tuân theo best practices của React.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Xem chi tiết</Button>
            <Button size="small">Chỉnh sửa</Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );

  return (
    <DashboardPageLayoutWithMetadata pageKey="dashboard">
      {renderExampleContent()}
    </DashboardPageLayoutWithMetadata>
  );
}
