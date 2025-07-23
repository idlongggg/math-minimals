'use client';

import { Card, CardContent } from '@mui/material';

import { PageLayout } from 'src/layouts/dashboard/page-layout';
import { LinesPlaneGeometryView } from 'src/sections/geometry/plane/lines';


export default function LinesPlaneGeometryPage() {
    return (
        <PageLayout pageKey="geometry.plane.lines">
            <Card>
                <CardContent>
                    <LinesPlaneGeometryView />
                </CardContent>
            </Card>
        </PageLayout>
    );
}
