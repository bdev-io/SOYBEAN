import { ApiPropertyOptional } from '@nestjs/swagger';

import { Expose, Transform } from 'class-transformer';
import {
  IsInt, IsOptional, IsString, Min
} from 'class-validator';

/* NOTE:
 * @Expose() 를 붙인 것만 결과에 포함됨!
 * https://github.com/typestack/class-transformer#expose-decorator 확인
 * @ApiProperty() 는 swagger 문서에만 포함됨!
 * https://docs.nestjs.com/recipes/swagger#api-property 확인
 * IsNumber, IsOptional, ... 등은 validation 을 위한 것임!
 * https://docs.nestjs.com/techniques/validation 확인
 */

// NOTE : PAGINATION [https://www.prisma.io/docs/concepts/components/prisma-client/pagination]

// TYPE : 해당 DTO 는 Offset-Based Pagination 을 위한 기본 DTO.
export class BasicPaginationBase {
  @ApiPropertyOptional({
    name: 'orderBy',
    example: 'id:asc',
    default: 'id:asc',
    description: 'Order By',
  })
  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (!value) {
      return 'id:asc';
    }

    const [field, direction] = value.split(':');
    if (!direction || !['asc', 'desc'].includes(direction.toLowerCase())) {
      return 'id:asc';
    }

    return `${field}:${direction.toLowerCase()}`;
  })
  orderBy: string;

  @ApiPropertyOptional({
    name: 'page',
    example: '1',
    required: false,
    default: '1',
    description: '페이지',
  })
  @Expose()
  @IsInt()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10) || 1)
  page: number;

  @ApiPropertyOptional({
    example: '10',
    default: '10',
    description: 'Take',
  })
  @Expose()
  @IsInt()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10) || 10)
  take: number;
}
