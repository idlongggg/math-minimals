'use client';

import { Card, CardContent } from '@mui/material';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { CircleGeometryView } from 'src/sections/geometry/plane/circles';

export default function CirclesPlaneGeometryPage() {
    return (
        <PageLayout pageKey="geometry.plane.circles">
            <Card>
                <CardContent>
                    <CircleGeometryView />
                </CardContent>
            </Card>
        </PageLayout>
    );
}
