import { ApiProperty } from "@nestjs/swagger";

import { ROLE } from "@constant/role.constant";

import { Role } from "@type/role.type";

export class UserResponseDto {
  @ApiProperty({
    description: '사용자 UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  uuid: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동'
  })
  name: string;

  @ApiProperty({
    description: '사용자명 (아이디)',
    example: 'hong123'
  })
  username: string;

  @ApiProperty({
    description: '사용자 역할 (superadmin: 최고관리자, admin: 관리자, member: 일반회원)',
    example: 'admin',
    enum: Object.values(ROLE),
    enumName: 'Role',
  })
  role: Role;

  @ApiProperty({
    description: '직위',
    example: '교수'
  })
  position: string;
}
