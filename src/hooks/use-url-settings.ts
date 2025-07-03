'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { useSettingsContext } from 'src/components/settings';

export function useUrlSettings() {
  const settings = useSettingsContext();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This hook is deprecated - implementation removed
    // Use useUrlParams() for reading URL parameters without caching
  }, [searchParams, settings]);

  return settings;
}
