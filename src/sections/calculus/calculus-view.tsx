'use client';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { DashboardPageLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const CALCULUS_TOPICS = [
  {
    id: 'derivative',
    title: 'Đạo hàm',
    description: 'Tính đạo hàm và ứng dụng của đạo hàm',
    path: paths.dashboard.calculus.derivative,
    icon: 'solar:graph-up-bold',
    color: '#3b82f6',
  },
  {
    id: 'integral',
    title: 'Tích phân',
    description: 'Tích phân xác định và bất định',
    path: paths.dashboard.calculus.integral,
    icon: 'solar:graph-down-bold',
    color: '#10b981',
  },
  {
    id: 'limit',
    title: 'Giới hạn',
    description: 'Tính giới hạn của hàm số và dãy số',
    path: paths.dashboard.calculus.limit,
    icon: 'solar:infinity-bold',
    color: '#f59e0b',
  },
  {
    id: 'sequence',
    title: 'Dãy số',
    description: 'Phân tích dãy số và chuỗi số',
    path: paths.dashboard.calculus.sequence,
    icon: 'solar:list-bold',
    color: '#ef4444',
  },
];

// ----------------------------------------------------------------------

export function CalculusView() {
  const router = useRouter();

  const handleTopicClick = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardPageLayout
      title="Công cụ giải tích"
      description="Khám phá thế giới giải tích với đạo hàm, tích phân, giới hạn và dãy số."
    >
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Giải tích cơ bản
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Giải tích là nhánh toán học nghiên cứu về sự thay đổi liên tục, bao gồm đạo hàm, tích phân, 
          giới hạn và dãy số. Đây là nền tảng của nhiều lĩnh vực khoa học và kỹ thuật.
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
          {CALCULUS_TOPICS.map((topic) => (
            <Card
              key={topic.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
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
