
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { FlagIcon, SlideTextSparkleIcon } from 'src/assets/icons';
import { useLocales } from 'src/locales';

const FeatureItem = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.secondary,
  listStyle: 'none',
}));


const featuresKeys = [
  'feature1',
  'feature2',
  'feature3',
  'feature4',
];

export default function OverviewTab() {
  const { translate: t } = useLocales();
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <SlideTextSparkleIcon fontSize="large" />
        <Typography variant="h5" fontWeight={700}>
          {t('pages.statistics.charts.line.title')}
        </Typography>
      </Stack>
      <Typography variant="body1" mb={2}>
        {t('pages.statistics.charts.line.description')}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        {t('pages.statistics.charts.line.featureTitle')}
      </Typography>
      <ul style={{ margin: 0, paddingLeft: 0 }}>
        {featuresKeys.map((key, idx) => (
          <FeatureItem key={idx}>
            <FlagIcon color="primary" fontSize="small" />
            {t(`pages.statistics.charts.line.features.${key}`)}
          </FeatureItem>
        ))}
      </ul>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        {t('pages.statistics.charts.line.applicationTitle')}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontStyle="italic">
        {t('pages.statistics.charts.line.applicationDesc')}
      </Typography>
    </>
  );
}
