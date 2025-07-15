import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function DemoPage() {
    // Auto redirect to Demo 01 when accessing /dashboard/demo/
    redirect(paths.dashboard.demo.demo01);
}
