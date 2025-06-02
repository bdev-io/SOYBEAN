import type { ROLE } from '@constant/role.constant';

/**
 * SpacesUsersMap role 타입
 */
export type Role = typeof ROLE[keyof typeof ROLE];