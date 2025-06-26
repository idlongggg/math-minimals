'use client';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { DashboardPageLayout } from 'src/components/dashboard-page-layout';
import { DynamicLineChart, type DataSeries } from 'src/components/dynamic-line-chart';
import { Iconify } from 'src/components/iconify';

// Sample data sets
const sampleDataSets = {
  sales: [
    {
      id: '1',
      name: 'Doanh số Q1',
      color: '#3b82f6',
      visible: true,
      points: [
        { x: 1, y: 100 },
        { x: 2, y: 150 },
        { x: 3, y: 120 },
        { x: 4, y: 180 },
        { x: 5, y: 200 },
        { x: 6, y: 250 }
      ]
    },
    {
      id: '2',
      name: 'Doanh số Q2',
      color: '#ef4444',
      visible: true,
      points: [
        { x: 1, y: 80 },
        { x: 2, y: 130 },
        { x: 3, y: 160 },
        { x: 4, y: 140 },
        { x: 5, y: 220 },
        { x: 6, y: 280 }
      ]
    }
  ],
  temperature: [
    {
      id: '1',
      name: 'Nhiệt độ Hà Nội',
      color: '#10b981',
      visible: true,
      points: [
        { x: 1, y: 15 },
        { x: 2, y: 18 },
        { x: 3, y: 22 },
        { x: 4, y: 28 },
        { x: 5, y: 32 },
        { x: 6, y: 35 },
        { x: 7, y: 38 },
        { x: 8, y: 36 },
        { x: 9, y: 30 },
        { x: 10, y: 25 },
        { x: 11, y: 20 },
        { x: 12, y: 16 }
      ]
    },
    {
      id: '2',
      name: 'Nhiệt độ TP.HCM',
      color: '#f59e0b',
      visible: true,
      points: [
        { x: 1, y: 26 },
        { x: 2, y: 28 },
        { x: 3, y: 30 },
        { x: 4, y: 32 },
        { x: 5, y: 33 },
        { x: 6, y: 32 },
        { x: 7, y: 31 },
        { x: 8, y: 31 },
        { x: 9, y: 30 },
        { x: 10, y: 29 },
        { x: 11, y: 28 },
        { x: 12, y: 27 }
      ]
    }
  ],
  math_scores: [
    {
      id: '1',
      name: 'Lớp 10A',
      color: '#8b5cf6',
      visible: true,
      points: [
        { x: 1, y: 7.2 },
        { x: 2, y: 7.8 },
        { x: 3, y: 8.1 },
        { x: 4, y: 8.3 },
        { x: 5, y: 8.7 },
        { x: 6, y: 8.9 }
      ]
    },
    {
      id: '2',
      name: 'Lớp 10B',
      color: '#ec4899',
      visible: true,
      points: [
        { x: 1, y: 6.8 },
        { x: 2, y: 7.1 },
        { x: 3, y: 7.5 },
        { x: 4, y: 7.9 },
        { x: 5, y: 8.2 },
        { x: 6, y: 8.5 }
      ]
    },
    {
      id: '3',
      name: 'Lớp 10C',
      color: '#06b6d4',
      visible: true,
      points: [
        { x: 1, y: 7.0 },
        { x: 2, y: 7.4 },
        { x: 3, y: 7.7 },
        { x: 4, y: 8.0 },
        { x: 5, y: 8.4 },
        { x: 6, y: 8.8 }
      ]
    }
  ]
};

