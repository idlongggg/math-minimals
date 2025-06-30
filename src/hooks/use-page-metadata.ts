'use client';

import type { PageMetadata } from 'src/constants/page-metadata';

import { useMemo } from 'react';

import { getPageMetadata } from 'src/constants/page-metadata';

// ----------------------------------------------------------------------

/**
 * Hook to get page metadata
 */
export function usePageMetadata(key: string): PageMetadata {
  return useMemo(() => getPageMetadata(key), [key]);
}

/**
 * Hook to get page title and description
 */
export function usePageInfo(key: string): { title: string; description: string } {
  return useMemo(() => {
    const metadata = getPageMetadata(key);
    return {
      title: metadata.title,
      description: metadata.description,
    };
  }, [key]);
}
