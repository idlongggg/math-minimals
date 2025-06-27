'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const ARITHMETIC_TOPICS = [
  {
    id: 'base-conversion',
    title: 'Chuyển đổi cơ số',
    description: 'Chuyển đổi giữa các hệ cơ số khác nhau (nhị phân, bát phân, thập phân, thập lục phân)',
    path: paths.dashboard.arithmetic.baseConversion,
    icon: 'solar:refresh-circle-bold',
    color: '#3b82f6',
  },
  {
    id: 'common-denominator',
    title: 'Mẫu số chung',
    description: 'Tìm mẫu số chung nhỏ nhất và quy đồng phân số',
    path: paths.dashboard.arithmetic.commonDenominator,
    icon: 'solar:calculator-bold',
    color: '#10b981',
  },
  {
    id: 'division-remainder',
    title: 'Phép chia và số dư',
    description: 'Thực hiện phép chia có dư và phân tích thuật toán Euclid',
    path: paths.dashboard.arithmetic.divisionRemainder,
    icon: 'solar:calculator-bold',
    color: '#f59e0b',
  },
  {
    id: 'prime-numbers',
    title: 'Số nguyên tố',
    description: 'Kiểm tra số nguyên tố, tìm các số nguyên tố trong khoảng',
    path: paths.dashboard.arithmetic.primeNumbers,
    icon: 'solar:atom-bold',
    color: '#ef4444',
  },
  {
    id: 'factors-irrationals',
    title: 'Thừa số và số vô tỷ',
    description: 'Phân tích thừa số nguyên tố và làm việc với số vô tỷ',
    path: paths.dashboard.arithmetic.factorsIrrationals,
    icon: 'solar:calculator-bold',
    color: '#8b5cf6',
  },
  {
    id: 'divisors-multiples',
    title: 'Ước số và bội số',
    description: 'Tìm ước số, bội số, ƯCLN và BCNN',
    path: paths.dashboard.arithmetic.divisorsMultiples,
    icon: 'solar:calculator-bold',
    color: '#06b6d4',
  },
  {
    id: 'fractions',
    title: 'Phân số & Chuyển đổi',
    description: 'Chuyển đổi giữa phân số, số thập phân và phần trăm',
    path: paths.dashboard.arithmetic.fractions,
    icon: 'solar:calculator-bold',
    color: '#ec4899',
  },
];

// ----------------------------------------------------------------------

export function ArithmeticView() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('overview');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleTopicClick = (path: string) => {
    router.push(path);
  };

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="overview"
        label="Tổng quan"
        icon={<Iconify icon="solar:flag-bold" />}
      />
      <Tab
        value="topics"
        label="Chủ đề"
        icon={<Iconify icon="solar:list-bold" />}
      />
      <Tab
        value="practice"
        label="Luyện tập"
        icon={<Iconify icon="solar:pen-bold" />}
      />
      <Tab
        value="guide"
        label="Hướng dẫn"
        icon={<Iconify icon="solar:notebook-bold-duotone" />}
      />
    </CustomTabs>
  );

  const renderOverview = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Số học cơ bản
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Số học cơ bản là nền tảng của toán học, bao gồm các phép toán cơ bản với số tự nhiên, 
        số nguyên, phân số và số thập phân. Tại đây bạn sẽ học về các khái niệm cơ bản như 
        chuyển đổi hệ cơ số, số nguyên tố, ước số, bội số và các phép toán với phân số.
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
        {ARITHMETIC_TOPICS.map((topic) => (
          <Card
            key={topic.id}
            sx={{
              height: '100%',
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
  );

  const renderTopics = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Danh sách chủ đề
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ARITHMETIC_TOPICS.map((topic) => (
          <Card key={topic.id}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: topic.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <Iconify icon={topic.icon as any} width={20} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">{topic.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {topic.description}
                    </Typography>
                  </Box>
                </Box>                  <Button
                    variant="outlined"
                    onClick={() => handleTopicClick(topic.path)}
                  >
                    Học ngay
                  </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );

  const renderPractice = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Luyện tập
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Phần luyện tập đang được phát triển. Sẽ có các bài tập thực hành cho từng chủ đề số học cơ bản.
      </Typography>
    </Box>
  );

  const renderGuide = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Hướng dẫn sử dụng
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Đây là hướng dẫn cách sử dụng các công cụ số học cơ bản:
      </Typography>
      <Box component="ol" sx={{ pl: 2 }}>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Chọn chủ đề:</strong> Nhấp vào từng thẻ chủ đề để học về lĩnh vực cụ thể
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Sử dụng công cụ:</strong> Mỗi chủ đề có các tab riêng với công cụ tính toán và hướng dẫn
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Thực hành:</strong> Sử dụng các ví dụ nhanh để hiểu rõ khái niệm
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Lịch sử:</strong> Xem lại các phép toán đã thực hiện
        </Typography>
      </Box>
    </Box>
  );

  return (
    <DashboardPageWithTabsLayout
      title="Số học cơ bản"
      description="Học và thực hành các khái niệm số học cơ bản: chuyển đổi cơ số, số nguyên tố, phân số và nhiều hơn nữa."
      tabs={renderTabs()}
    >
      {currentTab === 'overview' && renderOverview()}
      {currentTab === 'topics' && renderTopics()}
      {currentTab === 'practice' && renderPractice()}
      {currentTab === 'guide' && renderGuide()}
    </DashboardPageWithTabsLayout>
  );
}
