'use client';

import type { Breakpoint } from '@mui/material/styles';
import type { NavItemProps, NavSectionProps } from 'src/components/nav-section';

import { merge } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { iconButtonClasses } from '@mui/material/IconButton';

import { useUrlParams } from 'src/hooks/use-url-params';
import { useNavigationData } from 'src/hooks/use-navigation-data';

import { _contacts, _notifications } from 'src/_mock';
import { BottomDrawerProvider } from 'src/contexts/bottom-drawer-context';

import { Logo } from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';
import { BottomDrawer, BottomDrawerFab } from 'src/components/bottom-drawer-fab';

import { useMockedUser } from 'src/auth/hooks';

import { NavMobile } from './nav-mobile';
import { VerticalDivider } from './content';
import { NavVertical } from './nav-vertical';
import { layoutClasses } from '../core/classes';
import { _account } from '../nav-config-account';
import { NavHorizontal } from './nav-horizontal';
import { MainSection } from '../core/main-section';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../nav-config-workspace';
import { MenuButton } from '../components/menu-button';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { AccountDrawer } from '../components/account-drawer';
import { SettingsButton } from '../components/settings-button';
import { ContactsPopover } from '../components/contacts-popover';
import { LanguagePopover } from '../components/language-popover';
import { WorkspacesPopover } from '../components/workspaces-popover';
import { navData as dashboardNavData } from '../nav-config-dashboard';
import { dashboardLayoutVars, dashboardNavColorVars } from './css-vars';
import { NotificationsDrawer } from '../components/notifications-drawer';

import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavSectionProps['data'];
    };
    main?: MainSectionProps;
  };
};

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const theme = useTheme();

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  // Đọc parameters trực tiếp từ URL mà không lưu cache
  const urlParams = useUrlParams();

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, settings.state.navLayout);

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const baseNavData = slotProps?.nav?.data ?? dashboardNavData;
  const navData = useNavigationData(baseNavData);

  const isNavMini = settings.state.navLayout === 'mini';
  const isNavHorizontal = settings.state.navLayout === 'horizontal';
  const isNavVertical = isNavMini || settings.state.navLayout === 'vertical';
  const isMenuHidden = urlParams.hideMenu ?? false;
  const isAvatarHidden = urlParams.hideAvatar ?? false;

  const canDisplayItemByRole = (allowedRoles: NavItemProps['allowedRoles']): boolean =>
    !allowedRoles?.includes(user?.role);

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
        sx: {
          ...(isNavVertical && { px: { [layoutQuery]: 5 } }),
          ...(isNavHorizontal && {
            bgcolor: 'var(--layout-nav-bg)',
            height: { [layoutQuery]: 'var(--layout-nav-horizontal-height)' },
            [`& .${iconButtonClasses.root}`]: { color: 'var(--layout-nav-text-secondary-color)' },
          }),
        },
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      bottomArea:
        isNavHorizontal && !isMenuHidden ? (
          <NavHorizontal
            data={navData}
            layoutQuery={layoutQuery}
            cssVars={navVars.section}
            checkPermissions={canDisplayItemByRole}
          />
        ) : null,
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          {!isMenuHidden && (
            <MenuButton
              onClick={onOpen}
              sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
            />
          )}
          {!isMenuHidden && (
            <NavMobile
              data={navData}
              open={open}
              onClose={onClose}
              cssVars={navVars.section}
              checkPermissions={canDisplayItemByRole}
            />
          )}

          {/** @slot Logo */}
          {(isNavHorizontal || isMenuHidden) && (
            <Logo
              sx={{
                display: 'none',
                [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
              }}
            />
          )}

          {/** @slot Divider */}
          {(isNavHorizontal || isMenuHidden) && (
            <VerticalDivider sx={{ [theme.breakpoints.up(layoutQuery)]: { display: 'flex' } }} />
          )}

          {/** @slot Workspace popover */}
          <WorkspacesPopover
            data={_workspaces}
            sx={{
              ...(isNavHorizontal && { color: 'var(--layout-nav-text-primary-color)' }),
              ...(isMenuHidden && { color: 'text.primary' }),
            }}
          />
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } }}>
          {/** @slot Searchbar */}
          <Searchbar data={navData} />

          {/** @slot Language popover - hiển thị trong danh sách bình thường nếu avatar không bị ẩn */}
          {!isAvatarHidden && (
            <LanguagePopover
              data={[
                { value: 'vi', label: 'Tiếng Việt', countryCode: 'VN' },
                { value: 'cn', label: 'Tiếng Trung', countryCode: 'CN' },
                { value: 'en', label: 'Tiếng Anh', countryCode: 'GB' },
              ]}
            />
          )}

          {/** @slot Notifications popover */}
          <NotificationsDrawer data={_notifications} />

          {/** @slot Contacts popover */}
          <ContactsPopover data={_contacts} />

          {/** @slot Settings button */}
          <SettingsButton />

          {/** @slot Language popover - hiển thị ở cuối nếu avatar bị ẩn */}
          {isAvatarHidden && (
            <LanguagePopover
              data={[
                { value: 'vi', label: 'Tiếng Việt', countryCode: 'VN' },
                { value: 'cn', label: 'Tiếng Trung', countryCode: 'CN' },
                { value: 'en', label: 'Tiếng Anh', countryCode: 'GB' },
              ]}
            />
          )}

          {/** @slot Account drawer - ẩn nếu isAvatarHidden */}
          {!isAvatarHidden && <AccountDrawer data={_account} />}
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        disableElevation={isNavVertical}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderSidebar = () =>
    !isMenuHidden ? (
      <NavVertical
        data={navData}
        isNavMini={isNavMini}
        layoutQuery={layoutQuery}
        cssVars={navVars.section}
        checkPermissions={canDisplayItemByRole}
        onToggleNav={() =>
          settings.setField(
            'navLayout',
            settings.state.navLayout === 'vertical' ? 'mini' : 'vertical'
          )
        }
      />
    ) : null;

  const renderFooter = () => null;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <BottomDrawerProvider>
      <LayoutSection
        /** **************************************
         * @Header
         *************************************** */
        headerSection={renderHeader()}
        /** **************************************
         * @Sidebar
         *************************************** */
        sidebarSection={isNavHorizontal || isMenuHidden ? null : renderSidebar()}
        /** **************************************
         * @Footer
         *************************************** */
        footerSection={renderFooter()}
        /** **************************************
         * @Styles
         *************************************** */
        cssVars={{ ...dashboardLayoutVars(theme), ...navVars.layout, ...cssVars }}
        sx={[
          {
            [`& .${layoutClasses.sidebarContainer}`]: {
              [theme.breakpoints.up(layoutQuery)]: {
                pl: isMenuHidden
                  ? 0
                  : isNavMini
                    ? 'var(--layout-nav-mini-width)'
                    : 'var(--layout-nav-vertical-width)',
                transition: theme.transitions.create(['padding-left'], {
                  easing: 'var(--layout-transition-easing)',
                  duration: 'var(--layout-transition-duration)',
                }),
              },
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {renderMain()}
        <BottomDrawerFab />
        <BottomDrawer />
      </LayoutSection>
    </BottomDrawerProvider>
  );
}
