'use client';

import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';
import {
  getWorkspaceParam,
  createUrlWithWorkspace,
  preserveWorkspaceParam,
} from 'src/routes/utils';

// ----------------------------------------------------------------------

/**
 * Hook to manage workspace parameter preservation across navigation
 */
export function useWorkspaceParam() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current workspace parameter
  const currentWorkspace = getWorkspaceParam(searchParams);

  // Navigate to a path while preserving workspace parameter
  const navigateWithWorkspace = useCallback(
    (path: string, additionalParams?: Record<string, string>) => {
      const url = createUrlWithWorkspace(path, currentWorkspace, additionalParams);
      router.push(url);
    },
    [router, currentWorkspace]
  );

  // Replace current path while preserving workspace parameter
  const replaceWithWorkspace = useCallback(
    (path: string, additionalParams?: Record<string, string>) => {
      const url = createUrlWithWorkspace(path, currentWorkspace, additionalParams);
      router.replace(url);
    },
    [router, currentWorkspace]
  );

  // Preserve workspace parameter when redirecting to a URL
  const preserveWorkspaceInUrl = useCallback(
    (targetUrl: string) => preserveWorkspaceParam(searchParams, targetUrl),
    [searchParams]
  );

  return {
    currentWorkspace,
    navigateWithWorkspace,
    replaceWithWorkspace,
    preserveWorkspaceInUrl,
  };
}
