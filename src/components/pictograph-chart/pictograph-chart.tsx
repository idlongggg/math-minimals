'use client';

import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useState } from 'react';

export interface PictographData {
  category: string;
  value: number;
  icon: string;
  color: string;
}

export interface PictographChartProps {
  title?: string;
  data: PictographData[];
  unitValue?: number;
  maxIconsPerRow?: number;
  iconSize?: number;
  showLegend?: boolean;
  showValues?: boolean;
}

export function PictographChart({
  title = "Biểu đồ tranh",
  data,
  unitValue = 1,
  maxIconsPerRow = 10,
  iconSize = 40,
  showLegend = true,
  showValues = true
}: PictographChartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const renderIcons = (category: PictographData) => {
    const numberOfIcons = Math.ceil(category.value / unitValue);
    const icons = [];

    for (let i = 0; i < numberOfIcons; i++) {
      const isPartial = i === numberOfIcons - 1 && category.value % unitValue !== 0;
      const opacity = isPartial ? (category.value % unitValue) / unitValue : 1;

      icons.push(
        <Box
          key={`${category.category}-${i}`}
          sx={{
            width: iconSize,
            height: iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: iconSize * 0.7,
            color: category.color,
            opacity: hoveredCategory && hoveredCategory !== category.category ? 0.3 : opacity,
            transition: 'opacity 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s ease'
            }
          }}
          onMouseEnter={() => setHoveredCategory(category.category)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {category.icon}
        </Box>
      );
    }

    return icons;
  };

  const renderCategoryRow = (category: PictographData) => {
    const icons = renderIcons(category);
    const rows = [];
    
    for (let i = 0; i < icons.length; i += maxIconsPerRow) {
      const rowIcons = icons.slice(i, i + maxIconsPerRow);
      rows.push(
        <Box
          key={`row-${i}`}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 1
          }}
        >
          {rowIcons}
        </Box>
      );
    }

    return rows;
  };

  return (
    <Card>
      <CardHeader 
        title={title}
        subheader={`Mỗi biểu tượng đại diện cho ${unitValue} đơn vị`}
      />
      <CardContent>
        <Box sx={{ mb: 3 }}>
          {data.map((category) => (
            <Box key={category.category} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: category.color, mr: 2 }}>
                  {category.category}
                </Typography>
                {showValues && (
                  <Typography variant="body2" color="text.secondary">
                    ({category.value} đơn vị)
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ ml: 2 }}>
                {renderCategoryRow(category)}
              </Box>
            </Box>
          ))}
        </Box>

        {showLegend && (
          <Card variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="subtitle2" gutterBottom>
              Chú giải:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {data.map((category) => (
                <Box 
                  key={category.category}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: hoveredCategory === category.category ? 'action.hover' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setHoveredCategory(category.category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Box 
                    sx={{ 
                      fontSize: 20, 
                      color: category.color,
                      transition: 'transform 0.2s ease',
                      transform: hoveredCategory === category.category ? 'scale(1.2)' : 'scale(1)'
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography variant="body2">
                    {category.category}: {category.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
