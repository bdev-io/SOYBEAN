/// useActionState로 반환하는 타입임
export interface GFormState<T> {
  cd?: number; // TYPE: api code
  success: boolean;
  error?: {
    type: 'zod' | 'server' | 'client' | 'unknown'; // 보통 1001 2302020 이런 코드지만, 이름 적당히 변경 하는게 좋아보임
    message: string; // 에러 메세지 -> 평문만 넣기.
    zod?: Record<string, string>; // zod / ext 둘중 하나만 쓰기 ( 향후, ext 쓸일없으면 zod만)
    ext?: Record<string, string>; // 기타 정보들 여기에 담아서 활용
  };
  data?: T;
}

/// GApiResponse는 서버측 응답/에러 반환 타입
export type GApiResponse<T> = GFormState<T>;

export interface ApiErrorType {
  // NOTE: error 코드 type 추후 고민
  cd: number;
  err: string;
  ext: {
    path: string;
    timestamp: string;
  };
  msg: string;
}
