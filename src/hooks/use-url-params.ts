'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export function useUrlParams() {
  const searchParams = useSearchParams();

  const urlParams = useMemo(() => {
    // Đọc hideMenu parameter từ URL
    const hideMenuParam = searchParams.get('hideMenu');
    const hideMenu = hideMenuParam === 'true' || hideMenuParam === '1';

    // Đọc hideAvatar parameter từ URL
    const hideAvatarParam = searchParams.get('hideAvatar');
    const hideAvatar = hideAvatarParam === 'true' || hideAvatarParam === '1';

    return {
      hideMenu: hideMenuParam !== null ? hideMenu : undefined,
      hideAvatar: hideAvatarParam !== null ? hideAvatar : undefined,
    };
  }, [searchParams]);

  return urlParams;
}
