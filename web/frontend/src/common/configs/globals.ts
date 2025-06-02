export const IS_DEBUG =
  process.env.NEXT_PUBLIC_DEBUG === 'true' ||
  process.env.NODE_ENV === 'development';

console.log(
  `IS_DEBUG ? : ${IS_DEBUG} && IS_LOCAL ? : ${process.env.NEXT_PUBLIC_DEBUG === 'true'}`,
);

// ? 'http://10.0.1.10:3000'
export const BE_HOST = IS_DEBUG
  ? 'http://localhost:3000'
  : 'https://api.soy.ql.gl';

// ? 'http://10.0.1.10:4000'

export const FE_DOMAIN = IS_DEBUG ? 'localhost' : 'soy.ql.gl';

export const FE_HOST = IS_DEBUG
  ? `http://${FE_DOMAIN}:4000`
  : `https://${FE_DOMAIN}`;

export const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json; charset=utf-8',
};

// NOTE: NEXT_PUBLIC_DEBUG=true yarn dev 로 실행해야함.
if (IS_DEBUG) {
  console.warn('DEBUG 모드가 활성화 되었습니다.');
}

export const CREDENTIAL_OPTIONS: Partial<RequestInit> = IS_DEBUG
  ? {}
  : {
      credentials: 'include',
      mode: 'cors',
    };
