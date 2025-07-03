'use client';

import { useState } from 'react';

import {
    Box,
    Button,
    Card,
    Divider,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import {
    CustomCard,
    CustomCardHeader
} from 'src/components/custom-card';
import { DashboardPageLayoutWithMetadata } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type StatisticColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

type SystemStatistic = {
  title: string;
  value: string;
  icon: string;
  color: StatisticColor;
  description: string;
};

type MathTool = {
  title: string;
  description: string;
  category: string;
  icon: string;
  color: StatisticColor;
};

type RecentActivity = {
  action: string;
  time: string;
  result: string;
};

// Thống kê tổng quan hệ thống
const SYSTEM_STATISTICS: SystemStatistic[] = [
  {
    title: 'Tổng số công cụ',
    value: '24',
    icon: 'solar:pen-bold',
    color: 'primary',
    description: 'Các công cụ toán học có sẵn',
  },
  {
    title: 'Lượt sử dụng hôm nay',
    value: '156',
    icon: 'solar:eye-bold',
    color: 'info',
    description: 'Số lượt truy cập trong ngày',
  },
  {
    title: 'Công thức được lưu',
    value: '89',
    icon: 'solar:heart-bold',
    color: 'success',
    description: 'Công thức đã được đánh dấu',
  },
  {
    title: 'Thời gian trực tuyến',
    value: '99.9%',
    icon: 'solar:info-circle-bold',
    color: 'warning',
    description: 'Tỷ lệ uptime hệ thống',
  },
];

// Các công cụ toán học nổi bật
const FEATURED_MATH_TOOLS: MathTool[] = [
  {
    title: 'Máy tính số nguyên tố',
    description: 'Kiểm tra và tìm các số nguyên tố',
    category: 'Số học',
    icon: 'solar:pen-bold',
    color: 'primary',
  },
  {
    title: 'Giải phương trình',
    description: 'Giải các phương trình bậc 1, 2, 3',
    category: 'Đại số',
    icon: 'solar:pen-bold',
    color: 'info',
  },
  {
    title: 'Tính diện tích hình học',
    description: 'Tính diện tích các hình cơ bản',
    category: 'Hình học',
    icon: 'solar:copy-bold',
    color: 'success',
  },
  {
    title: 'Đạo hàm và tích phân',
    description: 'Tính toán vi tích phân',
    category: 'Giải tích',
    icon: 'solar:eye-bold',
    color: 'warning',
  },
  {
    title: 'Thống kê cơ bản',
    description: 'Tính mean, median, mode',
    category: 'Thống kê',
    icon: 'solar:info-circle-bold',
    color: 'error',
  },
  {
    title: 'Chuyển đổi đơn vị',
    description: 'Chuyển đổi giữa các đơn vị',
    category: 'Công cụ',
    icon: 'solar:restart-bold',
    color: 'secondary',
  },
];

// Hoạt động gần đây của người dùng
const RECENT_USER_ACTIVITIES: RecentActivity[] = [
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

/**
 * Dashboard Overview View - Trang tổng quan dashboard
 * Hiển thị thống kê hệ thống, công cụ nổi bật và hoạt động gần đây
 */
export function DashboardOverviewView() {
  const theme = useTheme();
  const [selectedToolIndex, setSelectedToolIndex] = useState<number | null>(null);

  const renderSystemStatistics = () => (
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
      {SYSTEM_STATISTICS.map((statistic, index) => (
        <CustomCard
          key={statistic.title}
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
              bgcolor: alpha(theme.palette[statistic.color].main, 0.1),
            }}
          >
            <Iconify
              icon={statistic.icon as any}
              width={32}
              sx={{ color: theme.palette[statistic.color].main }}
            />
          </Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {statistic.value}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {statistic.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {statistic.description}
          </Typography>
        </CustomCard>
      ))}
    </Box>
  );

  const renderFeaturedMathTools = () => (
    <CustomCard sx={{ mb: 4 }}>
      <CustomCardHeader
        title="Công cụ toán học nổi bật"
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
          {FEATURED_MATH_TOOLS.map((mathTool, index) => (
            <Paper
              key={mathTool.title}
              sx={{
                p: 3,
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border:
                  selectedToolIndex === index
                    ? `2px solid ${theme.palette.primary.main}`
                    : '1px solid transparent',
              }}
              onClick={() => setSelectedToolIndex(index)}
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
                    bgcolor: alpha(theme.palette[mathTool.color].main, 0.1),
                  }}
                >
                  <Iconify
                    icon={mathTool.icon as any}
                    width={24}
                    sx={{ color: theme.palette[mathTool.color].main }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    {mathTool.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {mathTool.description}
                  </Typography>
                  <Typography variant="caption" color="primary.main">
                    {mathTool.category}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>
    </CustomCard>
  );

  const renderRecentUserActivity = () => (
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
          {RECENT_USER_ACTIVITIES.map((userActivity, index) => (
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
                    {userActivity.action}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    {userActivity.result}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {userActivity.time}
                  </Typography>
                </Box>
              </Stack>
              {index < RECENT_USER_ACTIVITIES.length - 1 && (
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
      <CustomCardHeader
        title="Thao tác nhanh"
        subheader="Các công cụ được sử dụng thường xuyên"
        sx={{ pb: 0 }}
      />

      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button
            variant="contained"
            startIcon={<Iconify icon={"solar:calculator-bold" as any} />}
            sx={{ minWidth: 140 }}
          >
            Máy tính
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon={"solar:graph-bold" as any} />}
            sx={{ minWidth: 140 }}
          >
            Vẽ đồ thị
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon={"solar:file-text-bold" as any} />}
            sx={{ minWidth: 140 }}
          >
            Công thức
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon={"solar:settings-bold" as any} />}
            sx={{ minWidth: 140 }}
          >
            Cài đặt
          </Button>
        </Stack>
      </Box>
    </CustomCard>
  );

  const renderDashboardContent = () => (
    <Stack spacing={4}>
      {/* Quick Actions */}
      {renderQuickActions()}

      {/* System Statistics Grid */}
      {renderSystemStatistics()}

      {/* Featured Math Tools Grid */}
      {renderFeaturedMathTools()}

      {/* Recent User Activity */}
      {renderRecentUserActivity()}
    </Stack>
  );

  return (
    <DashboardPageLayoutWithMetadata pageKey="dashboard">
      {renderDashboardContent()}
    </DashboardPageLayoutWithMetadata>
  );
}
