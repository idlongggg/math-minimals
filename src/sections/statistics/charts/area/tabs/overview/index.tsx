import { styled } from '@mui/material/styles';
import { Stack, Divider, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
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

const featuresKeys = ['feature1', 'feature2', 'feature3', 'feature4'];

export function OverviewTab() {
    const { translate: t } = useLocales();

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <SlideTextSparkleIcon fontSize="large" />
                <Typography variant="h5" fontWeight={700}>
                    {t('pages.statistics.charts.area.overview.title')}
                </Typography>
            </Stack>
            <Typography variant="body1" mb={2}>
                {t('pages.statistics.charts.area.overview.description')}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                {t('pages.statistics.charts.area.overview.featuresTitle')}
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 0 }}>
                {featuresKeys.map((key, idx) => (
                    <FeatureItem key={idx}>
                        <FlagIcon color="primary" fontSize="small" />
                        {t(`pages.statistics.charts.area.overview.features.${key}`)}
                    </FeatureItem>
                ))}
            </ul>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                {t('pages.statistics.charts.area.overview.applicationTitle')}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
                {t('pages.statistics.charts.area.overview.applicationDesc')}
            </Typography>
        </>
    );
}
