'use client';

import { Card, CardContent } from '@mui/material';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { QuadrilateralGeometryView } from 'src/sections/geometry/plane/quadrilaterals';

export default function QuadrilateralsPlaneGeometryPage() {
    return (
        <PageLayout pageKey="geometry.plane.quadrilaterals">
            <Card>
                <CardContent>
                    <QuadrilateralGeometryView />
                </CardContent>
            </Card>
        </PageLayout>
    );
}
