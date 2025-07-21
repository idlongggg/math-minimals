'use client';

import { Card, CardContent } from '@mui/material';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { PointsSegmentsPlaneGeometryView } from 'src/sections/geometry/plane/points-segments/page-view';

export default function PointsSegmentsPlaneGeometryPage() {
    return (
        <PageLayout pageKey="geometry.plane.points-segments">
            <Card>
                <CardContent>
                    <PointsSegmentsPlaneGeometryView />
                </CardContent>
            </Card>
        </PageLayout>
    );
}
