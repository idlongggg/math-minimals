'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CustomTab, CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';
import { TabColorButton } from 'src/components/tab-color-button';

import { TabColorProvider } from 'src/contexts/tab-color-context';
import { DEFAULT_TAB_COLOR_MAPPING } from 'src/theme/tab-colors';

// ----------------------------------------------------------------------

export interface TopicItem {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  color: string;
}

export interface TabConfig {
  value: string;
  label: string;
  icon: string;
  color?: string;
}

export interface SubjectTabsViewProps {
  title: string;
  description: string;
  subjectTitle: string;
  subjectDescription: string;
  topics: TopicItem[];
  tabs?: TabConfig[];
  defaultTab?: string;
  renderCustomTab?: (tabValue: string) => React.ReactNode;
  practiceContent?: React.ReactNode;
  guideContent?: React.ReactNode;
}

// ----------------------------------------------------------------------

const DEFAULT_TABS: TabConfig[] = [
  {
    value: 'overview',
    label: 'Tổng quan',
    icon: 'solar:flag-bold',
    color: '#1976d2', // blue
  },
  {
    value: 'topics',
    label: 'Chủ đề',
    icon: 'solar:list-bold',
    color: '#388e3c', // green
  },
  {
    value: 'practice',
    label: 'Luyện tập',
    icon: 'solar:pen-bold',
    color: '#f57c00', // orange
  },
  {
    value: 'guide',
    label: 'Hướng dẫn',
    icon: 'solar:notebook-bold-duotone',
    color: '#7b1fa2', // purple
  },
];

// ----------------------------------------------------------------------

export function SubjectTabsView({
  title,
  description,
  subjectTitle,
  subjectDescription,
  topics,
  tabs = DEFAULT_TABS,
  defaultTab = 'overview',
  renderCustomTab,
  practiceContent,
  guideContent,
}: SubjectTabsViewProps) {
  const router = useRouter();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleTopicClick = (path: string) => {
    router.push(path);
  };

  const renderTabs = () => {
    const activeTab = tabs.find((tab) => tab.value === currentTab);
    const activeTabColor = activeTab?.color || theme.palette.primary.main;

    return (
      <CustomTabs
        value={currentTab}
        onChange={handleTabChange}
        slotProps={{
          indicatorContent: {
            sx: {
              backgroundColor: activeTabColor,
              opacity: 0.1,
            },
          },
        }}
      >
        {tabs.map((tab) => {
          const isActive = currentTab === tab.value;
          const tabColor = tab.color || theme.palette.primary.main;

          return (
            <CustomTab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={
                <Iconify
                  icon={tab.icon as any}
                  sx={{
                    color: isActive ? tabColor : 'text.secondary',
                    transition: 'color 0.3s ease',
                  }}
                />
              }
              sx={{
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  color: tabColor,
                  fontWeight: 600,
                },
                '&:hover': {
                  color: tabColor,
                  opacity: 0.8,
                },
              }}
            />
          );
        })}
      </CustomTabs>
    );
  };

  const renderOverview = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {subjectTitle}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        {subjectDescription}
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
        {topics.map((topic) => (
          <Card
            key={topic.id}
            sx={{
              height: '100%',
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
  );

  const renderTopics = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Danh sách chủ đề
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {topics.map((topic) => (
          <Card
            key={topic.id}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.vars?.customShadows?.z4 || theme.shadows[4],
                borderColor: 'primary.main',
              },
            }}
            onClick={() => handleTopicClick(topic.path)}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
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
                </Box>
                <TabColorButton
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTopicClick(topic.path);
                  }}
                >
                  Học ngay
                </TabColorButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );

  const renderDefaultPractice = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Luyện tập
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Phần luyện tập đang được phát triển. Sẽ có các bài tập thực hành cho
        từng chủ đề.
      </Typography>
    </Box>
  );

  const renderDefaultGuide = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Hướng dẫn sử dụng
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Đây là hướng dẫn cách sử dụng các công cụ:
      </Typography>
      <Box component="ol" sx={{ pl: 2 }}>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Chọn chủ đề:</strong> Nhấp vào từng thẻ chủ đề để học về lĩnh
          vực cụ thể
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Sử dụng công cụ:</strong> Mỗi chủ đề có các tab riêng với công
          cụ tính toán và hướng dẫn
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Thực hành:</strong> Sử dụng các ví dụ nhanh để hiểu rõ khái
          niệm
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Lịch sử:</strong> Xem lại các phép toán đã thực hiện
        </Typography>
      </Box>
    </Box>
  );

  const renderTabContent = () => {
    // Nếu có custom tab renderer, sử dụng nó trước
    if (renderCustomTab) {
      const customContent = renderCustomTab(currentTab);
      if (customContent) {
        return customContent;
      }
    }

    // Render default tabs
    switch (currentTab) {
      case 'overview':
        return renderOverview();
      case 'topics':
        return renderTopics();
      case 'practice':
        return practiceContent || renderDefaultPractice();
      case 'guide':
        return guideContent || renderDefaultGuide();
      default:
        return renderOverview();
    }
  };

  return (
    <TabColorProvider 
      initialTab={currentTab}
      tabColorMapping={DEFAULT_TAB_COLOR_MAPPING}
    >
      <DashboardPageWithTabsLayout
        title={title}
        description={description}
        tabs={renderTabs()}
      >
        {renderTabContent()}
      </DashboardPageWithTabsLayout>
    </TabColorProvider>
  );
}
