import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { FlagIcon, SlideTextSparkleIcon } from 'src/assets/icons';

const FeatureItem = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.secondary,
  listStyle: 'none',
}));

const features = [
  {
    icon: <FlagIcon color="primary" fontSize="small" />,
    label: 'Thể hiện rõ xu hướng, biến động của dữ liệu theo thời gian.',
  },
  {
    icon: <FlagIcon color="primary" fontSize="small" />,
    label: 'Phù hợp với dữ liệu liên tục, chuỗi thời gian (time series).',
  },
  {
    icon: <FlagIcon color="primary" fontSize="small" />,
    label: 'Có thể so sánh nhiều tập dữ liệu trên cùng một biểu đồ.',
  },
  {
    icon: <FlagIcon color="primary" fontSize="small" />,
    label: 'Dễ nhận biết các điểm cực trị, điểm giao nhau giữa các đường.',
  },
];

export default function OverviewTab() {
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <SlideTextSparkleIcon fontSize="large" />
        <Typography variant="h5" fontWeight={700}>
          Tổng quan về Biểu đồ Đường (Line Chart)
        </Typography>
      </Stack>
      <Typography variant="body1" mb={2}>
        Biểu đồ đường (Line Chart) là một loại biểu đồ trực quan hóa dữ liệu giúp hiển thị xu hướng,
        sự thay đổi của dữ liệu liên tục theo thời gian hoặc thứ tự. Các điểm dữ liệu được nối với
        nhau bằng các đoạn thẳng, giúp dễ dàng quan sát sự tăng giảm hoặc biến động của dữ liệu.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Đặc điểm nổi bật
      </Typography>
      <ul style={{ margin: 0, paddingLeft: 0 }}>
        {features.map((item, idx) => (
          <FeatureItem key={idx}>
            {item.icon}
            {item.label}
          </FeatureItem>
        ))}
      </ul>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Ứng dụng thực tiễn
      </Typography>
      <Typography variant="body2" color="text.secondary" fontStyle="italic">
        Biểu đồ đường thường được sử dụng trong phân tích tài chính, thống kê, theo dõi số liệu kinh
        doanh, khoa học, kỹ thuật và nhiều lĩnh vực khác để minh họa sự thay đổi của dữ liệu theo
        thời gian. Ngoài ra, nó còn giúp phát hiện các xu hướng, chu kỳ, điểm bất thường hoặc dự báo
        tương lai dựa trên dữ liệu lịch sử.
      </Typography>
    </>
  );
}
