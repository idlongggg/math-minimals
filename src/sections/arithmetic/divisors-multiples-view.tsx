'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useTabManager } from 'src/components/tab-manager';

import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';
import type { TabManagerTabConfig } from 'src/components/tab-manager';

import { DivisorsTab, GcdLcmTab, MultiplesTab } from './divisors-multiples';
import { useHistory } from './divisors-multiples/hooks';

/**
 * Component chính cho trang Ước số và Bội số
 * Đã được refactor để tách thành các components và hooks riêng biệt
 */
export function DivisorsMultiplesView() {
  const { history, addToHistory, clearHistory } = useHistory();

  // Tab configuration cho Divisors & Multiples - cập nhật khi history thay đổi
  const divisorsMultiplesTabs: TabManagerTabConfig[] = useMemo(() => [
    {
      value: 'main',
      label: 'Ước số',
      icon: <Iconify icon="solar:pen-bold" sx={{ color: '#1976d2' }} />,
      colorKey: 'primary'
    },
    {
      value: 'multiples',
      label: 'Bội số',
      icon: <Iconify icon="solar:list-bold" sx={{ color: '#388e3c' }} />,
      colorKey: 'success'
    },
    {
      value: 'gcd-lcm',
      label: 'GCD & LCM',
      icon: <Iconify icon="solar:tv-bold" sx={{ color: '#f57c00' }} />,
      colorKey: 'warning'
    },
    {
      value: 'history',
      label: `Lịch sử (${history.length})`,
      icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: '#9c27b0' }} />,
      colorKey: 'secondary'
    },
    {
      value: 'guide',
      label: 'Hướng dẫn',
      icon: <Iconify icon="solar:notebook-bold-duotone" sx={{ color: '#7b1fa2' }} />,
      colorKey: 'info'
    }
  ], [history.length]);

  // Sử dụng TabManager trực tiếp
  const { currentTab, renderTabs } = useTabManager({
    tabs: divisorsMultiplesTabs,
    defaultTab: 'main',
    enableColorSync: true
  });

  const renderTabContent = useCallback(() => {
    switch (currentTab) {
      case 'main':
        return <DivisorsTab onAddToHistory={addToHistory} />;
      case 'multiples':
        return <MultiplesTab onAddToHistory={addToHistory} />;
      case 'gcd-lcm':
        return <GcdLcmTab onAddToHistory={addToHistory} />;
      case 'history':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Lịch sử tính toán
            </Typography>
            {history.length === 0 ? (
              <Typography color="text.secondary">
                Chưa có lịch sử tính toán nào.
              </Typography>
            ) : (
              <Box>
                <Button
                  onClick={clearHistory}
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ mb: 2 }}
                >
                  Xóa tất cả
                </Button>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {history.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        <strong>{item.type}</strong> -{' '}
                        {item.timestamp.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="pre"
                        sx={{ whiteSpace: 'pre-wrap' }}
                      >
                        {JSON.stringify(item.data, null, 2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        );
      default:
        return null;
    }
  }, [currentTab, history, addToHistory, clearHistory]);

  return (
    <DashboardPageWithTabsLayout
      title="Ước số và Bội số"
      description="Công cụ tìm ước số, bội số và tính GCD/LCM với các thuật toán hiệu quả."
      tabs={renderTabs()}
    >
      <Box sx={{ mt: 3 }}>{renderTabContent()}</Box>
    </DashboardPageWithTabsLayout>
  );
}
