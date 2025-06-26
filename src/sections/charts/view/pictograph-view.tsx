'use client';

import { Icon } from '@iconify/react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { PictographChart, type PictographData } from 'src/components/pictograph-chart';

// Sample data sets
const sampleDataSets = {
  fruits: [
    { category: 'Táo', value: 25, icon: '🍎', color: '#ef4444' },
    { category: 'Chuối', value: 20, icon: '🍌', color: '#f59e0b' },
    { category: 'Cam', value: 15, icon: '🍊', color: '#f97316' },
    { category: 'Nho', value: 30, icon: '🍇', color: '#8b5cf6' },
  ] as PictographData[],
  vehicles: [
    { category: 'Xe hơi', value: 45, icon: '🚗', color: '#3b82f6' },
    { category: 'Xe máy', value: 80, icon: '🏍️', color: '#ef4444' },
    { category: 'Xe đạp', value: 35, icon: '🚲', color: '#10b981' },
    { category: 'Xe buýt', value: 12, icon: '🚌', color: '#f59e0b' },
  ] as PictographData[],
  animals: [
    { category: 'Chó', value: 28, icon: '🐕', color: '#8b4513' },
    { category: 'Mèo', value: 22, icon: '🐱', color: '#6b7280' },
    { category: 'Thỏ', value: 15, icon: '🐰', color: '#ec4899' },
    { category: 'Cá', value: 35, icon: '🐟', color: '#06b6d4' },
  ] as PictographData[],
  sports: [
    { category: 'Bóng đá', value: 40, icon: '⚽', color: '#22c55e' },
    { category: 'Bóng rổ', value: 25, icon: '🏀', color: '#f97316' },
    { category: 'Bóng chuyền', value: 18, icon: '🏐', color: '#3b82f6' },
    { category: 'Tennis', value: 12, icon: '🎾', color: '#eab308' },
  ] as PictographData[],
};

const availableIcons = [
  '🍎', '🍌', '🍊', '🍇', '🥝', '🍓', '🥭', '🍑',
  '🚗', '🏍️', '🚲', '🚌', '✈️', '🚢', '🚁', '🚂',
  '🐕', '🐱', '🐰', '🐟', '🐦', '🐸', '🐘', '🦁',
  '⚽', '🏀', '🏐', '🎾', '🏓', '🏸', '🥎', '🏈',
  '👨', '👩', '👶', '👴', '👵', '👦', '👧', '🧑‍💼',
  '📚', '✏️', '🖊️', '📝', '💻', '📱', '⌚', '🖥️',
  '🏠', '🏢', '🏪', '🏫', '🏥', '🏦', '🏨', '⛪',
  '🌞', '☁️', '🌧️', '❄️', '⚡', '🌈', '🌙', '⭐'
];

const colors = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#c084fc', '#d946ef', '#ec4899', '#f43f5e'
];

