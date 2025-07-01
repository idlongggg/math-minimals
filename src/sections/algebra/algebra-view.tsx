'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { CustomCard, CustomCardContent } from 'src/components/custom-card';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';

const ALGEBRA_TOPICS = [
  {
    id: 'basic-expressions',
    title: 'Biểu thức đại số',
    description:
      'Học về biểu thức đại số, phép toán cơ bản và rút gọn biểu thức',
    path: paths.dashboard.algebra.basic.expressions,
    icon: 'solar:calculator-bold',
    color: '#3b82f6',
  },
  {
    id: 'equations',
    title: 'Phương trình',
    description: 'Giải các phương trình bậc nhất, bậc hai và hệ phương trình',
    path: paths.dashboard.algebra.basic.equations,
    icon: 'solar:calculator-bold',
    color: '#10b981',
  },
  {
    id: 'inequalities',
    title: 'Bất phương trình',
    description: 'Giải và biểu diễn bất phương trình trên trục số',
    path: paths.dashboard.algebra.basic.inequalities,
    icon: 'solar:calculator-bold',
    color: '#f59e0b',
  },
  {
    id: 'factoring',
    title: 'Phân tích thừa số',
    description: 'Phân tích đa thức thành tích các thừa số',
    path: paths.dashboard.algebra.basic.factoring,
    icon: 'solar:calculator-bold',
    color: '#ef4444',
  },
  {
    id: 'polynomials',
    title: 'Đa thức',
    description: 'Các phép toán với đa thức và tính chất của đa thức',
    path: paths.dashboard.algebra.basic.polynomials,
    icon: 'solar:calculator-bold',
    color: '#8b5cf6',
  },
  {
    id: 'functions',
    title: 'Hàm số và đồ thị',
    description: 'Các loại hàm số và cách vẽ đồ thị hàm số',
    path: paths.dashboard.algebra.functions.root,
    icon: 'solar:chart-bold',
    color: '#06b6d4',
  },
  {
    id: 'linear-algebra',
    title: 'Đại số tuyến tính',
    description: 'Ma trận, định thức và hệ phương trình tuyến tính',
    path: paths.dashboard.algebra.linear.root,
    icon: 'solar:calculator-bold',
    color: '#ec4899',
  },
];

export function AlgebraView() {
  const router = useRouter();
  const theme = useTheme();

  const handleTopicClick = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardPageLayout
      title="Đại số và giải tích"
      description="Khám phá thế giới đại số từ cơ bản đến nâng cao với các công cụ giải phương trình, phân tích đa thức và hàm số."
    >
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Các chủ đề đại số
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Đại số là một nhánh quan trọng của toán học, nghiên cứu về các cấu
          trúc toán học trừu tượng và các quy tắc thao tác với chúng. Từ đại số
          cơ bản đến đại số tuyến tính và giải tích hàm số.
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
          {ALGEBRA_TOPICS.map((topic) => (
            <CustomCard
              key={topic.id}
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
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

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Bắt đầu học đại số
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Chọn một chủ đề để bắt đầu hành trình khám phá đại số. Mỗi chủ đề
            được thiết kế với các công cụ tương tác và hướng dẫn chi tiết.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:pen-bold" />}
              onClick={() =>
                handleTopicClick(paths.dashboard.algebra.basic.expressions)
              }
              sx={{
                transition: 'all 0.2s ease',
              }}
            >
              Bắt đầu với biểu thức đại số
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:chart-square-outline" />}
              onClick={() =>
                handleTopicClick(paths.dashboard.algebra.functions.root)
              }
              sx={{
                transition: 'all 0.2s ease',
              }}
            >
              Khám phá hàm số
            </Button>
          </Box>
        </Box>
      </Box>
    </DashboardPageLayout>
  );
}
