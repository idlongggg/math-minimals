import type { Metadata } from 'next';

import { PageLayout } from 'src/layouts/dashboard/page-layout';

import { Demo01View } from 'src/sections/demo-01';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: 'Demo 01' };

export default function Demo01Page() {
  return (
    <PageLayout pageKey="demo01">
      <Demo01View />
    </PageLayout>
  );
}
