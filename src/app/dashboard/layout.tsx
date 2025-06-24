import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';

import { WorkspaceProvider } from 'src/contexts/workspace-context';

import { AuthGuard } from 'src/auth/guard';

import { _workspaces } from 'src/layouts/nav-config-workspace';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return (
      <WorkspaceProvider workspaces={_workspaces}>
        <DashboardLayout>{children}</DashboardLayout>
      </WorkspaceProvider>
    );
  }

  return (
    <AuthGuard>
      <WorkspaceProvider workspaces={_workspaces}>
        <DashboardLayout>{children}</DashboardLayout>
      </WorkspaceProvider>
    </AuthGuard>
  );
}
