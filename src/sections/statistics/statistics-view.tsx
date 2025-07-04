'use client';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { CustomCard, CustomCardContent } from 'src/components/custom-card';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

const STATISTICS_TOPICS = [
  {
    id: 'charts',
    title: 'Biểu đồ và dữ liệu',
    description: 'Biểu đồ tranh, đường, cột, quạt và các loại biểu đồ khác',
    path: paths.dashboard.statistics.charts.root,
    icon: 'solar:chart-square-outline',
    color: '#3b82f6',
  },
  {
    id: 'descriptive',
    title: 'Thống kê mô tả',
    description: 'Xu hướng trung tâm, độ phân tán và phân phối dữ liệu',
    path: paths.dashboard.statistics.descriptive.root,
    icon: 'solar:clipboard-text-bold',
    color: '#10b981',
  },
  {
    id: 'probability',
    title: 'Xác suất cơ bản',
    description: 'Xác suất cơ bản, có điều kiện và định lý Bayes',
    path: paths.dashboard.statistics.probability.root,
    icon: 'solar:dice-bold',
    color: '#f59e0b',
  },
  {
    id: 'distributions',
    title: 'Phân phối xác suất',
    description: 'Phân phối rời rạc, liên tục, chuẩn và nhị thức',
    path: paths.dashboard.statistics.distributions.root,
    icon: 'solar:graph-down-bold',
    color: '#ef4444',
  },
];

// ----------------------------------------------------------------------

export function StatisticsView() {
  const router = useRouter();
  const theme = useTheme();

  const handleTopicClick = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardPageLayout
      title="Xác suất và thống kê"
      description="Phân tích dữ liệu và tính toán xác suất với các công cụ thống kê chuyên nghiệp."
    >
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Thống kê và xác suất
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Thống kê và xác suất là những công cụ quan trọng để phân tích dữ liệu
          và đưa ra quyết định. Từ việc tạo biểu đồ đến tính toán xác suất và
          phân tích xu hướng.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
          }}
        >
          {STATISTICS_TOPICS.map((topic) => (
            <CustomCard
              key={topic.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.vars?.customShadows?.z8 || theme.shadows[8],
                },
              }}
              onClick={() => handleTopicClick(topic.path)}
            >
              <CustomCardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      bgcolor: topic.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow:
                          theme.vars?.customShadows?.z4 || theme.shadows[4],
                      },
                    }}
                  >
                    <Iconify icon={topic.icon as any} width={24} />
                  </Box>
                  <Typography variant="h6" component="h3">
                    {topic.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {topic.description}
                </Typography>
              </CustomCardContent>
            </CustomCard>
          ))}
        </Box>
      </Box>
    </DashboardPageLayout>
  );
}
