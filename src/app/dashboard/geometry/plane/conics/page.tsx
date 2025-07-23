'use client';

import { Card, CardContent } from '@mui/material';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { ConicSectionView } from 'src/sections/geometry/plane/conics';

export default function ConicsPlaneGeometryPage() {
    return (
        <PageLayout pageKey="geometry.plane.conics">
            <Card>
                <CardContent>
                    <ConicSectionView />
                </CardContent>
            </Card>
        </PageLayout>
    );
}
