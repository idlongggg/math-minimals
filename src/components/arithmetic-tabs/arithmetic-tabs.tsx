'use client';

import { cloneElement, useCallback } from 'react';

import { Iconify } from 'src/components/iconify';
import { useTabManager } from 'src/components/tab-manager';

import type { TabManagerTabConfig } from 'src/components/tab-manager';

// ----------------------------------------------------------------------

export interface ArithmeticTabsConfig {
  /** Có tab chính không */
  hasMainTab?: boolean;
  /** Label cho tab chính */
  mainTabLabel?: string;
  /** Icon cho tab chính */
  mainTabIcon?: React.ReactElement;
  /** Có tab tính toán không */
  hasCalculator?: boolean;
  /** Label cho tab tính toán */
  calculatorLabel?: string;
  /** Icon cho tab tính toán */
  calculatorIcon?: React.ReactElement;
  /** Có tab công cụ nhanh không */
  hasQuickTools?: boolean;
  /** Label cho tab công cụ nhanh */
  quickToolsLabel?: string;
  /** Icon cho tab công cụ nhanh */
  quickToolsIcon?: React.ReactElement;
  /** Có tab lịch sử không */
  hasHistory?: boolean;
  /** Label cho tab lịch sử */
  historyLabel?: string;
  /** Icon cho tab lịch sử */
  historyIcon?: React.ReactElement;
  /** Số lượng items trong lịch sử */
  historyCount?: number;
  /** Có tab hướng dẫn không */
  hasGuide?: boolean;
  /** Label cho tab hướng dẫn */
  guideLabel?: string;
  /** Icon cho tab hướng dẫn */
  guideIcon?: React.ReactElement;
  /** Các tab custom thêm */
  customTabs?: TabManagerTabConfig[];
}

export interface ArithmeticTabsProps extends ArithmeticTabsConfig {
  /** Tab mặc định */
  defaultTab?: string;
  /** Callback khi tab thay đổi */
  onTabChange?: (tabValue: string) => void;
}

/**
 * Hook để tạo tabs configuration cho các arithmetic pages
 */
export function useArithmeticTabs(config: ArithmeticTabsConfig): TabManagerTabConfig[] {
  return useCallback(() => {
    const tabs: TabManagerTabConfig[] = [];

    // Tab chính (converter, checker, etc.)
    if (config.hasMainTab) {
      const defaultIcon = <Iconify icon="solar:pen-bold" />;
      const iconToUse = config.mainTabIcon || defaultIcon;
      
      tabs.push({
        value: 'main',
        label: config.mainTabLabel || 'Chính',
        icon: cloneElement(iconToUse, {
          sx: { 
            color: '#1976d2',
            ...iconToUse.props?.sx 
          }
        }),
      });
    }

    // Tab tính toán
    if (config.hasCalculator) {
      const defaultIcon = <Iconify icon="solar:pen-bold" />;
      const iconToUse = config.calculatorIcon || defaultIcon;
      
      tabs.push({
        value: 'calculator',
        label: config.calculatorLabel || 'Tính toán',
        icon: cloneElement(iconToUse, {
          sx: { 
            color: '#388e3c',
            ...iconToUse.props?.sx 
          }
        }),
      });
    }

    // Tab công cụ nhanh
    if (config.hasQuickTools) {
      const defaultIcon = <Iconify icon="custom:flash-outline" />;
      const iconToUse = config.quickToolsIcon || defaultIcon;
      
      tabs.push({
        value: 'quick-tools',
        label: config.quickToolsLabel || 'Công cụ nhanh',
        icon: cloneElement(iconToUse, {
          sx: { 
            color: '#f57c00',
            ...iconToUse.props?.sx 
          }
        }),
      });
    }

    // Tab lịch sử
    if (config.hasHistory) {
      const historyCount = config.historyCount || 0;
      const defaultIcon = <Iconify icon="solar:clock-circle-bold" />;
      const iconToUse = config.historyIcon || defaultIcon;
      
      tabs.push({
        value: 'history',
        label: config.historyLabel || `Lịch sử (${historyCount})`,
        icon: cloneElement(iconToUse, {
          sx: { 
            color: '#9c27b0',
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
      tabs.push(...config.customTabs);
    }

    return tabs;
  }, [config])();
}

/**
 * Hook để quản lý arithmetic tabs
 */
export function useArithmeticTabManager(props: ArithmeticTabsProps) {
  const tabConfigs = useArithmeticTabs(props);

  const tabManager = useTabManager({
    tabs: tabConfigs,
    defaultTab: props.defaultTab || tabConfigs[0]?.value,
    onTabChange: props.onTabChange,
    enableColorSync: false, // Arithmetic tabs don't need color sync
  });

  return {
    ...tabManager,
    tabConfigs,
  };
}

/**
 * Các tab configurations thông dụng
 */
export const COMMON_ARITHMETIC_TABS = {
  /** Tab configuration cho trang có converter và history */
  converterWithHistory: {
    hasMainTab: true,
    mainTabLabel: 'Chuyển đổi',
    mainTabIcon: <Iconify icon="solar:restart-bold" />,
    hasHistory: true,
    hasGuide: true,
  },
  /** Tab configuration cho trang có calculator và history */
  calculatorWithHistory: {
    hasMainTab: true,
    mainTabLabel: 'Tính toán',
    mainTabIcon: <Iconify icon="solar:pen-bold" />,
    hasHistory: true,
    hasGuide: true,
  },
  /** Tab configuration cho trang checker */
  checker: {
    hasMainTab: true,
    mainTabLabel: 'Kiểm tra',
    mainTabIcon: <Iconify icon="solar:shield-check-bold" />,
    hasQuickTools: true,
    hasHistory: true,
    hasGuide: true,
  },
  /** Tab configuration cho trang có nhiều features */
  fullFeature: {
    hasMainTab: true,
    hasCalculator: true,
    hasQuickTools: true,
    hasHistory: true,
    hasGuide: true,
  },
} as const;
