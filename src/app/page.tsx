'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

/**
 * Trang chủ ứng dụng - Tự động chuyển hướng đến dashboard
 * Bảo tồn query parameters khi redirect
 */
export default function HomePage() {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  useEffect(() => {
    // Bảo tồn tất cả query parameters khi chuyển hướng
    const queryString = urlSearchParams.toString();
    const dashboardPath = queryString
      ? `${CONFIG.authentication.defaultRedirectPath}?${queryString}`
      : CONFIG.authentication.defaultRedirectPath;

    router.push(dashboardPath);
  }, [router, urlSearchParams]);

  return null;
}
