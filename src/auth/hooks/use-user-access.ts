import { useAuthContext } from './use-auth-context';
import { isUsingMockJWT, hasAccessToSubject, getUserAccessibleSubjects } from '../utils';

// ----------------------------------------------------------------------

/**
 * Hook để kiểm tra quyền truy cập của user
 */
export function useUserAccess() {
  const { user } = useAuthContext();

  /**
   * Kiểm tra xem user có quyền truy cập vào một subject không
   */
  const hasAccess = (subject: string): boolean => hasAccessToSubject(user, subject);

  /**
   * Lấy danh sách các subject mà user có quyền truy cập
   */
  const accessibleSubjects = getUserAccessibleSubjects(user);

  /**
   * Kiểm tra xem user có phải admin không
   */
  const isAdmin = user?.role === 'admin';

  /**
   * Kiểm tra xem có phải đang sử dụng mock JWT không
   */
  const isMockMode = isUsingMockJWT();

  /**
   * Lấy thông tin user access để hiển thị
   */
  const getAccessInfo = () => {
    if (isAdmin) {
      return {
        type: 'admin',
        subjects: ['algebra', 'statistics', 'geometry'],
        description: 'Full access to all subjects',
      };
    }

    return {
      type: 'user',
      subjects: accessibleSubjects,
      description: `Access to: ${accessibleSubjects.join(', ')}`,
    };
  };

  return {
    user,
    hasAccess,
    accessibleSubjects,
    isAdmin,
    isMockMode,
    getAccessInfo,
  };
}
