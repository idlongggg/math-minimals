'use client';

import 'katex/dist/katex.min.css';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';

import { useHistory } from './factors-irrationals/hooks';
import {
  FactorizationTab,
  IrrationalNumbersTab,
  GcdLcmFactorizationTab,
} from './factors-irrationals';

/**
 * Component chính cho trang Thừa số và Số vô tỉ
 * Đã được refactor để tách thành các components và hooks riêng biệt
 */
export function FactorsIrrationalsView() {
  const [currentTab, setCurrentTab] = useState('factors');
  const { history, addToHistory, clearHistory } = useHistory();

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab value="factors" label="Phân tích thừa số" />
      <Tab value="gcd-lcm" label="GCD & LCM" />
      <Tab value="irrationals" label="Số vô tỉ" />
      <Tab value="history" label={`Lịch sử (${history.length})`} />
    </CustomTabs>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 'factors':
        return <FactorizationTab onAddToHistory={addToHistory} />;
      case 'gcd-lcm':
        return <GcdLcmFactorizationTab onAddToHistory={addToHistory} />;
      case 'irrationals':
        return <IrrationalNumbersTab onAddToHistory={addToHistory} />;
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
                    <strong>{item.type}</strong> -{' '}
                    {item.timestamp.toLocaleString()}
                    <pre>{JSON.stringify(item.data, null, 2)}</pre>
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
      title="Thừa số và Số vô tỉ"
      description="Công cụ phân tích thừa số nguyên tố, tính GCD/LCM và khám phá số vô tỉ."
      tabs={renderTabs()}
    >
      {renderTabContent()}
    </DashboardPageWithTabsLayout>
  );
}
