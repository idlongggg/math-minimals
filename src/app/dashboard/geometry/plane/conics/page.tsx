'use client';

import { Card, CardContent } from '@mui/material';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { ConicGeometryView } from 'src/sections/geometry/plane/conics';

export default function ConicsPlaneGeometryPage() {
    return (
        <PageLayout pageKey="geometry.plane.conics">
            <Card>
                <CardContent>
                    <ConicGeometryView />
                </CardContent>
            </Card>
        </PageLayout>
    );
}
