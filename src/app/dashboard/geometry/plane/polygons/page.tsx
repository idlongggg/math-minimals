'use client';

import { Card, CardContent } from '@mui/material';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { PolygonGeometryView } from 'src/sections/geometry/plane/polygons';

export default function PolygonsPlaneGeometryPage() {
    return (
        <PageLayout pageKey="geometry.plane.polygons">
            <Card>
                <CardContent>
                    <PolygonGeometryView />
                </CardContent>
            </Card>
        </PageLayout>
    );
}
