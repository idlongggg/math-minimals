import type { Metadata } from 'next';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { Demo02View } from 'src/sections/demo';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: 'Demo 02' };

export default function Demo02Page() {
  return (
    <PageLayout pageKey="demo02">
      <Demo02View />
    </PageLayout>
  );
}
