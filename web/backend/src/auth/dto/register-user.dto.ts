import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";
import { IsHash, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: '아이디',
    example: 'hong123'
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'SHA256 HASH'
  })
  @Expose()
  @IsHash('sha256')
  @IsNotEmpty()
  password: string;
}
