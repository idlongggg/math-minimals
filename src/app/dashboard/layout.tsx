import { WorkspaceProvider } from 'src/contexts/workspace-context';
import { CONFIG } from 'src/global-config';
import { DashboardLayout } from 'src/layouts/dashboard';
import { _workspaces } from 'src/layouts/nav-config-workspace';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type DashboardLayoutProps = {
  children: React.ReactNode;
};

/**
 * Layout chính cho dashboard - Quản lý xác thực và workspace
 */
export default function DashboardLayoutWrapper({ children }: DashboardLayoutProps) {
  // Nếu skip auth trong development, không cần guard
  if (CONFIG.authentication.skipAuthForDevelopment) {
    return (
      <WorkspaceProvider workspaces={_workspaces}>
        <DashboardLayout>{children}</DashboardLayout>
      </WorkspaceProvider>
    );
  }

  // Áp dụng auth guard cho production
  return (
    <AuthGuard>
      <WorkspaceProvider workspaces={_workspaces}>
        <DashboardLayout>{children}</DashboardLayout>
      </WorkspaceProvider>
    </AuthGuard>
  );
}
