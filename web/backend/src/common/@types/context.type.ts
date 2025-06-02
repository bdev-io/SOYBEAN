import type { Role } from './role.type';

/**
 * Request 에 주입되는 context 타입
 */
export interface MyContext {
  userId: string;
  role: Role;
}
