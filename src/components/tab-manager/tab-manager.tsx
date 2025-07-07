'use client';

import { useCallback, useEffect, useState } from 'react';

import Tab from '@mui/material/Tab';

import { CustomTabs } from 'src/components/custom-tabs';

import { useTabColorSafe } from 'src/contexts/tab-color-context';
import { getTabColorValue, type TabColorKey } from 'src/theme/tab-colors';

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
  /** Tab color key for dynamic coloring */
  colorKey?: TabColorKey | string;
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
  /** Enable tab color synchronization */
  enableColorSync?: boolean;
  /** Tab color mapping */
  tabColorMapping?: Record<string, TabColorKey>;
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
  enableColorSync = false,
  tabColorMapping = {},
}: Omit<TabManagerProps, 'className'>): TabManagerHookResult {
  const [currentTab, setCurrentTab] = useState(defaultTab || tabs[0]?.value || '');

  // Always call hooks at the top level - use safe hook that doesn't throw
  const tabColorContext = useTabColorSafe();

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
      onTabChange?.(newValue);
      
      // Update tab color context if enabled
      if (enableColorSync && tabColorContext) {
        tabColorContext.setCurrentTab(newValue);
        if (Object.keys(tabColorMapping).length > 0) {
          tabColorContext.setTabColorMapping(tabColorMapping);
        }
      }
    },
    [onTabChange, enableColorSync, tabColorContext, tabColorMapping]
  );

  // Sync initial tab with color context
  useEffect(() => {
    if (enableColorSync && tabColorContext && currentTab) {
      tabColorContext.setCurrentTab(currentTab);
      if (Object.keys(tabColorMapping).length > 0) {
        tabColorContext.setTabColorMapping(tabColorMapping);
      }
    }
  }, [enableColorSync, tabColorContext, currentTab, tabColorMapping]);

  const renderTabs = useCallback(() => {
    // Get current active tab for styling
    const activeTab = tabs.find(tab => tab.value === currentTab);
    const activeTabColorKey = activeTab?.colorKey || tabColorMapping[currentTab] || currentTab;
    const activeTabColor = getTabColorValue(activeTabColorKey, 'main');

    return (
      <CustomTabs 
        value={currentTab} 
        onChange={handleTabChange} 
        {...tabsProps}
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: enableColorSync ? activeTabColor : undefined,
          },
          ...tabsProps?.sx,
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === currentTab;
          const tabColorKey = tab.colorKey || tabColorMapping[tab.value] || tab.value;
          const tabColor = getTabColorValue(tabColorKey, 'main');
          
          return (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              {...(tab.icon && { icon: tab.icon })}
              disabled={tab.disabled}
              sx={{
                ...(enableColorSync && {
                  color: isActive ? tabColor : 'text.secondary',
                  '&.Mui-selected': {
                    color: tabColor,
                    fontWeight: 600,
                  },
                  '&:hover': {
                    color: tabColor,
                    opacity: 0.8,
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }),
                ...tab.sx,
              }}
            />
          );
        })}
      </CustomTabs>
    );
  }, [currentTab, handleTabChange, tabs, tabsProps, enableColorSync, tabColorMapping]);

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
  enableColorSync = false,
  tabColorMapping = {},
}: TabManagerProps) {
  const { renderTabs } = useTabManager({
    tabs,
    defaultTab,
    onTabChange,
    tabsProps,
    enableColorSync,
    tabColorMapping,
  });

  return (
    <div className={className}>
      {renderTabs()}
    </div>
  );
}
