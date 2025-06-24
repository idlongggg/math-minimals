'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { WorkspacesPopoverProps } from 'src/layouts/components/workspaces-popover';

// ----------------------------------------------------------------------

type WorkspaceItem = NonNullable<WorkspacesPopoverProps['data']>[0];

type WorkspaceContextValue = {
  currentWorkspace: WorkspaceItem | null;
  setWorkspace: (workspace: WorkspaceItem | null) => void;
  isAllTools: boolean;
};

// ----------------------------------------------------------------------

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);

export function useWorkspaceContext() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaceContext must be used within WorkspaceProvider');
  }
  return context;
}

// ----------------------------------------------------------------------

type WorkspaceProviderProps = {
  children: React.ReactNode;
  workspaces: WorkspacesPopoverProps['data'];
};

export function WorkspaceProvider({ children, workspaces }: WorkspaceProviderProps) {
  // Mặc định là "Tất cả công cụ toán học" (null)
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceItem | null>(null);

  const setWorkspace = useCallback((workspace: WorkspaceItem | null) => {
    setCurrentWorkspace(workspace);
  }, []);

  const isAllTools = useMemo(() => currentWorkspace === null, [currentWorkspace]);

  const value = useMemo(
    () => ({
      currentWorkspace,
      setWorkspace,
      isAllTools,
    }),
    [currentWorkspace, setWorkspace, isAllTools]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}
