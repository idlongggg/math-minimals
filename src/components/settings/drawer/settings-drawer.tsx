'use client';

import type { ThemeColorScheme } from 'src/theme/types';
import { hasKeys, varAlpha } from 'minimal-shared/utils';
import { useCallback, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import { primaryColorPresets } from 'src/theme/with-settings';
import { Iconify } from '../../iconify';
import { Scrollbar } from '../../scrollbar';
import { useSettingsContext } from '../context/use-settings-context';
import { cleanSettings } from '../utils/clean-settings';
import { BaseOption } from './base-option';
import { FullScreenButton } from './fullscreen-button';
import { settingIcons } from './icons';
import { NavColorOptions, NavLayoutOptions } from './nav-layout-option';
import { PresetsOptions } from './presets-options';
import { LargeBlock, SmallBlock } from './styles';
import type { SettingsDrawerProps, SettingsState } from '../types';

// ----------------------------------------------------------------------

export function SettingsDrawer({ sx, defaultSettings }: SettingsDrawerProps) {
  const settings = useSettingsContext();

  const { mode, setMode, systemMode } = useColorScheme();

  // Làm sạch defaultSettings để đảm bảo không có deprecated properties
  const cleanedDefaultSettings = cleanSettings(defaultSettings);

  useEffect(() => {
    if (mode === 'system' && systemMode) {
      settings.setState({ colorScheme: systemMode });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, systemMode]);

  // Visible options by default settings
  const isDirectionVisible = hasKeys(defaultSettings, ['direction']);
  const isColorSchemeVisible = hasKeys(defaultSettings, ['colorScheme']);
  const isContrastVisible = hasKeys(defaultSettings, ['contrast']);
  const isNavColorVisible = hasKeys(defaultSettings, ['navColor']);
  const isNavLayoutVisible = hasKeys(defaultSettings, ['navLayout']);
  const isPrimaryColorVisible = hasKeys(defaultSettings, ['primaryColor']);

  const handleReset = useCallback(() => {
    settings.onReset();
    setMode(cleanedDefaultSettings.colorScheme as ThemeColorScheme);
  }, [cleanedDefaultSettings.colorScheme, setMode, settings]);

  const renderHead = () => (
    <Box
      sx={{
        py: 2,
        pr: 1,
        pl: 2.5,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Cài đặt
      </Typography>

      <FullScreenButton />

      <Tooltip title="Đặt lại tất cả">
        <IconButton onClick={handleReset}>
          <Badge color="error" variant="dot" invisible={!settings.canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Đóng">
        <IconButton onClick={settings.onCloseDrawer}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderMode = () => (
    <BaseOption
      label="Chế độ tối"
      selected={settings.state.colorScheme === 'dark'}
      icon={<SvgIcon>{settingIcons.moon}</SvgIcon>}
      onChangeOption={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
        settings.setState({ colorScheme: mode === 'light' ? 'dark' : 'light' });
      }}
    />
  );

  const renderContrast = () => (
    <BaseOption
      label="Độ tương phản"
      tooltip="Tăng độ tương phản để dễ đọc hơn"
      selected={settings.state.contrast === 'hight'}
      icon={<SvgIcon>{settingIcons.contrast}</SvgIcon>}
      onChangeOption={() =>
        settings.setState({
          contrast: settings.state.contrast === 'default' ? 'hight' : 'default',
        })
      }
    />
  );

  const renderRtl = () => (
    <BaseOption
      label="Right to left"
      selected={settings.state.direction === 'rtl'}
      icon={<SvgIcon>{settingIcons.alignRight}</SvgIcon>}
      onChangeOption={() =>
        settings.setState({
          direction: settings.state.direction === 'ltr' ? 'rtl' : 'ltr',
        })
      }
    />
  );

  const renderPresets = () => (
    <LargeBlock
      title="Màu chủ đạo"
      canReset={settings.state.primaryColor !== defaultSettings.primaryColor}
      onReset={() =>
        settings.setState({ primaryColor: defaultSettings.primaryColor })
      }
    >
      <PresetsOptions
        icon={
          <SvgIcon sx={{ width: 28, height: 28 }}>
            {settingIcons.siderbarDuotone}
          </SvgIcon>
        }
        options={
          Object.keys(primaryColorPresets).map((key) => ({
            name: key,
            value: primaryColorPresets[key].main,
          })) as { name: SettingsState['primaryColor']; value: string }[]
        }
        value={settings.state.primaryColor}
        onChangeOption={(newOption) =>
          settings.setState({ primaryColor: newOption })
        }
      />
    </LargeBlock>
  );

  const renderNav = () => (
    <LargeBlock
      title="Thanh điều hướng"
      tooltip="Chỉ áp dụng cho Dashboard"
      sx={{ gap: 2.5 }}
    >
      {isNavLayoutVisible && (
        <SmallBlock
          label="Bố cục"
          canReset={settings.state.navLayout !== defaultSettings.navLayout}
          onReset={() =>
            settings.setState({ navLayout: defaultSettings.navLayout })
          }
        >
          <NavLayoutOptions
            value={settings.state.navLayout}
            onChangeOption={(newOption) =>
              settings.setState({ navLayout: newOption })
            }
            options={[
              {
                value: 'vertical',
                icon: (
                  <SvgIcon sx={{ width: 1, height: 'auto' }}>
                    {settingIcons.navVertical}
                  </SvgIcon>
                ),
              },
              {
                value: 'horizontal',
                icon: (
                  <SvgIcon sx={{ width: 1, height: 'auto' }}>
                    {settingIcons.navHorizontal}
                  </SvgIcon>
                ),
              },
              {
                value: 'mini',
                icon: (
                  <SvgIcon sx={{ width: 1, height: 'auto' }}>
                    {settingIcons.navMini}
                  </SvgIcon>
                ),
              },
            ]}
          />
        </SmallBlock>
      )}
      {isNavColorVisible && (
        <SmallBlock
          label="Màu sắc"
          canReset={settings.state.navColor !== defaultSettings.navColor}
          onReset={() =>
            settings.setState({ navColor: defaultSettings.navColor })
          }
        >
          <NavColorOptions
            value={settings.state.navColor}
            onChangeOption={(newOption) =>
              settings.setState({ navColor: newOption })
            }
            options={[
              {
                label: 'Tích hợp',
                value: 'integrate',
                icon: <SvgIcon>{settingIcons.sidebarOutline}</SvgIcon>,
              },
              {
                label: 'Nổi bật',
                value: 'apparent',
                icon: <SvgIcon>{settingIcons.sidebarFill}</SvgIcon>,
              },
            ]}
          />
        </SmallBlock>
      )}
    </LargeBlock>
  );

  return (
    <Drawer
      anchor="right"
      open={settings.openDrawer}
      onClose={settings.onCloseDrawer}
      slotProps={{
        backdrop: { invisible: true },
        paper: {
          sx: [
            (theme) => ({
              ...theme.mixins.paperStyles(theme, {
                color: varAlpha(
                  theme.vars.palette.background.defaultChannel,
                  0.9
                ),
              }),
              width: 360,
              maxWidth: '100vw', // Đảm bảo không vượt quá viewport
              overflowX: 'hidden', // Ngăn horizontal scroll
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ],
        },
      }}
    >
      {renderHead()}

      <Scrollbar>
        <Box
          sx={{
            pb: 5,
            gap: 6,
            px: 2.5,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // Ngăn horizontal scroll
            minWidth: 0, // Cho phép flex shrink
          }}
        >
          <Box
            sx={{
              gap: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              minWidth: 0, // Cho phép grid shrink
              overflow: 'hidden', // Ngăn overflow
            }}
          >
            {isColorSchemeVisible && renderMode()}
            {isContrastVisible && renderContrast()}
            {isDirectionVisible && renderRtl()}
          </Box>

          {(isNavColorVisible || isNavLayoutVisible) && renderNav()}
          {isPrimaryColorVisible && renderPresets()}
        </Box>
      </Scrollbar>
    </Drawer>
  );
}
