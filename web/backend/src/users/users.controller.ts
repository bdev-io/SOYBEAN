import {
  Body, Controller, Delete, Get, HttpStatus, Patch, UseGuards
} from "@nestjs/common";
import {
  ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, getSchemaPath
} from "@nestjs/swagger";

import { API_TAGS } from "@constant/api-tags.constant";
import { ApiBearerAuthToken } from "@decorator/api-bearer-auth.decorator";
import { ApiSpaceHeader } from "@decorator/api-space-header.decorator";
import { ReqSpaceContext } from "@decorator/space-context.decorator";

import { SpaceExistGuard } from "@common/guards/space-exist.guard";

import { SpaceContext } from "@type/context.type";
import { RetType } from "@type/return.type";

import { PatchUserDto } from "./dto/patch-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UsersService } from "./users.service";

@ApiBearerAuthToken()
@ApiTags(API_TAGS.USERS._value)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBadRequestResponse({
    description: '스페이스 정보가 없습니다'
  })
  @ApiForbiddenResponse({
    description: '접근 권한이 없습니다'
  })
  @ApiNotFoundResponse({
    description: '사용자를 찾을 수 없습니다'
  })
  @ApiOkResponse({
    description: '사용자 정보 조회 성공',
    schema: {
      type: 'object',
      properties: {
        user: {
          $ref: getSchemaPath(UserResponseDto)
        }
      }
    }
  })
  @ApiOperation({
    summary: '내 정보 조회',
    description: '현재 사용자의 정보를 조회합니다'
  })
  @ApiSpaceHeader()
  @ApiUnauthorizedResponse({
    description: '인증되지 않은 사용자'
  })
  @Get('/me')
  @UseGuards(SpaceExistGuard())
  async getMe(@ReqSpaceContext() spaceContext: SpaceContext) {
    const user = await this.usersService.getMe(spaceContext);

    return RetType.new<{ user: UserResponseDto }>()
      .setData({
        user
      })
      .setHttpStatus(HttpStatus.OK);
  }

  @ApiBadRequestResponse({
    description: '스페이스 정보가 없습니다'
  })
  @ApiForbiddenResponse({
    description: '접근 권한이 없습니다'
  })
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류가 발생했습니다'
  })
  @ApiNoContentResponse({
    description: '사용자 정보가 수정되었습니다'
  })
  @ApiNotFoundResponse({
    description: '사용자를 찾을 수 없습니다'
  })
  @ApiOperation({
    summary: '내 정보 수정',
    description: '현재 사용자의 정보를 수정합니다',
  })
  @ApiSpaceHeader()
  @ApiUnauthorizedResponse({
    description: '인증되지 않은 사용자'
  })
  @Patch('/me')
  @UseGuards(SpaceExistGuard())
  async patchMe(@ReqSpaceContext() spaceContext: SpaceContext, @Body() patchUserDto: PatchUserDto) {
    await this.usersService.patchMe(spaceContext, patchUserDto);

    return RetType.new()
      .setHttpStatus(HttpStatus.NO_CONTENT);
  }

  @ApiBadRequestResponse({
    description: '스페이스 정보가 없습니다'
  })
  @ApiForbiddenResponse({
    description: '접근 권한이 없습니다'
  })
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류가 발생했습니다'
  })
  @ApiNoContentResponse({
    description: '탈퇴에 성공했습니다'
  })
  @ApiNotFoundResponse({
    description: '사용자를 찾을 수 없습니다'
  })
  @ApiOperation({
    summary: '스페이스 탈퇴',
    description: '스페이스를 탈퇴합니다',
  })
  @ApiSpaceHeader()
  @ApiUnauthorizedResponse({
    description: '인증되지 않은 사용자'
  })
  @Delete('/me')
  @UseGuards(SpaceExistGuard())
  async leaveSpace(@ReqSpaceContext() spaceContext: SpaceContext) {
    await this.usersService.leaveSpace(spaceContext);

    return RetType.new()
      .setHttpStatus(HttpStatus.NO_CONTENT);
  }
}
