import { Box, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { DEFAULT_TAB_CONFIGS, useTabManager } from 'src/components/tab-manager';

// ----------------------------------------------------------------------

/**
 * Example component demonstrating TabManager with default styles and presets
 */
export function TabManagerExamples() {
  // Example 1: Default style
  const defaultExample = useTabManager({
    tabs: DEFAULT_TAB_CONFIGS.calculator,
    defaultTab: 'main',
    stylePreset: 'default',
  });

  // Example 2: Bordered style
  const borderedExample = useTabManager({
    tabs: DEFAULT_TAB_CONFIGS.overview,
    defaultTab: 'overview',
    stylePreset: 'bordered',
  });

  // Example 3: Underlined style
  const underlinedExample = useTabManager({
    tabs: DEFAULT_TAB_CONFIGS.subject,
    defaultTab: 'overview',
    stylePreset: 'underlined',
  });

  // Example 4: Elevated style
  const elevatedExample = useTabManager({
    tabs: DEFAULT_TAB_CONFIGS.calculator,
    defaultTab: 'main',
    stylePreset: 'elevated',
  });

  // Example 5: Soft style
  const softExample = useTabManager({
    tabs: DEFAULT_TAB_CONFIGS.overview,
    defaultTab: 'overview',
    stylePreset: 'soft',
  });

  // Example 6: Custom styles
  const customExample = useTabManager({
    tabs: [
      {
        value: 'home',
        label: 'Trang chủ',
        icon: <Iconify icon="solar:home-angle-bold-duotone" />,
        colorKey: 'primary',
      },
      {
        value: 'profile',
        label: 'Hồ sơ',
        icon: <Iconify icon="solar:user-id-bold" />,
        colorKey: 'secondary',
      },
      {
        value: 'settings',
        label: 'Cài đặt',
        icon: <Iconify icon="solar:settings-bold" />,
        colorKey: 'info',
      },
    ],
    defaultTab: 'home',
    customStyles: {
      container: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        p: 1,
      },
      tab: {
        '&.Mui-selected': {
          color: 'primary.main',
          backgroundColor: 'primary.lighter',
          transform: 'scale(1.05)',
          transition: 'all 0.3s ease',
        },
      },
    },
  });

  return (
    <Box sx={{ p: 3, gap: 4, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        TabManager Style Examples
      </Typography>

      {/* Default Style */}
      <Box>
        <Typography variant="h6" gutterBottom>
          1. Default Style (High Contrast)
        </Typography>
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
          {defaultExample.renderTabs()}
        </Box>
      </Box>

      {/* Bordered Style */}
      <Box>
        <Typography variant="h6" gutterBottom>
          2. Bordered Style
        </Typography>
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
          {borderedExample.renderTabs()}
        </Box>
      </Box>

      {/* Underlined Style */}
      <Box>
        <Typography variant="h6" gutterBottom>
          3. Underlined Style
        </Typography>
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
          {underlinedExample.renderTabs()}
        </Box>
      </Box>

      {/* Elevated Style */}
      <Box>
        <Typography variant="h6" gutterBottom>
          4. Elevated Style (With Shadow)
        </Typography>
        <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
          {elevatedExample.renderTabs()}
        </Box>
      </Box>

      {/* Soft Style */}
      <Box>
        <Typography variant="h6" gutterBottom>
          5. Soft Style (Light Colors)
        </Typography>
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
          {softExample.renderTabs()}
        </Box>
      </Box>

      {/* Custom Style */}
      <Box>
        <Typography variant="h6" gutterBottom>
          6. Custom Style (Glass Effect)
        </Typography>
        <Box sx={{ 
          bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          p: 2, 
          borderRadius: 1,
          minHeight: 120,
          display: 'flex',
          alignItems: 'center',
        }}>
          {customExample.renderTabs()}
        </Box>
      </Box>

      {/* Usage Code Examples */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Cách sử dụng:
        </Typography>
        <Box sx={{ 
          bgcolor: 'grey.100', 
          p: 2, 
          borderRadius: 1,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
        }}>
          <pre>{`
// 1. Default style
const { renderTabs } = useTabManager({
  tabs: DEFAULT_TAB_CONFIGS.calculator,
  stylePreset: 'default', // hoặc không truyền
});

// 2. Với style preset
const { renderTabs } = useTabManager({
  tabs: myTabs,
  stylePreset: 'bordered', // 'underlined', 'elevated', 'soft'
});

// 3. Với custom styles
const { renderTabs } = useTabManager({
  tabs: myTabs,
  customStyles: {
    container: { backgroundColor: 'primary.lighter' },
    tab: { '&.Mui-selected': { color: 'primary.main' } }
  }
});

// 4. Kết hợp preset và custom
const { renderTabs } = useTabManager({
  tabs: myTabs,
  stylePreset: 'soft',
  customStyles: { container: { p: 2 } }
});
          `}</pre>
        </Box>
      </Box>
    </Box>
  );
}
