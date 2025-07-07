export interface TopicItem {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  color: string;
}

export interface SubjectTabsConfig {
  /** Có tab tổng quan không */
  hasOverview?: boolean;
  /** Label cho tab tổng quan */
  overviewLabel?: string;
  /** Icon cho tab tổng quan */
  overviewIcon?: React.ReactElement;
  /** Có tab chủ đề không */
  hasTopics?: boolean;
  /** Label cho tab chủ đề */
  topicsLabel?: string;
  /** Icon cho tab chủ đề */
  topicsIcon?: React.ReactElement;
  /** Có tab luyện tập không */
  hasPractice?: boolean;
  /** Label cho tab luyện tập */
  practiceLabel?: string;
  /** Icon cho tab luyện tập */
  practiceIcon?: React.ReactElement;
  /** Có tab hướng dẫn không */
  hasGuide?: boolean;
  /** Label cho tab hướng dẫn */
  guideLabel?: string;
  /** Icon cho tab hướng dẫn */
  guideIcon?: React.ReactElement;
  /** Các tab custom thêm */
  customTabs?: Array<{
    value: string;
    label: string;
    icon?: React.ReactElement;
    color?: string;
  }>;
}

export interface SubjectTabsProps extends SubjectTabsConfig {
  /** Tab mặc định */
  defaultTab?: string;
  /** Callback khi tab thay đổi */
  onTabChange?: (tabValue: string) => void;
  /** Tiêu đề của subject */
  title?: string;
  /** Mô tả của subject */
  description?: string;
  /** Tiêu đề phụ */
  subjectTitle?: string;
  /** Mô tả phụ */
  subjectDescription?: string;
  /** Danh sách topics */
  topics?: TopicItem[];
  /** Nội dung luyện tập */
  practiceContent?: React.ReactNode;
  /** Nội dung hướng dẫn */
  guideContent?: React.ReactNode;
}

export interface SubjectTabsHookResult {
  /** Tab hiện tại */
  currentTab: string;
  /** Function để thay đổi tab */
  setCurrentTab: (tab: string) => void;
  /** Function để render tabs */
  renderTabs: () => React.ReactNode;
  /** Function để xử lý tab change */
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  /** Config tabs */
  tabConfigs: Array<{
    value: string;
    label: string;
    icon?: React.ReactElement;
    color?: string;
  }>;
}
