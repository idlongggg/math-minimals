'use client';

import 'katex/dist/katex.min.css';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useArithmeticTabManager } from 'src/components/arithmetic-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

import { CommonDenominatorTab } from './common-denominator';
import { useHistory } from './common-denominator/hooks';

/**
 * Component chính cho trang Mẫu số chung
 * Đã được refactor để tách thành các components và hooks riêng biệt
 */
export function CommonDenominatorView() {
  const { history, addToHistory, clearHistory } = useHistory();

  // Sử dụng ArithmeticTabManager
  const { currentTab, renderTabs } = useArithmeticTabManager({
    hasMainTab: true,
    mainTabLabel: 'Tính toán',
    mainTabIcon: <Iconify icon="solar:pen-bold" />,
    hasHistory: true,
    historyCount: history.length,
    defaultTab: 'main',
  });

  const renderTabContent = useCallback(() => {
    switch (currentTab) {
      case 'main':
        return <CommonDenominatorTab onAddToHistory={addToHistory} />;
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
                        <strong>Mẫu số chung</strong> -{' '}
                        {item.timestamp.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Input: {item.inputFractions.join(', ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        LCM: {item.lcm}
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
      title="Mẫu số chung"
      description="Công cụ tìm mẫu số chung nhỏ nhất và chuyển đổi phân số về cùng mẫu số."
      tabs={renderTabs()}
    >
      <Box sx={{ mt: 3 }}>{renderTabContent()}</Box>
    </DashboardPageWithTabsLayout>
  );
}
