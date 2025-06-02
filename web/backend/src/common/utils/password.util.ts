import argon2 from 'argon2';

/**
 * 비밀번호를 해시화합니다
 * @param password 해시화할 비밀번호
 * @returns 해시화된 비밀번호 문자열
 */
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}
