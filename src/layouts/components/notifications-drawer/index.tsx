'use client';

import type { IconButtonProps } from '@mui/material/IconButton';

import { m } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomTabs } from 'src/components/custom-tabs';
import { varTap, varHover, transitionTap } from 'src/components/animate';

import { NotificationItem } from './notification-item';

import type { NotificationItemProps } from './notification-item';

// ----------------------------------------------------------------------

const TABS = [
    { value: 'all', label: 'All', count: 22 },
    { value: 'unread', label: 'Unread', count: 12 },
    { value: 'archived', label: 'Archived', count: 10 },
];

// ----------------------------------------------------------------------

export type NotificationsDrawerProps = IconButtonProps & {
    data?: NotificationItemProps['notification'][];
};

export function NotificationsDrawer({ data = [], sx, ...other }: NotificationsDrawerProps) {
    const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

    const [currentTab, setCurrentTab] = useState('all');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const [notifications, setNotifications] = useState(data);

    const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({ ...notification, isUnRead: false }))
        );
    };

    const renderHead = () => (
        <Box
            sx={{
                py: 2,
                pr: 1,
                pl: 2.5,
                minHeight: 68,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Notifications
            </Typography>

            {!!totalUnRead && (
                <Tooltip title="Mark all as read">
                    <IconButton color="primary" onClick={handleMarkAllAsRead}>
                        <Iconify icon="eva:done-all-fill" />
                    </IconButton>
                </Tooltip>
            )}

            <IconButton onClick={onClose} sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                <Iconify icon="mingcute:close-line" />
            </IconButton>

            <IconButton>
                <Iconify icon="solar:settings-bold-duotone" />
            </IconButton>
        </Box>
    );

    const renderTabs = () => (
        <CustomTabs variant="fullWidth" value={currentTab} onChange={handleChangeTab}>
            {TABS.map((tab) => (
                <Tab
                    key={tab.value}
                    iconPosition="end"
                    value={tab.value}
                    label={tab.label}
                    icon={
                        <Label
                            variant={
                                ((tab.value === 'all' || tab.value === currentTab) && 'filled') ||
                                'soft'
                            }
                            color={
                                (tab.value === 'unread' && 'info') ||
                                (tab.value === 'archived' && 'success') ||
                                'default'
                            }
                        >
                            {tab.count}
                        </Label>
                    }
                />
            ))}
        </CustomTabs>
    );

    const renderList = () => (
        <Scrollbar>
            <Box component="ul">
                {notifications?.map((notification) => (
                    <Box component="li" key={notification.id} sx={{ display: 'flex' }}>
                        <NotificationItem notification={notification} />
                    </Box>
                ))}
            </Box>
        </Scrollbar>
    );

    return (
        <>
            <IconButton
                component={m.button}
                whileTap={varTap(0.96)}
                whileHover={varHover(1.04)}
                transition={transitionTap()}
                aria-label="Notifications button"
                onClick={onOpen}
                sx={sx}
                {...other}
            >
                <Badge badgeContent={totalUnRead} color="error">
                    {totalUnRead > 0 ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <g fill="none">
                                <path
                                    fill="url(#fluentColorAlertBadge240)"
                                    d="M15 18a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
                                />
                                <path
                                    fill="url(#fluentColorAlertBadge241)"
                                    d="M12 2.004a7.5 7.5 0 0 1 7.5 7.5v3.998l1.418 3.16a.95.95 0 0 1-.866 1.34h-16.1a.95.95 0 0 1-.867-1.339l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004"
                                />
                                <path
                                    fill="url(#fluentColorAlertBadge243)"
                                    fillOpacity={0.2}
                                    d="M12 2.004a7.5 7.5 0 0 1 7.5 7.5v3.998l1.418 3.16a.95.95 0 0 1-.866 1.34h-16.1a.95.95 0 0 1-.867-1.339l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004"
                                />
                                <path
                                    fill="url(#fluentColorAlertBadge242)"
                                    d="M18.5 8a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5"
                                />
                                <defs>
                                    <linearGradient
                                        id="fluentColorAlertBadge240"
                                        x1={12}
                                        x2={12.019}
                                        y1={17.5}
                                        y2={20.999}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#eb4824" />
                                        <stop offset={1} stopColor="#ffcd0f" stopOpacity={0.988} />
                                    </linearGradient>
                                    <linearGradient
                                        id="fluentColorAlertBadge241"
                                        x1={21.027}
                                        x2={4.945}
                                        y1={17.995}
                                        y2={4.464}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#ff6f47" />
                                        <stop offset={1} stopColor="#ffcd0f" />
                                    </linearGradient>
                                    <linearGradient
                                        id="fluentColorAlertBadge242"
                                        x1={16.179}
                                        x2={20.107}
                                        y1={3.938}
                                        y2={7.063}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#f83f54" />
                                        <stop offset={1} stopColor="#b91d6b" />
                                    </linearGradient>
                                    <radialGradient
                                        id="fluentColorAlertBadge243"
                                        cx={0}
                                        cy={0}
                                        r={1}
                                        gradientTransform="rotate(131.987 7.803 7.37)scale(6.72681 7.33035)"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset={0.253} stopColor="#ffe994" />
                                        <stop offset={0.648} stopColor="#ffe994" stopOpacity={0} />
                                    </radialGradient>
                                </defs>
                            </g>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <g fill="none">
                                <path
                                    fill="url(#fluentColorAlert240)"
                                    d="M15 18a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
                                />
                                <path
                                    fill="url(#fluentColorAlert241)"
                                    d="M12 2.004a7.5 7.5 0 0 1 7.5 7.5v3.998l1.418 3.16a.95.95 0 0 1-.866 1.34h-16.1a.95.95 0 0 1-.867-1.339l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004"
                                />
                                <defs>
                                    <linearGradient
                                        id="fluentColorAlert240"
                                        x1={12}
                                        x2={12.019}
                                        y1={17.5}
                                        y2={20.999}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#eb4824" />
                                        <stop offset={1} stopColor="#ffcd0f" stopOpacity={0.988} />
                                    </linearGradient>
                                    <linearGradient
                                        id="fluentColorAlert241"
                                        x1={21.027}
                                        x2={5.578}
                                        y1={17.995}
                                        y2={3.776}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#ff6f47" />
                                        <stop offset={1} stopColor="#ffcd0f" />
                                    </linearGradient>
                                </defs>
                            </g>
                        </svg>
                    )}
                </Badge>
            </IconButton>

            <Drawer
                open={open}
                onClose={onClose}
                anchor="right"
                slotProps={{
                    backdrop: { invisible: true },
                    paper: { sx: { width: 1, maxWidth: 420 } },
                }}
            >
                {renderHead()}
                {renderTabs()}
                {renderList()}

                <Box sx={{ p: 1 }}>
                    <Button fullWidth size="large">
                        View all
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}
