'use client';

import { useCallback, useState } from 'react';

import Tab from '@mui/material/Tab';

import { CustomTabs } from 'src/components/custom-tabs';

// ----------------------------------------------------------------------

export interface TabManagerTabConfig {
  /** Giá trị của tab (key) */
  value: string;
  /** Nhãn hiển thị của tab */
  label: string;
  /** Icon cho tab (optional) */
  icon?: React.ReactElement;
  /** Disabled tab (optional) */
  disabled?: boolean;
  /** Sx props cho tab (optional) */
  sx?: Record<string, any>;
}

export interface TabManagerProps {
  /** Danh sách cấu hình các tab */
  tabs: TabManagerTabConfig[];
  /** Tab mặc định được chọn */
  defaultTab?: string;
  /** Callback khi tab thay đổi */
  onTabChange?: (tabValue: string) => void;
  /** Custom props cho CustomTabs */
  tabsProps?: Record<string, any>;
  /** Class name cho component */
  className?: string;
}

export interface TabManagerHookResult {
  /** Tab hiện tại */
  currentTab: string;
  /** Function để thay đổi tab */
  setCurrentTab: (tab: string) => void;
  /** Function để render tabs */
  renderTabs: () => React.ReactNode;
  /** Function để xử lý tab change */
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
}

/**
 * Custom hook để quản lý logic tab
 */
export function useTabManager({
  tabs,
  defaultTab,
  onTabChange,
  tabsProps,
}: Omit<TabManagerProps, 'className'>): TabManagerHookResult {
  const [currentTab, setCurrentTab] = useState(defaultTab || tabs[0]?.value || '');

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
      onTabChange?.(newValue);
    },
    [onTabChange]
  );

  const renderTabs = useCallback(() => (
    <CustomTabs value={currentTab} onChange={handleTabChange} {...tabsProps}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          {...(tab.icon && { icon: tab.icon })}
          disabled={tab.disabled}
          sx={{
            ...tab.sx,
          }}
        />
      ))}
    </CustomTabs>
  ), [currentTab, handleTabChange, tabs, tabsProps]);

  return {
    currentTab,
    setCurrentTab,
    renderTabs,
    handleTabChange,
  };
}

/**
 * Component TabManager để quản lý tabs
 */
export function TabManager({
  tabs,
  defaultTab,
  onTabChange,
  tabsProps,
  className,
}: TabManagerProps) {
  const { renderTabs } = useTabManager({
    tabs,
    defaultTab,
    onTabChange,
    tabsProps,
  });

  return (
    <div className={className}>
      {renderTabs()}
    </div>
  );
}
