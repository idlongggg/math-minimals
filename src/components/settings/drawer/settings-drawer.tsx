'use client';

import type { ThemeColorScheme } from 'src/theme/types';

import { hasKeys, varAlpha } from 'minimal-shared/utils';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';

import { useLocales } from 'src/locales/hooks';
import { themeConfig } from 'src/theme/theme-config';
import { CloseIcon } from 'src/assets/icons/close-icon';
import { ResetIcon } from 'src/assets/icons/reset-icon';
import { primaryColorPresets } from 'src/theme/with-settings';
import { FullscreenIcon } from 'src/assets/icons/fullscreen-icon';

import { settingIcons } from './icons';
import { BaseOption } from './base-option';
import { Scrollbar } from '../../scrollbar';
import { LargeBlock, SmallBlock } from './styles';
import { PresetsOptions } from './presets-options';
import { FontSizeOptions, FontFamilyOptions } from './font-options';
import { useSettingsContext } from '../context/use-settings-context';
import { NavColorOptions, NavLayoutOptions } from './nav-layout-option';

import type { SettingsState, SettingsDrawerProps } from '../types';

// ----------------------------------------------------------------------

export function SettingsDrawer({ sx, defaultSettings }: SettingsDrawerProps) {
    const settings = useSettingsContext();
    const { translate: t } = useLocales();

    const { mode, setMode, systemMode } = useColorScheme();

    useEffect(() => {
        if (mode === 'system' && systemMode) {
            settings.setState({ colorScheme: systemMode });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, systemMode]);

    // Visible options by default settings
    const isFontFamilyVisible = false; // hasKeys(defaultSettings, ['fontFamily']);
    const isCompactLayoutVisible = false; // hasKeys(defaultSettings, ['compactLayout']);
    const isDirectionVisible = false; // hasKeys(defaultSettings, ['direction']);
    const isColorSchemeVisible = hasKeys(defaultSettings, ['colorScheme']);
    const isContrastVisible = hasKeys(defaultSettings, ['contrast']);
    const isNavColorVisible = hasKeys(defaultSettings, ['navColor']);
    const isNavLayoutVisible = hasKeys(defaultSettings, ['navLayout']);
    const isPrimaryColorVisible = hasKeys(defaultSettings, ['primaryColor']);
    const isFontSizeVisible = false; // hasKeys(defaultSettings, ['fontSize']);

    const handleReset = useCallback(() => {
        settings.onReset();
        setMode(defaultSettings.colorScheme as ThemeColorScheme);
    }, [defaultSettings.colorScheme, setMode, settings]);

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
                {t('settings.title')}
            </Typography>

            <FullScreenButtonTSX />

            <Tooltip title={t('settings.resetAll')}>
                <IconButton onClick={handleReset}>
                    <Badge color="error" variant="dot" invisible={!settings.canReset}>
                        <ResetIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Tooltip title={t('settings.close')}>
                <IconButton onClick={settings.onCloseDrawer}>
                    <CloseIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );

    const renderMode = () => (
        <BaseOption
            label={t('settings.darkMode')}
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
            label={t('settings.contrast')}
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
            label={t('settings.rightToLeft')}
            selected={settings.state.direction === 'rtl'}
            icon={<SvgIcon>{settingIcons.alignRight}</SvgIcon>}
            onChangeOption={() =>
                settings.setState({ direction: settings.state.direction === 'ltr' ? 'rtl' : 'ltr' })
            }
        />
    );

    const renderCompact = () => (
        <BaseOption
            tooltip={t('settings.compactTooltip')}
            label={t('settings.compact')}
            selected={!!settings.state.compactLayout}
            icon={<SvgIcon>{settingIcons.autofitWidth}</SvgIcon>}
            onChangeOption={() =>
                settings.setState({ compactLayout: !settings.state.compactLayout })
            }
        />
    );

    const renderPresets = () => (
        <LargeBlock
            title={t('settings.presets')}
            canReset={settings.state.primaryColor !== defaultSettings.primaryColor}
            onReset={() => settings.setState({ primaryColor: defaultSettings.primaryColor })}
        >
            <PresetsOptions
                icon={
                    <SvgIcon sx={{ width: 28, height: 28 }}>{settingIcons.siderbarDuotone}</SvgIcon>
                }
                options={
                    Object.keys(primaryColorPresets).map((key) => ({
                        name: key,
                        value: primaryColorPresets[key].main,
                    })) as { name: SettingsState['primaryColor']; value: string }[]
                }
                value={settings.state.primaryColor}
                onChangeOption={(newOption) => settings.setState({ primaryColor: newOption })}
            />
        </LargeBlock>
    );

    const renderNav = () => (
        <LargeBlock title={t('settings.nav')} tooltip={t('settings.navTooltip')} sx={{ gap: 2.5 }}>
            {isNavLayoutVisible && (
                <SmallBlock
                    label={t('settings.layout')}
                    canReset={settings.state.navLayout !== defaultSettings.navLayout}
                    onReset={() => settings.setState({ navLayout: defaultSettings.navLayout })}
                >
                    <NavLayoutOptions
                        value={settings.state.navLayout}
                        onChangeOption={(newOption) => settings.setState({ navLayout: newOption })}
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
                    label={t('settings.color')}
                    canReset={settings.state.navColor !== defaultSettings.navColor}
                    onReset={() => settings.setState({ navColor: defaultSettings.navColor })}
                >
                    <NavColorOptions
                        value={settings.state.navColor}
                        onChangeOption={(newOption) => settings.setState({ navColor: newOption })}
                        options={[
                            {
                                label: t('settings.integrate'),
                                value: 'integrate',
                                icon: <SvgIcon>{settingIcons.sidebarOutline}</SvgIcon>,
                            },
                            {
                                label: t('settings.apparent'),
                                value: 'apparent',
                                icon: <SvgIcon>{settingIcons.sidebarFill}</SvgIcon>,
                            },
                        ]}
                    />
                </SmallBlock>
            )}
        </LargeBlock>
    );

    const renderFont = () => (
        <LargeBlock title={t('settings.font')} sx={{ gap: 2.5 }}>
            {isFontFamilyVisible && (
                <SmallBlock
                    label={t('settings.family')}
                    canReset={settings.state.fontFamily !== defaultSettings.fontFamily}
                    onReset={() => settings.setState({ fontFamily: defaultSettings.fontFamily })}
                >
                    <FontFamilyOptions
                        value={settings.state.fontFamily}
                        onChangeOption={(newOption) => settings.setState({ fontFamily: newOption })}
                        options={[
                            themeConfig.fontFamily.primary,
                            'Inter Variable',
                            'DM Sans Variable',
                            'Nunito Sans Variable',
                        ]}
                        icon={<SvgIcon sx={{ width: 28, height: 28 }}>{settingIcons.font}</SvgIcon>}
                    />
                </SmallBlock>
            )}
            {isFontSizeVisible && (
                <SmallBlock
                    label={t('settings.size')}
                    canReset={settings.state.fontSize !== defaultSettings.fontSize}
                    onReset={() => settings.setState({ fontSize: defaultSettings.fontSize })}
                    sx={{ gap: 5 }}
                >
                    <FontSizeOptions
                        options={[12, 20]}
                        value={settings.state.fontSize}
                        onChangeOption={(newOption) => settings.setState({ fontSize: newOption })}
                    />
                </SmallBlock>
            )}
        </LargeBlock>
    );

    // ----------------------------------------------------------------------

    function FullScreenButtonTSX() {
        const [fullscreen, setFullscreen] = useState(false);

        const handleToggleFullscreen = useCallback(() => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                setFullscreen(true);
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
                setFullscreen(false);
            }
        }, []);

        return (
            <Tooltip title={fullscreen ? t('settings.exitFullscreen') : t('settings.fullscreen')}>
                <IconButton
                    onClick={handleToggleFullscreen}
                    color={fullscreen ? 'primary' : 'default'}
                >
                    <FullscreenIcon />
                </IconButton>
            </Tooltip>
        );
    }

    // ----------------------------------------------------------------------

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
                                color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),
                            }),
                            width: 360,
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
                    }}
                >
                    <Box sx={{ gap: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        {isColorSchemeVisible && renderMode()}
                        {isContrastVisible && renderContrast()}
                        {isDirectionVisible && renderRtl()}
                        {isCompactLayoutVisible && renderCompact()}
                    </Box>

                    {(isNavColorVisible || isNavLayoutVisible) && renderNav()}
                    {isPrimaryColorVisible && renderPresets()}
                    {(isFontFamilyVisible || isFontSizeVisible) && renderFont()}
                </Box>
            </Scrollbar>
        </Drawer>
    );
}
