'use client';

import 'katex/dist/katex.min.css';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';

import { useHistory } from './common-denominator/hooks';
import { CommonDenominatorTab } from './common-denominator';

/**
 * Component chính cho trang Mẫu số chung
 * Đã được refactor để tách thành các components và hooks riêng biệt
 */
export function CommonDenominatorView() {
  const [currentTab, setCurrentTab] = useState('calculator');
  const { history, addToHistory, clearHistory } = useHistory();

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab value="calculator" label="Tính toán" />
      <Tab value="history" label={`Lịch sử (${history.length})`} />
    </CustomTabs>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 'calculator':
        return <CommonDenominatorTab onAddToHistory={addToHistory} />;
      case 'history':
        return (
          <div>
            <h3>Lịch sử tính toán</h3>
            {history.length === 0 ? (
              <p>Chưa có lịch sử tính toán nào.</p>
            ) : (
              <div>
                <button onClick={clearHistory}>Xóa tất cả</button>
                {history.map((item) => (
                  <div key={item.id}>
                    <strong>Mẫu số chung</strong> -{' '}
                    {item.timestamp.toLocaleString()}
                    <p>Input: {item.inputFractions.join(', ')}</p>
                    <p>LCM: {item.lcm}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardPageWithTabsLayout
      title="Mẫu số chung"
      description="Công cụ tìm mẫu số chung nhỏ nhất và chuyển đổi phân số về cùng mẫu số."
      tabs={renderTabs()}
    >
      {renderTabContent()}
    </DashboardPageWithTabsLayout>
  );
}
