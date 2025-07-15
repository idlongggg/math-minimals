import { AUTH_METHODS } from '../context/jwt/constant';
import { getCurrentAuthMethod } from '../context/jwt/utils';

import type { UserType } from '../types';

// ----------------------------------------------------------------------

/**
 * Utility function để lấy thông tin user phù hợp với auth method hiện tại
 * @param user - User từ auth context
 * @returns User với thông tin đầy đủ
 */
export function getEnhancedUser(user: UserType): UserType {
    if (!user) return null;

    const authMethod = getCurrentAuthMethod();

    // Đảm bảo user có đủ thông tin cần thiết
    const enhancedUser = {
        ...user,
        // Thêm các thông tin mặc định nếu thiếu
        role: user.role || 'user',
        isPublic: user.isPublic ?? true,
        // Thêm thông tin auth method để debug
        authMethod,
    };

    return enhancedUser;
}

/**
 * Kiểm tra xem user có quyền truy cập vào một subject không
 * @param user - User object
 * @param subject - Subject để kiểm tra
 * @returns Boolean
 */
export function hasAccessToSubject(user: UserType, subject: string): boolean {
    if (!user) return false;

    // Admin có quyền truy cập tất cả
    if (user.role === 'admin') return true;

    // Kiểm tra access array
    if (user.access && Array.isArray(user.access)) {
        return user.access.includes(subject);
    }

    // Fallback: nếu không có access array, cho phép truy cập (backward compatibility)
    return true;
}

/**
 * Lấy danh sách các subject mà user có quyền truy cập
 * @param user - User object
 * @returns Array of subjects
 */
export function getUserAccessibleSubjects(user: UserType): string[] {
    if (!user) return [];

    // Admin có quyền truy cập tất cả
    if (user.role === 'admin') {
        return ['algebra', 'statistics', 'geometry'];
    }

    // Trả về access array của user
    if (user.access && Array.isArray(user.access)) {
        return user.access;
    }

    // Fallback: trả về tất cả subjects
    return ['algebra', 'statistics', 'geometry'];
}

/**
 * Kiểm tra xem có phải đang sử dụng mock JWT không
 * @returns Boolean
 */
export function isUsingMockJWT(): boolean {
    return getCurrentAuthMethod() === AUTH_METHODS.MOCK_JWT;
}

/**
 * Log thông tin user để debug
 * @param user - User object
 * @param context - Context string for logging
 */
export function debugUserInfo(user: UserType, context?: string): void {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[${context || 'User Debug'}]:`, {
            id: user?.id,
            displayName: user?.displayName,
            email: user?.email,
            role: user?.role,
            access: user?.access,
            authMethod: getCurrentAuthMethod(),
        });
    }
}
