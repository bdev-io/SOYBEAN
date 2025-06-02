import { ApiPropertyOptional } from "@nestjs/swagger";

import { Expose } from "class-transformer";
import {
  IsHash, IsNotEmpty, IsOptional
} from "class-validator";

export class PatchUserDto {
  @ApiPropertyOptional({
    description: "비밀번호",
    example: 'SHA256 HASH'
  })
  @Expose()
  @IsHash('sha256')
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
