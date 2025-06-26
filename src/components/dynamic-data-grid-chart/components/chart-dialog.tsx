import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    Typography
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

interface ChartDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  chartId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  yAxisColumns: string[];
}

export function ChartDialog({
  open,
  onClose,
  title,
  chartId,
  containerRef,
  yAxisColumns,
}: ChartDialogProps) {
  return (
    <Dialog 
      fullScreen 
      open={open} 
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: 'background.default',
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        p: 2
      }}>
        {/* Dialog Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h4">
            {title}
          </Typography>
          <Button
            onClick={onClose}
            startIcon={<Iconify icon="solar:quit-full-screen-square-outline" />}
            variant="outlined"
          >
            Đóng
          </Button>
        </Box>

        {/* Chart Content */}
        <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {yAxisColumns.length === 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                Vui lòng chọn ít nhất một cột cho trục Y từ panel điều khiển để hiển thị biểu đồ.
              </Alert>
            ) : (
              <Box
                ref={containerRef}
                sx={{
                  width: '100%',
                  flex: 1,
                  minHeight: 500,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                }}
              >
                <div id={chartId} style={{ width: '100%', height: '100%' }} />
              </Box>
            )}
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              💡 Mẹo: Sử dụng chuột để phóng to/thu nhỏ và kéo để di chuyển biểu đồ. 
              Bạn có thể thêm cột mới và chọn nhiều cột cho trục Y để so sánh dữ liệu.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Dialog>
  );
}
