'use client';

import { useCallback, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CustomTabs } from 'src/components/custom-tabs';
import { DashboardPageWithTabsLayoutAndMetadata } from 'src/components/dashboard-page-layout';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function DemoArithmeticView() {
  const [currentTab, setCurrentTab] = useState('tab1');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleCalculate = useCallback(() => {
    setResult(`Kết quả cho ${input}: ${Math.random() * 100}`);
  }, [input]);

  const renderTabs = () => (
    <CustomTabs value={currentTab} onChange={handleTabChange}>
      <Tab
        value="tab1"
        label="Tab 1"
        icon={<Iconify icon="solar:shield-check-bold" />}
      />
      <Tab
        value="tab2"
        label="Tab 2"
        icon={<Iconify icon="solar:list-bold" />}
      />
      <Tab
        value="tab3"
        label="Tab 3"
        icon={<Iconify icon="solar:notebook-bold-duotone" />}
      />
    </CustomTabs>
  );

  const renderTab1 = () => (
    <Card>
      <CardHeader title="Công cụ tính toán" />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Nhập giá trị"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleCalculate}>
            Tính toán
          </Button>
          {result && (
            <Alert severity="success">
              {result}
            </Alert>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  const renderTab2 = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <Card key={item}>
          <CardContent>
            <Typography variant="h6">Item {item}</Typography>
            <Typography>
              Đây là nội dung của item {item}. Nội dung này được tạo để test khả năng scroll
              của layout. Title và description phía trên sẽ được cố định, còn phần này sẽ scroll.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderTab3 = () => (
    <Card>
      <CardHeader title="Hướng dẫn sử dụng" />
      <CardContent>
        <Typography variant="body1" paragraph>
          Layout này đã được thiết kế để:
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body2" paragraph>
            Title và description được cố định ở đầu trang, không bị scroll
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            Tabs được cố định ngay dưới title/description
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            Chỉ nội dung của tab hiện tại được scroll
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            Metadata được quản lý tập trung trong file constants/page-metadata.ts
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <DashboardPageWithTabsLayoutAndMetadata 
      pageKey="arithmetic.primeNumbers"
      tabs={renderTabs()}
    >
      {currentTab === 'tab1' && renderTab1()}
      {currentTab === 'tab2' && renderTab2()}
      {currentTab === 'tab3' && renderTab3()}
    </DashboardPageWithTabsLayoutAndMetadata>
  );
}
