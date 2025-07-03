'use client';

import 'katex/dist/katex.min.css';

import { useCallback, useState } from 'react';

import Tab from '@mui/material/Tab';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayout } from 'src/components/dashboard-page-layout';

import { DivisorsTab, GcdLcmTab, MultiplesTab } from './divisors-multiples';
import { useHistory } from './divisors-multiples/hooks';

/**
 * Component chính cho trang Ước số và Bội số
 * Đã được refactor để tách thành các components và hooks riêng biệt
 */
export function DivisorsMultiplesView() {
  const [currentTab, setCurrentTab] = useState('divisors');
  const { history, addToHistory, clearHistory } = useHistory();

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab value="divisors" label="Ước số" />
      <Tab value="multiples" label="Bội số" />
      <Tab value="gcd-lcm" label="GCD & LCM" />
      <Tab value="history" label={`Lịch sử (${history.length})`} />
    </CustomTabs>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 'divisors':
        return <DivisorsTab onAddToHistory={addToHistory} />;
      case 'multiples':
        return <MultiplesTab onAddToHistory={addToHistory} />;
      case 'gcd-lcm':
        return <GcdLcmTab onAddToHistory={addToHistory} />;
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
                    <strong>{item.type}</strong> - {item.timestamp.toLocaleString()}
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
      title="Ước số và Bội số"
      description="Công cụ tìm ước số, bội số và tính GCD/LCM với các thuật toán hiệu quả."
      tabs={renderTabs()}
    >
      {renderTabContent()}
    </DashboardPageWithTabsLayout>
  );
}
