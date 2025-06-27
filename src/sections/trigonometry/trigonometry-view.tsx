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

const TRIGONOMETRY_TOPICS = [
  {
    id: 'ratios',
    title: 'Tỷ số lượng giác',
    description: 'Sin, cos, tan và các tỷ số lượng giác cơ bản',
    path: paths.dashboard.trigonometry.basic.ratios,
    icon: 'solar:calculator-bold',
    color: '#3b82f6',
  },
  {
    id: 'identities',
    title: 'Đồng nhất thức',
    description: 'Các đồng nhất thức lượng giác cơ bản và nâng cao',
    path: paths.dashboard.trigonometry.basic.identities,
    icon: 'solar:calculator-bold',
    color: '#10b981',
  },
  {
    id: 'equations',
    title: 'Phương trình lượng giác',
    description: 'Giải phương trình lượng giác cơ bản và phức tạp',
    path: paths.dashboard.trigonometry.basic.equations,
    icon: 'solar:calculator-bold',
    color: '#f59e0b',
  },
  {
    id: 'graphs',
    title: 'Đồ thị hàm lượng giác',
    description: 'Vẽ và phân tích đồ thị các hàm lượng giác',
    path: paths.dashboard.trigonometry.basic.graphs,
    icon: 'solar:chart-square-outline',
    color: '#ef4444',
  },
];

// ----------------------------------------------------------------------

export function TrigonometryView() {
  const router = useRouter();

  const handleTopicClick = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardPageLayout
      title="Lượng giác"
      description="Khám phá thế giới lượng giác với các tỷ số, đồng nhất thức và phương trình lượng giác."
    >
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Lượng giác cơ bản
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Lượng giác là nhánh toán học nghiên cứu về mối quan hệ giữa các góc và cạnh của tam giác. 
          Đây là nền tảng cho nhiều ứng dụng trong vật lý, kỹ thuật và khoa học.
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
          {TRIGONOMETRY_TOPICS.map((topic) => (
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
