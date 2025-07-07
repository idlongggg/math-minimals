'use client';

import { cloneElement, useCallback } from 'react';

import type { TabManagerTabConfig } from 'src/components/tab-manager';

import { Iconify } from 'src/components/iconify';
import { useTabManager } from 'src/components/tab-manager';

import type { SubjectTabsConfig, SubjectTabsHookResult, SubjectTabsProps } from './types';

// ----------------------------------------------------------------------

/**
 * Hook để tạo tabs configuration cho các subject pages
 */
export function useSubjectTabs(config: SubjectTabsConfig): TabManagerTabConfig[] {
  return useCallback(() => {
    const tabs: TabManagerTabConfig[] = [];

    // Tab tổng quan
    if (config.hasOverview) {
      const defaultIcon = <Iconify icon="solar:flag-bold" />;
      const iconToUse = config.overviewIcon || defaultIcon;
      
      tabs.push({
        value: 'overview',
        label: config.overviewLabel || 'Tổng quan',
        icon: cloneElement(iconToUse, {
          sx: { 
            color: '#1976d2',
            ...iconToUse.props?.sx 
          }
        }),
      });
    }

    // Tab chủ đề
    if (config.hasTopics) {
      const defaultIcon = <Iconify icon="solar:list-bold" />;
      const iconToUse = config.topicsIcon || defaultIcon;
      
      tabs.push({
        value: 'topics',
        label: config.topicsLabel || 'Chủ đề',
        icon: cloneElement(iconToUse, {
          sx: { 
            color: '#388e3c',
            ...iconToUse.props?.sx 
          }
        }),
      });
    }

    // Tab luyện tập
    if (config.hasPractice) {
      const defaultIcon = <Iconify icon="solar:pen-bold" />;
      const iconToUse = config.practiceIcon || defaultIcon;
      
      tabs.push({
        value: 'practice',
        label: config.practiceLabel || 'Luyện tập',
        icon: cloneElement(iconToUse, {
          sx: { 
            color: '#f57c00',
            ...iconToUse.props?.sx 
          }
        }),
      });
    }

    // Tab hướng dẫn
    if (config.hasGuide) {
      const defaultIcon = <Iconify icon="solar:notebook-bold-duotone" />;
      const iconToUse = config.guideIcon || defaultIcon;
      
      tabs.push({
        value: 'guide',
        label: config.guideLabel || 'Hướng dẫn',
        icon: cloneElement(iconToUse, {
          sx: { 
            color: '#7b1fa2',
            ...iconToUse.props?.sx 
          }
        }),
      });
    }

    // Thêm các tab custom
    if (config.customTabs) {
      tabs.push(...config.customTabs.map(tab => ({
        value: tab.value,
        label: tab.label,
        icon: tab.icon && tab.color ? 
          cloneElement(tab.icon as React.ReactElement<any>, {
            sx: { 
              color: tab.color,
              ...(tab.icon as any).props?.sx 
            }
          }) : tab.icon,
      })));
    }

    return tabs;
  }, [config])();
}

/**
 * Hook để quản lý subject tabs
 */
export function useSubjectTabManager(props: SubjectTabsProps): SubjectTabsHookResult {
  const tabConfigs = useSubjectTabs(props);

  const tabManager = useTabManager({
    tabs: tabConfigs,
    defaultTab: props.defaultTab || tabConfigs[0]?.value,
    onTabChange: props.onTabChange,
  });

  return {
    ...tabManager,
    tabConfigs,
  };
}

/**
 * Các tab configurations thông dụng cho subject pages
 */
export const COMMON_SUBJECT_TABS = {
  /** Tab configuration cho trang subject cơ bản */
  basic: {
    hasOverview: true,
    hasTopics: true,
    hasGuide: true,
  },
  /** Tab configuration cho trang subject có luyện tập */
  withPractice: {
    hasOverview: true,
    hasTopics: true,
    hasPractice: true,
    hasGuide: true,
  },
  /** Tab configuration cho trang subject chỉ có topics */
  topicsOnly: {
    hasTopics: true,
    hasGuide: true,
  },
} as const;
