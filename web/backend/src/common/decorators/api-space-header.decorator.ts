import { applyDecorators } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";

/**
 * Swagger 문서를 위한 ragnarok-space-id 헤더를 위한 데코레이터를 적용하는 함수
 * @returns 적용된 데코레이터들을 반환
 */
export function ApiSpaceHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'ragnarok-space-id',
      description: '스페이스 ID',
      required: true
    })
  );
}