'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export function useUrlSettings() {
  const settings = useSettingsContext();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Đọc hideMenu parameter từ URL
    const hideMenuParam = searchParams.get('hideMenu');
    
    if (hideMenuParam !== null) {
      const hideMenu = hideMenuParam === 'true' || hideMenuParam === '1';
      
      // Chỉ cập nhật nếu giá trị khác với state hiện tại
      if (settings.state.hideMenu !== hideMenu) {
        settings.setState({ hideMenu });
      }
    }

    // Đọc hideAvatar parameter từ URL
    const hideAvatarParam = searchParams.get('hideAvatar');
    
    if (hideAvatarParam !== null) {
      const hideAvatar = hideAvatarParam === 'true' || hideAvatarParam === '1';
      
      // Chỉ cập nhật nếu giá trị khác với state hiện tại
      if (settings.state.hideAvatar !== hideAvatar) {
        settings.setState({ hideAvatar });
      }
    }
  }, [searchParams, settings]);

  return settings;
}
