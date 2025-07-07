// ----------------------------------------------------------------------

/**
 * Preserve workspace parameter in URL
 * @param currentUrl - Current URL or search params
 * @param targetUrl - Target URL to redirect to
 * @returns URL with preserved workspace parameter
 */
export function preserveWorkspaceParam(currentUrl: string | URLSearchParams, targetUrl: string): string {
  const currentParams = typeof currentUrl === 'string' 
    ? new URLSearchParams(currentUrl) 
    : currentUrl;
  
  const workspaceParam = currentParams.get('workspace');
  
  if (!workspaceParam) {
    return targetUrl;
  }
  
  const url = new URL(targetUrl, window.location.origin);
  url.searchParams.set('workspace', workspaceParam);
  
  return url.pathname + url.search;
}

/**
 * Get workspace parameter from URL or return default
 * @param searchParams - URL search params
 * @param defaultWorkspace - Default workspace value
 * @returns Workspace parameter value
 */
export function getWorkspaceParam(searchParams: URLSearchParams, defaultWorkspace: string = 'all-tools'): string {
  return searchParams.get('workspace') || defaultWorkspace;
}

/**
 * Create URL with workspace parameter
 * @param basePath - Base path
 * @param workspace - Workspace value
 * @param additionalParams - Additional query parameters
 * @returns Complete URL with workspace parameter
 */
export function createUrlWithWorkspace(
  basePath: string, 
  workspace: string, 
  additionalParams?: Record<string, string>
): string {
  const params = new URLSearchParams(additionalParams);
  
  // If workspace is not 'all-tools', add it to the URL
  if (workspace !== 'all-tools') {
    params.set('workspace', workspace);
  }
  
  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}
