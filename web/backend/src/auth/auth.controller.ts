import {
  Body, Controller, HttpStatus, Logger, Post, Req, UseGuards
} from "@nestjs/common";
import {
  ApiAcceptedResponse, ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";

import type { Request } from "express";

import { API_TAGS } from "@constant/api-tags.constant";
import { PublicEndpoint } from "@decorator/public.decorator";

import { Users } from "@prisma/client";
import { RetType } from "@type/return.type";

import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LocalAuthGuard } from "./local-auth.guard";
import { RefreshTokenGuard } from "./refreshToken.guard";

@ApiTags(API_TAGS.AUTH._value)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiConflictResponse({
    description: '이미 존재하는 사용자로 인한 등록 실패'
  })
  @ApiCreatedResponse({
    description: '사용자 등록 성공'
  })
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류로 인한 등록 실패'
  })
  @ApiOperation({
    summary: '유저 등록',
    description: '새로운 사용자를 시스템에 등록합니다.'
  })
  @Post('/register')
  @PublicEndpoint()
  async register(@Body() registerBody: RegisterUserDto) {
    try {
      await this.authService.registerAction(registerBody);

      return RetType.new<Record<string, string>>()
        .setMsg('등록에 성공했습니다.')
        .setHttpStatus(HttpStatus.CREATED)
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  @ApiAcceptedResponse({
    description: '로그인 성공 및 토큰 발급',
    schema: {
      properties: {
        access_token: {
          type: 'string'
        }
      }
    },
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청 데이터로 인한 로그인 실패'
  })
  @ApiOperation({
    summary: '유저 로그인',
    description: '사용자 인증을 통해 로그인하고 액세스 토큰을 발급받습니다.'
  })
  @ApiUnauthorizedResponse({
    description: '인증 실패로 인한 로그인 거부'
  })
  @Post('/login')
  @PublicEndpoint()
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    const authData = await this.authService.localStrategyGenerateToken(req.user as unknown as Users);

    const domainBase = process.env.COOKIE_DOMAIN_BASE || '.localhost';

    return RetType.new<Record<string, string>>()
      .setData({
        access_token: authData.accessToken
      })
      .setCookie('refresh_token', authData.refreshToken, {
        maxAge: 1209600000,
        sameSite: 'lax',
        domain: domainBase,
        path: '/',
        secure: (process.env.NODE_ENV === 'production'),
        httpOnly: (process.env.NODE_ENV === 'production')
      })
      .setCookie('refresh_exist', 'true', {
        maxAge: 1209600000,
        sameSite: 'lax',
        domain: domainBase,
        path: '/',
      })
      .setHttpStatus(HttpStatus.ACCEPTED);
  }

  @ApiAcceptedResponse({
    description: '토큰 갱신 성공 및 새로운 액세스 토큰 발급',
    schema: {
      properties: {
        access_token: {
          type: 'string'
        }
      }
    }
  })
  @ApiOperation({
    summary: '토큰 갱신',
    description: '리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받습니다.'
  })
  @ApiUnauthorizedResponse({
    description: '유효하지 않은 리프레시 토큰으로 인한 갱신 실패'
  })
  @Post('/token')
  @PublicEndpoint()
  @UseGuards(RefreshTokenGuard)
  async tokenRefresh(@Req() req: Request) {
    const accessToken = await this.authService.generateAccessToken(req.user as unknown as Users);

    return RetType.new<Record<string, string>>()
      .setData({
        access_token: accessToken
      })
      .setHttpStatus(HttpStatus.ACCEPTED);
  }
}
