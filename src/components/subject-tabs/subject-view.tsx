'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

import type { SubjectTabsProps, TopicItem } from './types';

import { useSubjectTabManager } from './subject-tabs';

// ----------------------------------------------------------------------

export interface SubjectViewProps extends SubjectTabsProps {
  /** Tiêu đề trang */
  title: string;
  /** Mô tả trang */
  description: string;
  /** Tiêu đề subject */
  subjectTitle: string;
  /** Mô tả subject */
  subjectDescription: string;
  /** Danh sách topics */
  topics: TopicItem[];
  /** Nội dung luyện tập */
  practiceContent?: React.ReactNode;
  /** Nội dung hướng dẫn */
  guideContent?: React.ReactNode;
  /** Render custom tab content */
  renderCustomTab?: (tabValue: string) => React.ReactNode;
}

// ----------------------------------------------------------------------

export function SubjectView({
  title,
  description,
  subjectTitle,
  subjectDescription,
  topics,
  practiceContent,
  guideContent,
  renderCustomTab,
  ...tabProps
}: SubjectViewProps) {
  const router = useRouter();

  // Sử dụng Subject Tab Manager
  const { currentTab, renderTabs } = useSubjectTabManager({
    hasOverview: true,
    hasTopics: true,
    hasGuide: true,
    defaultTab: 'overview',
    ...tabProps,
  });

  const handleTopicClick = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  const renderOverviewContent = useCallback(() => (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {subjectTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {subjectDescription}
          </Typography>
        </CardContent>
      </Card>
      
      <Typography variant="h6" gutterBottom>
        Chủ đề nổi bật
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {topics.slice(0, 6).map((topic) => (
          <Card
            key={topic.id}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => theme.customShadows.z8,
              },
            }}
            onClick={() => handleTopicClick(topic.path)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Iconify
                  icon={topic.icon as any}
                  sx={{
                    width: 24,
                    height: 24,
                    color: topic.color,
                    mr: 1,
                  }}
                />
                <Typography variant="subtitle2" noWrap>
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
  ), [subjectTitle, subjectDescription, topics, handleTopicClick]);

  const renderTopicsContent = useCallback(() => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tất cả chủ đề
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {topics.map((topic) => (
          <Card
            key={topic.id}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => theme.customShadows.z8,
              },
            }}
            onClick={() => handleTopicClick(topic.path)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Iconify
                  icon={topic.icon as any}
                  sx={{
                    width: 24,
                    height: 24,
                    color: topic.color,
                    mr: 1,
                  }}
                />
                <Typography variant="subtitle2" noWrap>
                  {topic.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {topic.description}
              </Typography>
              <Button
                size="small"
                sx={{ mt: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTopicClick(topic.path);
                }}
              >
                Học ngay
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  ), [topics, handleTopicClick]);

  const renderPracticeContent = useCallback(() => {
    if (practiceContent) {
      return practiceContent;
    }

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Luyện tập
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1">
              Nội dung luyện tập sẽ được cập nhật sớm...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }, [practiceContent]);

  const renderGuideContent = useCallback(() => {
    if (guideContent) {
      return guideContent;
    }

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Hướng dẫn
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1">
              Hướng dẫn chi tiết sẽ được cập nhật sớm...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }, [guideContent]);

  const renderTabContent = useCallback(() => {
    switch (currentTab) {
      case 'overview':
        return renderOverviewContent();
      case 'topics':
        return renderTopicsContent();
      case 'practice':
        return renderPracticeContent();
      case 'guide':
        return renderGuideContent();
      default:
        return renderCustomTab?.(currentTab) || null;
    }
  }, [
    currentTab,
    renderOverviewContent,
    renderTopicsContent,
    renderPracticeContent,
    renderGuideContent,
    renderCustomTab,
  ]);

  return (
    <DashboardPageWithTabsLayout
      title={title}
      description={description}
      tabs={renderTabs()}
    >
      <Box sx={{ mt: 3 }}>{renderTabContent()}</Box>
    </DashboardPageWithTabsLayout>
  );
}