export function DynamicLineChartView() {
  const [selectedDataSet, setSelectedDataSet] = useState<keyof typeof sampleDataSets | 'custom'>('custom');
  const [currentData, setCurrentData] = useState<DataSeries[]>([]);

  const loadSampleData = (dataSetKey: keyof typeof sampleDataSets) => {
    setCurrentData(sampleDataSets[dataSetKey]);
    setSelectedDataSet(dataSetKey);
  };

  const startFresh = () => {
    setCurrentData([]);
    setSelectedDataSet('custom');
  };

  return (
    <DashboardPageLayout
      title="Biểu đồ đường tương tác"
      description="Tạo biểu đồ đường từ bảng dữ liệu động sử dụng JSXGraph. Bạn có thể thêm, sửa, xóa dữ liệu và xem biểu đồ cập nhật trong thời gian thực."
    >
      {/* Instructions */}
      <Card sx={{ mb: 3 }}>
        <CardHeader 
          title="Hướng dẫn sử dụng"
          action={
            <Iconify icon="solar:info-circle-bold" width={24} />
          }
        />
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                📊 Quản lý dữ liệu
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Tạo nhiều chuỗi dữ liệu
                <br />
                • Thêm/xóa điểm dữ liệu
                <br />
                • Chỉnh sửa trực tiếp trong bảng
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                🎨 Tùy chỉnh hiển thị
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Đổi tên chuỗi dữ liệu
                <br />
                • Ẩn/hiện từng chuỗi
                <br />
                • Màu sắc tự động
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                🖱️ Tương tác biểu đồ
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Zoom bằng chuột
                <br />
                • Kéo để di chuyển
                <br />
                • Điều hướng JSXGraph
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Sample Data & Controls */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Dữ liệu mẫu" />
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Button
              variant={selectedDataSet === 'sales' ? 'contained' : 'outlined'}
              onClick={() => loadSampleData('sales')}
              startIcon={<Iconify icon="solar:chart-square-outline" />}
            >
              Doanh số bán hàng
            </Button>
            <Button
              variant={selectedDataSet === 'temperature' ? 'contained' : 'outlined'}
              onClick={() => loadSampleData('temperature')}
              startIcon={<Iconify icon="solar:widget-outline" />}
            >
              Nhiệt độ theo tháng
            </Button>
            <Button
              variant={selectedDataSet === 'math_scores' ? 'contained' : 'outlined'}
              onClick={() => loadSampleData('math_scores')}
              startIcon={<Iconify icon="solar:document-outline" />}
            >
              Điểm toán học
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button
              variant={selectedDataSet === 'custom' ? 'contained' : 'outlined'}
              onClick={startFresh}
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              color="success"
            >
              Tạo mới
            </Button>
          </Box>

          {selectedDataSet !== 'custom' && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Bạn đang xem dữ liệu mẫu "{
                selectedDataSet === 'sales' ? 'Doanh số bán hàng' :
                selectedDataSet === 'temperature' ? 'Nhiệt độ theo tháng' :
                'Điểm toán học'
              }". Có thể chỉnh sửa dữ liệu hoặc tạo mới.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Main Chart */}
      <DynamicLineChart
        id="dynamic-line-chart-main"
        width={800}
        height={500}
        title={
          selectedDataSet === 'sales' ? 'Biểu đồ doanh số bán hàng theo tháng' :
          selectedDataSet === 'temperature' ? 'Biểu đồ nhiệt độ trung bình theo tháng' :
          selectedDataSet === 'math_scores' ? 'Biểu đồ điểm toán học theo kỳ thi' :
          'Biểu đồ đường tùy chỉnh'
        }
        initialSeries={currentData}
      />

      {/* Additional Information */}
      <Box sx={{ mt: 3 }}>
        <Accordion>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-downward-fill" />}>
            <Typography variant="h6">Thông tin chi tiết về JSXGraph</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Tính năng của JSXGraph:
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  • Biểu đồ tương tác chất lượng cao
                  <br />
                  • Zoom và pan mượt mà
                  <br />
                  • Hiển thị toán học chính xác
                  <br />
                  • Hỗ trợ nhiều loại đồ thị
                  <br />
                  • Responsive trên mọi thiết bị
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Cách sử dụng hiệu quả:
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  • Nhập dữ liệu theo thứ tự X tăng dần
                  <br />
                  • Sử dụng tên mô tả cho các chuỗi
                  <br />
                  • Ẩn chuỗi không cần thiết để tập trung
                  <br />
                  • Xóa điểm lỗi trước khi phân tích
                  <br />
                  • Lưu dữ liệu quan trọng ra file
                </Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </DashboardPageLayout>
  );
}
