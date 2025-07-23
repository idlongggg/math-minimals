'use client';

import { Card, CardContent } from '@mui/material';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { AngleGeometryView } from 'src/sections/geometry/plane/angles';

export default function AnglesPlaneGeometryPage() {
    return (
        <PageLayout pageKey="geometry.plane.angles">
            <Card>
                <CardContent>
                    <AngleGeometryView />
                </CardContent>
            </Card>
        </PageLayout>
    );
}
