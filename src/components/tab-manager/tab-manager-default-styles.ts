import { type SxProps, type Theme } from '@mui/material/styles';
import { type TabManagerTabConfig } from './tab-manager';

// ----------------------------------------------------------------------

/**
 * Default styles cho TabManager component
 */
export const TAB_MANAGER_DEFAULT_STYLES = {
  /**
   * Default container styles cho CustomTabs
   */
  container: {
    // Ẩn indicator mặc định để tránh xung đột
    '& .MuiTabs-indicator': {
      display: 'none',
    },
    // Style cho container của tabs
    '& .MuiTabs-flexContainer': {
      gap: 0.5,
    },
  } as SxProps<Theme>,

  /**
   * Default styles cho từng Tab
   */
  tab: {
    // Base styles - thiết kế tối giản và sạch sẽ
    minHeight: 48,
    px: 2,
    py: 1.5,
    borderRadius: 1,
    
    // Màu sắc mặc định
    color: 'text.secondary',
    backgroundColor: 'transparent',
    
    // Style cho trạng thái active - đơn giản và tương phản cao
    '&.Mui-selected': {
      color: 'background.paper',
      fontWeight: 600,
      backgroundColor: 'text.primary',
      borderRadius: 1,
      
      // Đảm bảo icon cũng được style với độ ưu tiên cao
      '& .MuiSvgIcon-root': {
        color: 'background.paper !important',
      },
      '& .MuiTab-iconWrapper': {
        color: 'background.paper !important',
      },
      '& .MuiTab-iconWrapper .MuiSvgIcon-root': {
        color: 'background.paper !important',
      },
    },
    
    // Trạng thái disabled
    '&.Mui-disabled': {
      color: 'text.disabled',
      backgroundColor: 'transparent',
    },
  } as SxProps<Theme>,
} as const;

// ----------------------------------------------------------------------

/**
 * Các style preset cho TabManager
 */
export const TAB_MANAGER_STYLE_PRESETS = {
  /**
   * Style mặc định - tương phản cao, minimal
   */
  default: {
    container: TAB_MANAGER_DEFAULT_STYLES.container,
    tab: TAB_MANAGER_DEFAULT_STYLES.tab,
  },

  /**
   * Style với border
   */
  bordered: {
    container: {
      ...TAB_MANAGER_DEFAULT_STYLES.container,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      p: 0.5,
    },
    tab: {
      ...TAB_MANAGER_DEFAULT_STYLES.tab,
      border: '1px solid transparent',
      '&.Mui-selected': {
        color: 'background.paper',
        fontWeight: 600,
        backgroundColor: 'text.primary',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'primary.main',
        '& .MuiSvgIcon-root': {
          color: 'background.paper !important',
        },
        '& .MuiTab-iconWrapper': {
          color: 'background.paper !important',
        },
        '& .MuiTab-iconWrapper .MuiSvgIcon-root': {
          color: 'background.paper !important',
        },
      },
    },
  },

  /**
   * Style với underline
   */
  underlined: {
    container: {
      ...TAB_MANAGER_DEFAULT_STYLES.container,
      borderBottom: '1px solid',
      borderColor: 'divider',
      '& .MuiTabs-indicator': {
        display: 'block',
        height: 3,
        borderRadius: '3px 3px 0 0',
      },
    },
    tab: {
      ...TAB_MANAGER_DEFAULT_STYLES.tab,
      backgroundColor: 'transparent',
      '&.Mui-selected': {
        color: 'primary.main',
        backgroundColor: 'transparent',
        fontWeight: 600,
        '& .MuiSvgIcon-root': {
          color: 'primary.main !important',
        },
        '& .MuiTab-iconWrapper': {
          color: 'primary.main !important',
        },
      },
    },
  },

  /**
   * Style với shadow
   */
  elevated: {
    container: {
      ...TAB_MANAGER_DEFAULT_STYLES.container,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderRadius: 1,
      p: 0.5,
      backgroundColor: 'background.paper',
    },
    tab: {
      ...TAB_MANAGER_DEFAULT_STYLES.tab,
      '&.Mui-selected': {
        color: 'background.paper',
        fontWeight: 600,
        backgroundColor: 'text.primary',
        borderRadius: 1,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '& .MuiSvgIcon-root': {
          color: 'background.paper !important',
        },
        '& .MuiTab-iconWrapper': {
          color: 'background.paper !important',
        },
        '& .MuiTab-iconWrapper .MuiSvgIcon-root': {
          color: 'background.paper !important',
        },
      },
    },
  },

  /**
   * Style với màu sắc nhẹ
   */
  soft: {
    container: TAB_MANAGER_DEFAULT_STYLES.container,
    tab: {
      ...TAB_MANAGER_DEFAULT_STYLES.tab,
      '&.Mui-selected': {
        color: 'primary.main',
        backgroundColor: 'primary.lighter',
        fontWeight: 600,
        '& .MuiSvgIcon-root': {
          color: 'primary.main !important',
        },
        '& .MuiTab-iconWrapper': {
          color: 'primary.main !important',
        },
      },
    },
  },
} as const;

// ----------------------------------------------------------------------

/**
 * Utility function để lấy style theo preset
 */
export function getTabManagerStyles(
  preset: keyof typeof TAB_MANAGER_STYLE_PRESETS = 'default'
) {
  return TAB_MANAGER_STYLE_PRESETS[preset];
}

// ----------------------------------------------------------------------

/**
 * Utility function để merge custom styles với default styles
 */
export function mergeTabManagerStyles(
  customStyles: {
    container?: SxProps<Theme>;
    tab?: SxProps<Theme>;
  },
  preset: keyof typeof TAB_MANAGER_STYLE_PRESETS = 'default'
) {
  const presetStyles = getTabManagerStyles(preset);
  
  return {
    container: {
      ...presetStyles.container,
      ...customStyles.container,
    },
    tab: {
      ...presetStyles.tab,
      ...customStyles.tab,
    },
  };
}

// ----------------------------------------------------------------------

/**
 * Default tab configurations cho các trường hợp phổ biến
 */
export const DEFAULT_TAB_CONFIGS: Record<string, TabManagerTabConfig[]> = {
  /**
   * Tabs cơ bản cho trang overview
   */
  overview: [
    {
      value: 'overview',
      label: 'Tổng quan',
      colorKey: 'primary',
    },
    {
      value: 'details',
      label: 'Chi tiết',
      colorKey: 'secondary',
    },
    {
      value: 'settings',
      label: 'Cài đặt',
      colorKey: 'info',
    },
  ],

  /**
   * Tabs cho trang calculator
   */
  calculator: [
    {
      value: 'main',
      label: 'Tính toán',
      colorKey: 'primary',
    },
    {
      value: 'history',
      label: 'Lịch sử',
      colorKey: 'secondary',
    },
    {
      value: 'guide',
      label: 'Hướng dẫn',
      colorKey: 'info',
    },
  ],

  /**
   * Tabs cho trang subject
   */
  subject: [
    {
      value: 'overview',
      label: 'Tổng quan',
      colorKey: 'primary',
    },
    {
      value: 'topics',
      label: 'Chủ đề',
      colorKey: 'secondary',
    },
    {
      value: 'practice',
      label: 'Luyện tập',
      colorKey: 'success',
    },
    {
      value: 'guide',
      label: 'Hướng dẫn',
      colorKey: 'info',
    },
  ],
};
