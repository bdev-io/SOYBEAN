// /** WARN: 해당 파일은 클라이언트에서 사용되는 파일이며, apiCall이 아닌 fetch를 직접 사용함 */
// 'use client';

// import type { UserType } from '@common/schema/userSchema';

// import { BE_HOST } from '@common/configs/globals';

// export interface ResSignIn {
//   access_token: string;
// }

// /** WARN: 해당 함수는 fetch를 직접 사용하여, credentials를 건드리므로, 주의 */
// export async function reqSignIn(
//   body: UserType,
//   keepLogin: boolean = false,
// ): Promise<Response> {
//   const res = await fetch(`${BE_HOST}/auth/login`, {
//     body: JSON.stringify(body),
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     // NOTE: keepLogin 이 true 일 경우, 쿠키를 저장하고, false 일 경우, 쿠키를 저장하지 않음
//     credentials: keepLogin ? 'include' : 'omit',
//   });

//   return res;
// }

// /** WARN: 해당 함수는 fetch를 직접 사용하여, credentials를 건드리므로, 주의 */
// export async function reqTokenAuth(): Promise<ResSignIn | null> {
//   const res = await fetch(`${BE_HOST}/auth/token`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//   });

//   if (res.ok) {
//     const respJson = (await res.json()) as ResSignIn;
//     return respJson;
//   }

//   return null;
// }
