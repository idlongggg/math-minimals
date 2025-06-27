'use client';

import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { DashboardPageLayoutWithMetadata } from 'src/components/dashboard-page-layout';

// ----------------------------------------------------------------------

export function DemoSimpleView() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleAddResult = () => {
    if (input.trim()) {
      setResults(prev => [...prev, `Kết quả ${prev.length + 1}: ${input} = ${Math.random() * 100}`]);
      setInput('');
    }
  };

  return (
    <DashboardPageLayoutWithMetadata pageKey="tools.calculator">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Input Section */}
        <Card>
          <CardHeader title="Nhập dữ liệu" />
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                label="Nhập giá trị"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                fullWidth
                onKeyPress={(e) => e.key === 'Enter' && handleAddResult()}
              />
              <Button 
                variant="contained" 
                onClick={handleAddResult}
                sx={{ minWidth: 120 }}
              >
                Thêm
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Alert severity="info">
          Đây là demo layout không có tabs. Title và description được cố định ở đầu,
          phần nội dung này có thể scroll khi cần thiết.
        </Alert>

        {/* Results Section */}
        <Card>
          <CardHeader title={`Kết quả (${results.length})`} />
          <CardContent>
            {results.length === 0 ? (
              <Typography color="text.secondary">
                Chưa có kết quả nào. Hãy nhập giá trị và nhấn "Thêm".
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {results.map((result, index) => (
                  <Alert key={index} severity="success" variant="outlined">
                    {result}
                  </Alert>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Demo Content to Show Scrolling */}
        {results.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Demo Card {item}
                  </Typography>
                  <Typography>
                    Đây là nội dung demo để test khả năng scroll. Khi có nhiều nội dung,
                    phần title và description ở đầu trang sẽ vẫn cố định, chỉ phần này scroll.
                    Card này được tạo để mô phỏng nội dung dài.
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </DashboardPageLayoutWithMetadata>
  );
}
