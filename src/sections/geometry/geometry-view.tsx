'use client';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { CustomCard, CustomCardContent } from 'src/components/custom-card';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

const GEOMETRY_TOPICS = [
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

// ----------------------------------------------------------------------

export function GeometryView() {
  const router = useRouter();

  const handleTopicClick = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardPageLayout
      title="Hình học và đo lường"
      description="Khám phá thế giới hình học từ mặt phẳng đến không gian với các công cụ đo lường và tính toán."
    >
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Các lĩnh vực hình học
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Hình học là ngành toán học nghiên cứu về hình dạng, kích thước, vị trí
          tương đối của các hình và tính chất của không gian. Từ hình học phẳng
          cơ bản đến hình học không gian phức tạp.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
          }}
        >
          {GEOMETRY_TOPICS.map((topic) => (
            <CustomCard
              key={topic.id}
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s',
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
