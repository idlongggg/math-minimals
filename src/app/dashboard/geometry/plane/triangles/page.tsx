'use client';

import { Card, CardContent } from '@mui/material';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { TriangleGeometryView } from 'src/sections/geometry/plane/triangles';

export default function TrianglesPlaneGeometryPage() {
    return (
        <PageLayout pageKey="geometry.plane.triangles">
            <Card>
                <CardContent>
                    <TriangleGeometryView />
                </CardContent>
            </Card>
        </PageLayout>
    );
}
