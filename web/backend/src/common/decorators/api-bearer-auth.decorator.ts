import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

const BEARER_AUTH_NAME = 'access-token';

/**
 * Swagger 문서를 위한 Bearer 토큰 인증을 위한 데코레이터를 적용하는 함수
 * @returns 적용된 데코레이터들을 반환
 */
export function ApiBearerAuthToken() {
  return applyDecorators(ApiBearerAuth(BEARER_AUTH_NAME));
}
