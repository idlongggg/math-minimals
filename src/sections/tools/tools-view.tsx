'use client';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

const TOOLS_TOPICS = [
  {
    id: 'calculators',
    title: 'Máy tính',
    description: 'Máy tính cơ bản, khoa học, đồ thị và số phức',
    path: paths.dashboard.tools.calculators.root,
    icon: 'solar:calculator-bold',
    color: '#3b82f6',
  },
  {
    id: 'converters',
    title: 'Công cụ chuyển đổi',
    description: 'Chuyển đổi đơn vị, góc và các đại lượng khác',
    path: paths.dashboard.tools.converters.root,
    icon: 'solar:refresh-circle-bold',
    color: '#10b981',
  },
  {
    id: 'generators',
    title: 'Trình tạo',
    description: 'Tạo số ngẫu nhiên, dãy Fibonacci và mẫu số học',
    path: paths.dashboard.tools.generators.root,
    icon: 'solar:settings-bold',
    color: '#f59e0b',
  },
  {
    id: 'solvers',
    title: 'Giải phương trình',
    description: 'Giải phương trình vi phân và bài toán tối ưu hóa',
    path: paths.dashboard.tools.solvers.root,
    icon: 'solar:cog-bold',
    color: '#ef4444',
  },
];

// ----------------------------------------------------------------------

export function ToolsView() {
  const router = useRouter();
  const theme = useTheme();

  const handleTopicClick = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardPageLayout
      title="Công cụ toán học"
      description="Bộ sưu tập các công cụ toán học hữu ích cho học tập và nghiên cứu."
    >
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Công cụ toán học cơ bản
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Các công cụ toán học thiết yếu giúp bạn giải quyết các bài toán từ cơ
          bản đến nâng cao. Từ máy tính đơn giản đến các công cụ chuyển đổi và
          giải phương trình phức tạp.
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
          {TOOLS_TOPICS.map((topic) => (
            <Card
              key={topic.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.vars?.customShadows?.z8 || theme.shadows[8],
                  borderColor: 'primary.main',
                },
              }}
              onClick={() => handleTopicClick(topic.path)}
            >
              <CardContent>
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
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </DashboardPageLayout>
  );
}
