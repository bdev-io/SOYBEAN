import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { NextFunction, Request, Response } from 'express';

import { IEnv } from '@config/index';

@Injectable()
export class CaptureRequestMiddleware implements NestMiddleware {
  captureRequest = false;

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    const envConfig = this.configService.get<IEnv>('env')!;
    this.captureRequest = envConfig.logger.captureRequest;
  }

  use(request: Request, _response: Response, next: NextFunction): void {
    if (this.captureRequest) {
      const {
        ip, method, path: url, headers, cookies, query
      } = request;
      request.on('close', () => {
        this.logger.debug(
          '\n======================= Request:  =======================\n' +
          `[${method}] FROM ${ip} ${url}\n` +
          `QUERY: ${JSON.stringify(query, null, 2)}\n` +
          `HEADERS: ${JSON.stringify(headers, null, 2)}\n` +
          `COOKIES: ${JSON.stringify(cookies, null, 2)}\n` +
          `BODY: ${JSON.stringify(request.body, null, 2)}\n` +
          '===================== End Request  ======================\n\n',
        );
      });
    }

    next();
  }
}
