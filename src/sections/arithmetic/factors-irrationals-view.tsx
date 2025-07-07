'use client';

import 'katex/dist/katex.min.css';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useArithmeticTabManager } from 'src/components/arithmetic-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

import {
    FactorizationTab,
    GcdLcmFactorizationTab,
    IrrationalNumbersTab,
} from './factors-irrationals';
import { useHistory } from './factors-irrationals/hooks';

/**
 * Component chính cho trang Thừa số và Số vô tỉ
 * Đã được refactor để tách thành các components và hooks riêng biệt
 */
export function FactorsIrrationalsView() {
  const { history, addToHistory, clearHistory } = useHistory();

  // Sử dụng ArithmeticTabManager
  const { currentTab, renderTabs } = useArithmeticTabManager({
    hasMainTab: true,
    mainTabLabel: 'Phân tích thừa số',
    mainTabIcon: <Iconify icon="solar:pen-bold" />,
    customTabs: [
      {
        value: 'gcd-lcm',
        label: 'GCD & LCM',
        icon: <Iconify icon="solar:tv-bold" />,
      },
      {
        value: 'irrationals',
        label: 'Số vô tỉ',
        icon: <Iconify icon="solar:list-bold" />,
      },
    ],
    hasHistory: true,
    historyCount: history.length,
    defaultTab: 'main',
  });

  const renderTabContent = useCallback(() => {
    switch (currentTab) {
      case 'main':
        return <FactorizationTab onAddToHistory={addToHistory} />;
      case 'gcd-lcm':
        return <GcdLcmFactorizationTab onAddToHistory={addToHistory} />;
      case 'irrationals':
        return <IrrationalNumbersTab onAddToHistory={addToHistory} />;
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
      title="Thừa số và Số vô tỉ"
      description="Công cụ phân tích thừa số nguyên tố, tính GCD/LCM và khám phá số vô tỉ."
      tabs={renderTabs()}
    >
      <Box sx={{ mt: 3 }}>{renderTabContent()}</Box>
    </DashboardPageWithTabsLayout>
  );
}
