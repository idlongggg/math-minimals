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