export function PictographView() {
  const [selectedDataSet, setSelectedDataSet] = useState<keyof typeof sampleDataSets>('fruits');
  const [customData, setCustomData] = useState<PictographData[]>([
    { category: 'Danh mục A', value: 10, icon: '🔵', color: '#3b82f6' }
  ]);
  const [useCustomData, setUseCustomData] = useState(false);
  const [unitValue, setUnitValue] = useState(5);
  const [maxIconsPerRow, setMaxIconsPerRow] = useState(10);
  const [iconSize, setIconSize] = useState(40);

  const currentData = useCustomData ? customData : sampleDataSets[selectedDataSet];

  const addCustomCategory = () => {
    const newCategory: PictographData = {
      category: `Danh mục ${String.fromCharCode(65 + customData.length)}`,
      value: 5,
      icon: availableIcons[Math.floor(Math.random() * availableIcons.length)],
      color: colors[customData.length % colors.length]
    };
    setCustomData([...customData, newCategory]);
  };

  const updateCustomCategory = (index: number, field: keyof PictographData, value: any) => {
    const updated = [...customData];
    updated[index] = { ...updated[index], [field]: value };
    setCustomData(updated);
  };

  const removeCustomCategory = (index: number) => {
    setCustomData(customData.filter((_, i) => i !== index));
  };

  const resetData = () => {
    setCustomData([
      { category: 'Danh mục A', value: 10, icon: '🔵', color: '#3b82f6' }
    ]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Biểu đồ tranh (Pictograph)
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Biểu đồ tranh sử dụng biểu tượng để hiển thị dữ liệu một cách trực quan và dễ hiểu. 
        Mỗi biểu tượng đại diện cho một giá trị nhất định.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        {/* Controls Panel */}
        <Box>
          <Card>
            <CardHeader title="Điều khiển biểu đồ" />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Button
                  variant={!useCustomData ? 'contained' : 'outlined'}
                  onClick={() => setUseCustomData(false)}
                  size="small"
                >
                  Mẫu có sẵn
                </Button>
                <Button
                  variant={useCustomData ? 'contained' : 'outlined'}
                  onClick={() => setUseCustomData(true)}
                  size="small"
                >
                  Tự tạo
                </Button>
              </Box>

              {!useCustomData ? (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Chọn bộ dữ liệu</InputLabel>
                  <Select
                    value={selectedDataSet}
                    label="Chọn bộ dữ liệu"
                    onChange={(e) => setSelectedDataSet(e.target.value as keyof typeof sampleDataSets)}
                  >
                    <MenuItem value="fruits">🍎 Trái cây</MenuItem>
                    <MenuItem value="vehicles">🚗 Phương tiện</MenuItem>
                    <MenuItem value="animals">🐕 Động vật</MenuItem>
                    <MenuItem value="sports">⚽ Thể thao</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="subtitle2">Dữ liệu tùy chỉnh</Typography>
                    <IconButton size="small" onClick={addCustomCategory} color="primary">
                      <Icon icon="material-symbols:add" />
                    </IconButton>
                    <IconButton size="small" onClick={resetData} color="warning">
                      <Icon icon="material-symbols:refresh" />
                    </IconButton>
                  </Box>
                  
                  {customData.map((item, index) => (
                    <Card key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <TextField
                          size="small"
                          label="Tên danh mục"
                          value={item.category}
                          onChange={(e) => updateCustomCategory(index, 'category', e.target.value)}
                          sx={{ flex: 1 }}
                        />
                        <IconButton 
                          size="small" 
                          onClick={() => removeCustomCategory(index)}
                          color="error"
                          disabled={customData.length <= 1}
                        >
                          <Icon icon="material-symbols:delete" />
                        </IconButton>
                      </Box>
                      
                      <TextField
                        size="small"
                        label="Giá trị"
                        type="number"
                        value={item.value}
                        onChange={(e) => updateCustomCategory(index, 'value', Number(e.target.value))}
                        sx={{ mb: 1, width: '100%' }}
                      />
                      
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <FormControl size="small" sx={{ flex: 1 }}>
                          <InputLabel>Biểu tượng</InputLabel>
                          <Select
                            value={item.icon}
                            label="Biểu tượng"
                            onChange={(e) => updateCustomCategory(index, 'icon', e.target.value)}
                          >
                            {availableIcons.map((icon) => (
                              <MenuItem key={icon} value={icon}>
                                {icon} {icon}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        
                        <FormControl size="small" sx={{ flex: 1 }}>
                          <InputLabel>Màu sắc</InputLabel>
                          <Select
                            value={item.color}
                            label="Màu sắc"
                            onChange={(e) => updateCustomCategory(index, 'color', e.target.value)}
                          >
                            {colors.map((color) => (
                              <MenuItem key={color} value={color}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Box 
                                    sx={{ 
                                      width: 16, 
                                      height: 16, 
                                      bgcolor: color, 
                                      borderRadius: '50%' 
                                    }} 
                                  />
                                  {color}
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Card>
                  ))}
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Giá trị mỗi biểu tượng: {unitValue}
                </Typography>
                <Slider
                  value={unitValue}
                  onChange={(_, value) => setUnitValue(value as number)}
                  min={1}
                  max={20}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Số biểu tượng tối đa mỗi hàng: {maxIconsPerRow}
                </Typography>
                <Slider
                  value={maxIconsPerRow}
                  onChange={(_, value) => setMaxIconsPerRow(value as number)}
                  min={5}
                  max={20}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Kích thước biểu tượng: {iconSize}px
                </Typography>
                <Slider
                  value={iconSize}
                  onChange={(_, value) => setIconSize(value as number)}
                  min={20}
                  max={60}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Chart Display */}
        <Box>
          <PictographChart
            title={useCustomData ? 'Biểu đồ tranh tùy chỉnh' : `Biểu đồ ${
              selectedDataSet === 'fruits' ? 'trái cây' :
              selectedDataSet === 'vehicles' ? 'phương tiện' :
              selectedDataSet === 'animals' ? 'động vật' : 'thể thao'
            }`}
            data={currentData}
            unitValue={unitValue}
            maxIconsPerRow={maxIconsPerRow}
            iconSize={iconSize}
            showLegend={true}
            showValues={true}
          />
        </Box>
      </Box>

      {/* Data Summary */}
      <Box sx={{ mt: 3 }}>
          <Card>
            <CardHeader title="Tóm tắt dữ liệu" />
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {currentData.map((item) => (
                  <Chip
                    key={item.category}
                    label={`${item.category}: ${item.value}`}
                    sx={{ 
                      bgcolor: item.color + '20',
                      color: item.color,
                      border: `1px solid ${item.color}40`
                    }}
                    icon={<span style={{ fontSize: 16 }}>{item.icon}</span>}
                  />
                ))}
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tổng cộng: {currentData.reduce((sum, item) => sum + item.value, 0)} đơn vị
                {' • '}
                Tổng số biểu tượng: {Math.ceil(currentData.reduce((sum, item) => sum + item.value, 0) / unitValue)}
                {' • '}
                Trung bình mỗi danh mục: {Math.round(currentData.reduce((sum, item) => sum + item.value, 0) / currentData.length * 10) / 10}
              </Typography>
            </CardContent>
          </Card>
        </Box>
    </Box>
  );
}
