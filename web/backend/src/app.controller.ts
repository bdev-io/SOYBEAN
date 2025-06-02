import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@constant/api-tags.constant';
import { PublicEndpoint } from '@decorator/public.decorator';

import { RetType } from '@type/return.type';

import { AppService } from './app.service';

@ApiTags(API_TAGS.GLOBAL._value)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({
    summary: 'API 버전 확인',
    description: 'API 버전 확인'
  })
  @Get()
  @PublicEndpoint()
  getVersion(): RetType<Record<string, string>> {
    return RetType.new<Record<string, string>>()
      .setData({
        version: this.appService.getVersion()
      })
      .setHttpStatus(HttpStatus.ACCEPTED);
  }
}
